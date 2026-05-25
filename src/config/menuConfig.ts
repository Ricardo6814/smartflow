import { MenuItem } from '../types/menu';

/**
 * MODELO DO MENU LATERAL CRM
 * --------------------------
 * Adicione ou remova itens aqui. Cada entrada precisa de uma rota correspondente em App.tsx.
 *
 * Dois formatos:
 *
 * 1) LINK (menu simples) — um clique abre a página:
 *    { type: 'link', id: '...', label: '...', path: '/rota', icon: 'dashboard' }
 *
 * 2) GROUP (menu com submenu) — expande e mostra filhos:
 *    { type: 'group', id: '...', label: '...', children: [ { type: 'link', ... }, ... ] }
 *
 * Ícones: nomes em MenuIconName (SVG preto/branco). Lista em types/menuIcon.ts
 * O `id` deve ser único em todo o menu (usado para expandir/colapsar grupos).
 */

export const menuConfig: MenuItem[] = [
  // --- Exemplo: item simples (sem submenu) ---
  {
    type: 'link',
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
  },

  // --- Exemplo: item com submenu ---
  {
    type: 'group',
    id: 'cadastros',
    label: 'Cadastros',
    icon: 'folder',
    children: [
      {
        type: 'link',
        id: 'produtos',
        label: 'Produtos',
        path: '/cadastros/produtos',
        icon: 'box',
      },
      {
        type: 'link',
        id: 'clientes',
        label: 'Clientes',
        path: '/cadastros/clientes',
        icon: 'users',
      },
    ],
  },

  {
    type: 'group',
    id: 'relatorios',
    label: 'Relatórios',
    icon: 'chart',
    children: [
      {
        type: 'link',
        id: 'vendas',
        label: 'Vendas',
        path: '/relatorios/vendas',
        icon: 'sales',
      },
    ],
  },

  {
    type: 'link',
    id: 'configuracoes',
    label: 'Configurações',
    path: '/configuracoes',
    icon: 'settings',
  },
];
