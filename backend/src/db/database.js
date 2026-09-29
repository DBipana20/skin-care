import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../../data');
const storePath = path.join(dataDir, 'store.json');
const initialDataPath = path.join(dataDir, 'initialData.json');

class Database {
  constructor() {
    this.data = null;
    this.isLoaded = false;
    this.savePromise = Promise.resolve();
  }

  async init() {
    if (this.isLoaded) return this.data;

    await fs.mkdir(dataDir, { recursive: true });

    try {
      // Check if store.json exists
      const content = await fs.readFile(storePath, 'utf-8');
      this.data = JSON.parse(content);
    } catch (err) {
      // If store.json does not exist or is invalid, load initialData.json
      const initialContent = await fs.readFile(initialDataPath, 'utf-8');
      this.data = JSON.parse(initialContent);
      await this.persist();
    }

    this.isLoaded = true;
    return this.data;
  }

  async persist() {
    // Chain saves to avoid concurrent file write collisions
    this.savePromise = this.savePromise.then(async () => {
      const tempPath = `${storePath}.tmp-${Date.now()}`;
      const serialized = JSON.stringify(this.data, null, 2);
      await fs.writeFile(tempPath, serialized, 'utf-8');
      await fs.rename(tempPath, storePath);
    });
    return this.savePromise;
  }

  get(key) {
    if (!this.data) return null;
    return this.data[key];
  }

  getAll() {
    return this.data;
  }

  async set(key, value) {
    this.data[key] = value;
    await this.persist();
    return this.data[key];
  }

  async update(updaterFn) {
    const updated = updaterFn(this.data);
    if (updated !== undefined) {
      this.data = updated;
    }
    await this.persist();
    return this.data;
  }
}

export const db = new Database();
