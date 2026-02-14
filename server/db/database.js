const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'kuri.db');

let db = null;

// Wrapper that provides a better-sqlite3-like synchronous API over sql.js
class DatabaseWrapper {
  constructor(sqlDb) {
    this._db = sqlDb;
  }

  prepare(sql) {
    const self = this;
    return {
      run(...params) {
        self._db.run(sql, params);
        return {
          lastInsertRowid: self._db.exec("SELECT last_insert_rowid() as id")[0]?.values[0][0] || 0,
          changes: self._db.getRowsModified(),
        };
      },
      get(...params) {
        const stmt = self._db.prepare(sql);
        stmt.bind(params);
        if (stmt.step()) {
          const cols = stmt.getColumnNames();
          const vals = stmt.get();
          stmt.free();
          const row = {};
          cols.forEach((col, i) => { row[col] = vals[i]; });
          return row;
        }
        stmt.free();
        return undefined;
      },
      all(...params) {
        const results = [];
        const stmt = self._db.prepare(sql);
        stmt.bind(params);
        while (stmt.step()) {
          const cols = stmt.getColumnNames();
          const vals = stmt.get();
          const row = {};
          cols.forEach((col, i) => { row[col] = vals[i]; });
          results.push(row);
        }
        stmt.free();
        return results;
      },
    };
  }

  exec(sql) {
    this._db.run(sql);
  }

  pragma(str) {
    try {
      this._db.run(`PRAGMA ${str}`);
    } catch (e) {
      // Ignore pragma errors
    }
  }

  save() {
    const data = this._db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }

  close() {
    try {
      this.save();
    } catch (e) {
      // Ignore save errors on close
    }
    try {
      this._db.close();
    } catch (e) {
      // Ignore close errors
    }
  }

  transaction(fn) {
    return (...args) => {
      this._db.run('BEGIN TRANSACTION');
      try {
        const result = fn(...args);
        this._db.run('COMMIT');
        this.save();
        return result;
      } catch (e) {
        this._db.run('ROLLBACK');
        throw e;
      }
    };
  }
}

async function initDatabase() {
  const SQL = await initSqlJs();

  let sqlDb;
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    sqlDb = new SQL.Database(fileBuffer);
    console.log('Loaded existing database.');
  } else {
    sqlDb = new SQL.Database();
    console.log('Created new database.');
  }

  db = new DatabaseWrapper(sqlDb);

  // Run schema
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  // Execute each statement separately
  const statements = schema.split(';').filter((s) => s.trim());
  for (const stmt of statements) {
    try {
      db._db.run(stmt + ';');
    } catch (e) {
      // Table may already exist
    }
  }

  // Auto-save periodically
  setInterval(() => {
    if (db) db.save();
  }, 30000);

  return db;
}

function getDb() {
  return db;
}

module.exports = { initDatabase, getDb };
