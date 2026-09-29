import { db } from '../db/database.js';

export const getProducts = async (req, res, next) => {
  try {
    let products = db.get('products') || [];
    const { category, search } = req.query;

    if (category && category.toLowerCase() !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.skinTypeTag && p.skinTypeTag.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const products = db.get('products') || [];
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const toggleProductFavorite = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    let products = db.get('products') || [];
    let updatedProduct = null;

    products = products.map(p => {
      if (p.id === id) {
        updatedProduct = { ...p, isFavorite: !p.isFavorite };
        return updatedProduct;
      }
      return p;
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await db.set('products', products);

    res.json({
      success: true,
      message: `Product favorite status changed to ${updatedProduct.isFavorite}`,
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, subtitle, category, skinTypeTag, rating, image, alt } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'name and category are required' });
    }

    const products = db.get('products') || [];
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name: name.trim(),
      subtitle: subtitle ? subtitle.trim() : '',
      category: category.trim(),
      skinTypeTag: skinTypeTag ? skinTypeTag.trim() : 'All Skin Types',
      rating: typeof rating === 'number' ? rating : 4.8,
      isFavorite: false,
      image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnPPbbT-Yawdt0arTSrHqloWiCCFZbyBc4x4Wr2KClNF4IyxGngKN59iOey-IOUpV_cB-Q92qKbMPYCiioIoadZEyISjoN4-8Yjk_nBeVGw0BLcmKy9x-rmqnG8KtHZzPxK-oaPBxNk4FcmdHtutpxB56ymnF_UMm9yrd9iG3lscnnlAdgcBtfK7htIrjZZwKzrnS7F7glXpi87vmsgZj98hE0UljInI6mk-U2bi3c4rfYCKdD7GzjAg',
      alt: alt || `${name} product image`
    };

    const updated = [...products, newProduct];
    await db.set('products', updated);

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    let products = db.get('products') || [];
    const initialLen = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await db.set('products', products);

    res.json({
      success: true,
      message: 'Product removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
