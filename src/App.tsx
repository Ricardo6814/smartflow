import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CrmLayout from './layout/CrmLayout';
import PlaceholderPage from './pages/PlaceholderPage';
import ProdutosPage from './pages/ProdutosPage';
import './styles/shared.css';
import './styles/inputs.css';

/**
 * Rotas do CRM — ao adicionar item em menuConfig.ts, registre a rota aqui.
 *
 * Estrutura:
 * - Layout único (CrmLayout) com menu lateral
 * - Rotas filhas renderizam no <Outlet /> à direita
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrmLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="dashboard"
            element={
              <PlaceholderPage
                title="Dashboard"
                description="Visão geral do CRM — personalize com widgets e KPIs."
              />
            }
          />

          {/* Cadastros — submenu */}
          <Route path="cadastros/produtos" element={<ProdutosPage />} />
          <Route
            path="cadastros/clientes"
            element={
              <PlaceholderPage
                title="Clientes"
                description="Cadastro de clientes — use o mesmo padrão da página de Produtos."
              />
            }
          />

          {/* Relatórios — submenu */}
          <Route
            path="relatorios/vendas"
            element={
              <PlaceholderPage
                title="Relatório de Vendas"
                description="Relatórios e exportações."
              />
            }
          />

          <Route
            path="configuracoes"
            element={
              <PlaceholderPage
                title="Configurações"
                description="Preferências do sistema e usuários."
              />
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
