import React from 'react';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

/**
 * Página temporária para rotas do menu ainda sem implementação.
 * Substitua por uma página CRUD real (como ProdutosPage) quando for desenvolver o módulo.
 */
function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <p className="placeholder-page__hint">
        Esta rota já está no menu — implemente o conteúdo copiando o padrão de{' '}
        <code>pages/ProdutosPage.tsx</code>.
      </p>
    </div>
  );
}

export default PlaceholderPage;
