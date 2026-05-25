import { MenuIconName } from './menuIcon';

/**
 * Tipos do menu lateral CRM.
 * Use estes tipos ao definir itens em `config/menuConfig.ts`.
 */

/** Item de menu simples — navega direto para uma rota (sem filhos). */
export interface MenuLinkItem {
  type: 'link';
  id: string;
  label: string;
  /** Caminho da rota (ex: "/dashboard") — deve existir em App.tsx */
  path: string;
  /** Ícone SVG monocromático — ver MenuIconName em types/menuIcon.ts */
  icon?: MenuIconName;
}

/** Item de menu com submenus — agrupa links relacionados (ex: Cadastros). */
export interface MenuGroupItem {
  type: 'group';
  id: string;
  label: string;
  icon?: MenuIconName;
  /** Filhos são sempre links; grupos aninhados não são suportados neste modelo */
  children: MenuLinkItem[];
}

export type MenuItem = MenuLinkItem | MenuGroupItem;

export function isMenuGroup(item: MenuItem): item is MenuGroupItem {
  return item.type === 'group';
}
