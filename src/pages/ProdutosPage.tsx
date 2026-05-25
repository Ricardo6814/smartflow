import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from '../components/Pagination';
import ProductFormModal from '../components/ProductFormModal';
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from '../services/productService';
import { Product, ProductFormData } from '../types/product';
import './ProdutosPage.css';

const PAGE_SIZE = 5;

/**
 * Página modelo de CRUD — listagem com tabela, paginação e ações Novo / Editar / Excluir.
 * Replique este padrão para Clientes, Vendas, etc., trocando entidade e service.
 */
function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await listProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, page]);

  const openNew = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async (data: ProductFormData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await createProduct(data);
    }
    closeModal();
    await load();
  };

  const handleDelete = async (product: Product) => {
    const ok = window.confirm(`Excluir o produto "${product.nome}"?`);
    if (!ok) return;
    await deleteProduct(product.id);
    await load();
  };

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Produtos</h1>
          <p className="page__subtitle">CRUD de exemplo — cadastro e manutenção de produtos</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openNew}>
          + Novo
        </button>
      </header>

      <div className="page__card">
        {loading ? (
          <p className="page__loading">Carregando...</p>
        ) : (
          <>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>SKU</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th className="data-table__actions-col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="data-table__empty">
                        Nenhum produto cadastrado. Clique em Novo para adicionar.
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td><code>{p.sku}</code></td>
                        <td>{formatPrice(p.preco)}</td>
                        <td>{p.estoque}</td>
                        <td>
                          <span className={`badge ${p.ativo ? 'badge--success' : 'badge--muted'}`}>
                            {p.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="data-table__actions">
                          <button
                            type="button"
                            className="btn btn--sm btn--secondary"
                            onClick={() => openEdit(p)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn--sm btn--danger"
                            onClick={() => handleDelete(p)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={products.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <ProductFormModal
        open={modalOpen}
        product={editingProduct}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}

export default ProdutosPage;
