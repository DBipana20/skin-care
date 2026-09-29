import http from 'http';
import app from '../src/app.js';
import { db } from '../src/db/database.js';

async function runTests() {
  console.log('--- Starting Backend Verification Tests ---');

  // 1. Initialize DB
  await db.init();
  console.log('✓ Database initialized');

  // 2. Start temporary server on dynamic port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api`;
  console.log(`✓ Test server running on port ${port}`);

  try {
    // 3. Test Health Check
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthJson = await healthRes.json();
    if (healthRes.status !== 200 || healthJson.status !== 'ok') {
      throw new Error(`Health check failed: ${JSON.stringify(healthJson)}`);
    }
    console.log('✓ GET /api/health returned 200 OK');

    // 4. Test Init / Bootstrap
    const initRes = await fetch(`${baseUrl}/init`);
    const initJson = await initRes.json();
    if (initRes.status !== 200 || !initJson.data.user || !initJson.data.products) {
      throw new Error(`Init failed: ${JSON.stringify(initJson)}`);
    }
    console.log(`✓ GET /api/init returned bootstrap data (user: ${initJson.data.user.name}, products: ${initJson.data.products.length})`);

    // 5. Test Toggle Routine Step
    const toggleRes = await fetch(`${baseUrl}/routines/morning/steps/1/toggle`, {
      method: 'PATCH'
    });
    const toggleJson = await toggleRes.json();
    if (toggleRes.status !== 200 || !toggleJson.success) {
      throw new Error(`Toggle step failed: ${JSON.stringify(toggleJson)}`);
    }
    console.log('✓ PATCH /api/routines/morning/steps/1/toggle works');

    // 6. Test Hydration Update
    const waterRes = await fetch(`${baseUrl}/hydration`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ waterGlasses: 6 })
    });
    const waterJson = await waterRes.json();
    if (waterRes.status !== 200 || waterJson.data.waterGlasses !== 6) {
      throw new Error(`Hydration update failed: ${JSON.stringify(waterJson)}`);
    }
    console.log('✓ PUT /api/hydration updated waterGlasses to 6');

    // 7. Test Add Food Entry
    const foodRes = await fetch(`${baseUrl}/diet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Chia Seeds', category: 'loving' })
    });
    const foodJson = await foodRes.json();
    if (foodRes.status !== 201 || !foodJson.data.skinLovingFoods.includes('Chia Seeds')) {
      throw new Error(`Diet add food failed: ${JSON.stringify(foodJson)}`);
    }
    console.log('✓ POST /api/diet added Chia Seeds to skinLovingFoods');

    // 8. Test Toggle Product Favorite
    const favRes = await fetch(`${baseUrl}/products/1/favorite`, {
      method: 'PATCH'
    });
    const favJson = await favRes.json();
    if (favRes.status !== 200 || !favJson.success) {
      throw new Error(`Toggle product favorite failed: ${JSON.stringify(favJson)}`);
    }
    console.log(`✓ PATCH /api/products/1/favorite toggled isFavorite to ${favJson.data.isFavorite}`);

    // 9. Test Update Skin Type
    const skinRes = await fetch(`${baseUrl}/user/skintype`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skinType: 'Sensitive' })
    });
    const skinJson = await skinRes.json();
    if (skinRes.status !== 200 || skinJson.data.skinType !== 'Sensitive') {
      throw new Error(`Update skin type failed: ${JSON.stringify(skinJson)}`);
    }
    console.log('✓ PUT /api/user/skintype updated skinType to Sensitive');

    console.log('\n--- All Backend Verification Tests Passed Successfully! ---');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
