const { initDatabase } = require('./database');
const bcrypt = require('bcryptjs');

async function seed() {
  const db = await initDatabase();

  const products = [
    {
      name: 'Crushed Stone 20mm',
      slug: 'crushed-stone-20mm',
      category: 'Stone',
      size: '20mm',
      use_case: 'Foundation, Road',
      price_per_ton: 25,
      description: 'Premium crushed stone ideal for foundations, road base layers, and general construction. Provides excellent compaction and drainage properties.',
      image: '/images/crushed-stone-20mm.jpg',
    },
    {
      name: 'Crushed Stone 10mm',
      slug: 'crushed-stone-10mm',
      category: 'Stone',
      size: '10mm',
      use_case: 'Slab, Finishing',
      price_per_ton: 28,
      description: 'Fine crushed stone perfect for concrete slabs, finishing work, and decorative applications. Clean and uniformly graded.',
      image: '/images/crushed-stone-10mm.jpg',
    },
    {
      name: 'Stone Dust',
      slug: 'stone-dust',
      category: 'Stone',
      size: 'Dust',
      use_case: 'Paving, Leveling',
      price_per_ton: 18,
      description: 'Fine stone dust for paving joints, leveling surfaces, and as a base material under pavers. Compacts tightly for a stable surface.',
      image: '/images/stone-dust.jpg',
    },
    {
      name: 'River Gravel',
      slug: 'river-gravel',
      category: 'Gravel',
      size: '40mm',
      use_case: 'Drainage, Landscaping',
      price_per_ton: 22,
      description: 'Natural river gravel for drainage systems, landscaping, and decorative ground cover. Rounded edges provide excellent water flow.',
      image: '/images/river-gravel.jpg',
    },
    {
      name: 'Building Sand',
      slug: 'building-sand',
      category: 'Sand',
      size: 'Fine',
      use_case: 'Plastering, Brickwork',
      price_per_ton: 20,
      description: 'High-quality fine building sand for plastering, brickwork, and mortar mixes. Washed and screened for consistency.',
      image: '/images/building-sand.jpg',
    },
    {
      name: 'Coarse Sand',
      slug: 'coarse-sand',
      category: 'Sand',
      size: 'Coarse',
      use_case: 'Concrete, Foundation',
      price_per_ton: 19,
      description: 'Coarse-grained sand for concrete mixing and foundation work. Sharp angular particles ensure strong bonding in concrete mixes.',
      image: '/images/coarse-sand.jpg',
    },
    {
      name: 'Road Base Material',
      slug: 'road-base-material',
      category: 'Mixed',
      size: 'Mixed',
      use_case: 'Road Construction',
      price_per_ton: 15,
      description: 'Blended aggregate material specifically designed for road base and sub-base layers. Meets highway construction specifications.',
      image: '/images/road-base.jpg',
    },
    {
      name: 'Gabion Stone',
      slug: 'gabion-stone',
      category: 'Stone',
      size: '100mm+',
      use_case: 'Retaining Walls',
      price_per_ton: 30,
      description: 'Large format stone for gabion baskets and retaining walls. Durable, weather-resistant rock that provides structural stability.',
      image: '/images/gabion-stone.jpg',
    },
  ];

  // Insert products
  for (const p of products) {
    db.prepare(`
      INSERT OR REPLACE INTO products (name, slug, category, size, use_case, price_per_ton, description, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(p.name, p.slug, p.category, p.size, p.use_case, p.price_per_ton, p.description, p.image);
  }

  // Seed admin user (password: admin123)
  const passwordHash = bcrypt.hashSync('admin123', 10);
  try {
    db.prepare(`INSERT INTO admin_users (username, password_hash) VALUES (?, ?)`).run('admin', passwordHash);
  } catch (e) {
    // Admin already exists
  }

  db.save();

  console.log('Database seeded successfully!');
  console.log(`- ${products.length} products`);
  console.log('- 1 admin user (admin / admin123)');

  db.close();
}

seed().catch(console.error);
