import React, { useEffect, useState } from 'react';
import { Product, ProductFormData } from '../types/product';
import './ProductFormModal.css';

interface ProductFormModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
}

const emptyForm: ProductFormData = {
  nome: '',
  sku: '',
  preco: 0,
  estoque: 0,
  ativo: true,
};

function ProductFormModal({ open, product, onClose, onSave }: ProductFormModalProps) {
  const [form, setForm] = useState<ProductFormData>(emptyForm);

  useEffect(() => {
    if (product) {
      const { id: _id, ...data } = product;
      setForm(data);
    } else {
      setForm(emptyForm);
    }
  }, [product, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="product-modal-title"
      >
        <h2 id="product-modal-title">{product ? 'Editar produto' : 'Novo produto'}</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label" htmlFor="prod-nome">
              Nome
            </label>
            <input
              id="prod-nome"
              className="input"
              required
              placeholder="Ex: Notebook Pro"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="prod-sku">
              SKU
            </label>
            <input
              id="prod-sku"
              className="input"
              required
              placeholder="Ex: NB-001"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </div>

          <div className="modal__row">
            <div className="field">
              <label className="field__label" htmlFor="prod-preco">
                Preço (R$)
              </label>
              <input
                id="prod-preco"
                className="input input--number"
                type="number"
                min={0}
                step={0.01}
                required
                placeholder="0,00"
                value={form.preco || ''}
                onChange={(e) => setForm({ ...form, preco: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="prod-estoque">
                Estoque
              </label>
              <input
                id="prod-estoque"
                className="input input--number"
                type="number"
                min={0}
                required
                placeholder="0"
                value={form.estoque || ''}
                onChange={(e) => setForm({ ...form, estoque: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="field field--switch">
            <label className="switch">
              <input
                className="switch__input"
                type="checkbox"
                checked={form.ativo}
                onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              />
              <span className="switch__track">
                <span className="switch__thumb" />
              </span>
            </label>
            <span className="field__label field__label--inline">Produto ativo</span>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
