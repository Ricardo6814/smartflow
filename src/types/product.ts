/** Entidade de exemplo para o CRUD de produtos */
export interface Product {
  id: string;
  nome: string;
  sku: string;
  preco: number;
  estoque: number;
  ativo: boolean;
}

export type ProductFormData = Omit<Product, 'id'>;
