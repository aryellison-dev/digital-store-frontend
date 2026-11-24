import { products, getProduct } from '../data/products';
import type { Product } from '../types/product';
// Contrato assíncrono: ao receber o backend, substitua estas implementações por chamadas HTTP.
export const productService = {
  async list(): Promise<Product[]> { return products; },
  async getById(id: string): Promise<Product | undefined> { return getProduct(id); }
};
