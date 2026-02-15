const { initDatabase } = require('./database');
const bcrypt = require('bcryptjs');

async function seed() {
  const db = await initDatabase();

  const products = [
    {
      name: '3/4 Crushed Stone (20mm)',
      slug: '3-4-crushed-stone-20mm',
      category: 'Stone',
      size: '20mm',
      use_case: 'Foundation, Road, Concrete',
      price_per_ton: 1800,
      description: 'Premium 3/4 inch (20mm) crushed stone from Kuri Investments, Kigango, Nyeri. Ideal for foundations, road base layers, concrete mixing, and general construction in Kenya. Our 3/4 ballast provides excellent compaction and drainage — trusted by contractors nationwide.',
      image: '',
    },
    {
      name: '3/8 Crushed Stone (10mm)',
      slug: '3-8-crushed-stone-10mm',
      category: 'Stone',
      size: '10mm',
      use_case: 'Slab, Concrete, Finishing',
      price_per_ton: 2000,
      description: 'Fine 3/8 inch (10mm) crushed stone aggregates from our Kigango, Nyeri quarry. Perfect for concrete slabs, plastering, finishing work, and detailed construction applications across Kenya. Uniformly graded for consistent results — quality 3/8 aggregates delivered nationwide.',
      image: '',
    },
    {
      name: 'Ballast',
      slug: 'ballast',
      category: 'Stone',
      size: '50mm',
      use_case: 'Foundation, Road, Drainage',
      price_per_ton: 1500,
      description: 'Heavy-duty ballast stone from Kuri Investments — leading ballast suppliers in Kenya. Ideal for foundations, road construction, railway beds, and drainage systems. Our ballast from Kigango, Nyeri provides structural stability and excellent load-bearing capacity for projects across Kenya.',
      image: '',
    },
    {
      name: 'Hardcore',
      slug: 'hardcore',
      category: 'Mixed',
      size: 'Mixed',
      use_case: 'Foundation, Backfill, Road, Leveling',
      price_per_ton: 1200,
      description: 'Quality hardcore material from our stone crushing plant in Kigango, Nyeri. Perfect for foundation backfill, ground leveling, and road sub-base across Kenya. A cost-effective construction solution for site preparation — delivered by Kuri Investments, trusted hardcore suppliers in Kenya.',
      image: '',
    },
    {
      name: 'Quarry Dust',
      slug: 'quarry-dust',
      category: 'Stone',
      size: 'Dust',
      use_case: 'Paving, Leveling, Landscaping',
      price_per_ton: 800,
      description: 'Fine quarry dust from Kuri Investments, Kigango, Nyeri. Ideal for paving joints, surface leveling, landscaping, and as a base under pavers and interlocking blocks in Kenya. Compacts tightly for a stable, smooth surface — affordable quarry dust delivered across Kenya.',
      image: '',
    },
  ];

  // Insert products with upsert
  for (const p of products) {
    await db.prepare(`
      INSERT INTO products (name, slug, category, size, use_case, price_per_ton, description, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        size = EXCLUDED.size,
        use_case = EXCLUDED.use_case,
        price_per_ton = EXCLUDED.price_per_ton,
        description = EXCLUDED.description,
        image = EXCLUDED.image
    `).run(p.name, p.slug, p.category, p.size, p.use_case, p.price_per_ton, p.description, p.image);
  }

  // Seed admin user (password: admin123)
  const passwordHash = bcrypt.hashSync('admin123', 10);
  await db.prepare(`
    INSERT INTO admin_users (username, password_hash)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
  `).run('admin', passwordHash);

  console.log('Database seeded successfully!');
  console.log(`- ${products.length} products`);
  console.log('- 1 admin user (admin / admin123)');

  await db.close();
}

seed().catch(console.error);
