import { Product, ProductFormData } from '../types/product';

/**
 * Serviço em memória — substitua por chamadas à API quando integrar o backend.
 * Mantém a lista mutável apenas para demonstrar o CRUD no modelo.
 */

let products: Product[] = [
  { id: '1', nome: 'Notebook Pro', sku: 'NB-001', preco: 4599.9, estoque: 12, ativo: true },
  { id: '2', nome: 'Mouse Wireless', sku: 'MS-042', preco: 89.9, estoque: 150, ativo: true },
  { id: '3', nome: 'Teclado Mecânico', sku: 'TK-108', preco: 349.0, estoque: 45, ativo: true },
  { id: '4', nome: 'Monitor 27"', sku: 'MN-270', preco: 1299.0, estoque: 8, ativo: false },
  { id: '5', nome: 'Webcam HD', sku: 'WC-720', preco: 199.9, estoque: 60, ativo: true },
  { id: '6', nome: 'Headset Gamer', sku: 'HS-301', preco: 279.0, estoque: 33, ativo: true },
  { id: '7', nome: 'Hub USB-C', sku: 'HB-007', preco: 159.0, estoque: 90, ativo: true },
  { id: '8', nome: 'SSD 1TB', sku: 'SD-1T', preco: 499.0, estoque: 25, ativo: true },
  { id: '9', nome: 'Cadeira Ergonômica', sku: 'CD-900', preco: 1899.0, estoque: 5, ativo: true },
  { id: '10', nome: 'Suporte Notebook', sku: 'SN-011', preco: 129.0, estoque: 40, ativo: false },
  { id: '11', nome: 'Pad Mouse XL', sku: 'PM-200', preco: 49.9, estoque: 200, ativo: true },
  { id: '12', nome: 'Cabo HDMI 2m', sku: 'CH-2M', preco: 39.9, estoque: 120, ativo: true },
];

let nextId = 13;

function delay<T>(value: T, ms = 80): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function listProducts(): Promise<Product[]> {
  return delay([...products]);
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const product: Product = { id: String(nextId++), ...data };
  products = [...products, product];
  return delay(product);
}

export async function updateProduct(id: string, data: ProductFormData): Promise<Product | null> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return delay(null);
  const updated = { id, ...data };
  products = products.map((p) => (p.id === id ? updated : p));
  return delay(updated);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const before = products.length;
  products = products.filter((p) => p.id !== id);
  return delay(products.length < before);
}
