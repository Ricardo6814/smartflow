import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuConfig } from '../config/menuConfig';
import ChevronIcon from '../components/ChevronIcon';
import MenuIcon from '../components/MenuIcon';
import { isMenuGroup, MenuLinkItem } from '../types/menu';
import './Sidebar.css';

/**
 * Renderiza o menu lateral a partir de `menuConfig`.
 * - type 'link': NavLink direto
 * - type 'group': botão que expande/colapsa + lista de NavLinks filhos
 */
function Sidebar() {
  const location = useLocation();

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    menuConfig.forEach((item) => {
      if (isMenuGroup(item)) {
        const hasActiveChild = item.children.some((c) => c.path === location.pathname);
        if (hasActiveChild) initial.add(item.id);
      }
    });
    return initial;
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const renderLink = (item: MenuLinkItem, nested = false) => (
    <NavLink
      key={item.id}
      to={item.path}
      className={({ isActive }) =>
        `sidebar__link ${nested ? 'sidebar__link--nested' : ''} ${isActive ? 'sidebar__link--active' : ''}`
      }
    >
      {item.icon && (
        <span className="sidebar__icon">
          <MenuIcon name={item.icon} />
        </span>
      )}
      {item.label}
    </NavLink>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-icon">
          <MenuIcon name="box" size={22} />
        </span>
        <span>CRM Modelo</span>
      </div>

      <nav className="sidebar__nav" aria-label="Menu principal">
        {menuConfig.map((item) => {
          if (item.type === 'link') {
            return renderLink(item);
          }

          const isExpanded = expandedGroups.has(item.id);
          const hasActiveChild = item.children.some((c) => c.path === location.pathname);

          return (
            <div key={item.id} className="sidebar__group">
              <button
                type="button"
                className={`sidebar__group-toggle ${hasActiveChild ? 'sidebar__group-toggle--active' : ''}`}
                onClick={() => toggleGroup(item.id)}
                aria-expanded={isExpanded}
              >
                {item.icon && (
                  <span className="sidebar__icon">
                    <MenuIcon name={item.icon} />
                  </span>
                )}
                <span className="sidebar__group-label">{item.label}</span>
                <ChevronIcon open={isExpanded} />
              </button>

              {isExpanded && (
                <div className="sidebar__submenu">
                  {item.children.map((child) => renderLink(child, true))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
