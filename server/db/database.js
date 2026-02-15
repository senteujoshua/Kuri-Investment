const { Pool, types } = require('pg');
const fs = require('fs');
const path = require('path');

// Parse PostgreSQL bigint (COUNT) and numeric (SUM/AVG) as JS numbers
types.setTypeParser(20, parseInt);    // bigint -> int
types.setTypeParser(1700, parseFloat); // numeric -> float

let db = null;

class DatabaseWrapper {
  constructor(pool) {
    this._pool = pool;
  }

  // Convert ? placeholders to $1, $2, etc.
  _convertParams(sql) {
    let idx = 0;
    return sql.replace(/\?/g, () => `$${++idx}`);
  }

  prepare(sql) {
    const pgSql = this._convertParams(sql);
    const pool = this._pool;

    return {
      async run(...params) {
        let finalSql = pgSql;
        const trimmed = pgSql.trim().toUpperCase();
        // Auto-append RETURNING id to INSERTs so lastInsertRowid works
        if (trimmed.startsWith('INSERT') && !trimmed.includes('RETURNING')) {
          finalSql = pgSql + ' RETURNING id';
        }
        const result = await pool.query(finalSql, params);
        return {
          lastInsertRowid: result.rows[0]?.id || 0,
          changes: result.rowCount,
        };
      },
      async get(...params) {
        const result = await pool.query(pgSql, params);
        return result.rows[0] || undefined;
      },
      async all(...params) {
        const result = await pool.query(pgSql, params);
        return result.rows;
      },
    };
  }

  async exec(sql) {
    await this._pool.query(sql);
  }

  // No-op for PostgreSQL (auto-persists)
  save() {}

  async close() {
    await this._pool.end();
  }

  transaction(fn) {
    const pool = this._pool;
    return async (...args) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const result = await fn(...args);
        await client.query('COMMIT');
        return result;
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    };
  }
}

async function initDatabase() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  // Test connection
  const client = await pool.connect();
  console.log('Connected to PostgreSQL database.');
  client.release();

  db = new DatabaseWrapper(pool);

  // Run schema
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('Schema applied.');

  return db;
}

function getDb() {
  return db;
}

module.exports = { initDatabase, getDb };
