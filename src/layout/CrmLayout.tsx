import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './CrmLayout.css';

/**
 * Layout base do CRM: menu lateral fixo + área de conteúdo (rotas filhas via Outlet).
 */
function CrmLayout() {
  return (
    <div className="crm-layout">
      <Sidebar />
      <main className="crm-layout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default CrmLayout;
