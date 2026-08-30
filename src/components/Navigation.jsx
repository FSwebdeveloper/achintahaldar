import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const menuData = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Products',
    children: [
      {
        label: 'Electronics & Accessories',
        children: [
          { label: 'CCTV & Accessories', href: '/contact?product=CCTV%20%26%20Accessories' },
          { label: 'Keyboard', href: '/product/keyboard' },
          { label: 'Mouse', href: '/product/mouse' },
          { label: 'VGA', href: '/product/vga' },
        ],
      },
      { label: 'Desktop & Laptop', href: '/contact?product=Desktop%20%26%20Laptop' },
      { label: 'Hearing AIDS', href: '/contact?product=Hearing%20AIDS' },
      { label: 'Vintage Audio System', href: '/contact?product=Vintage%20Audio%20System' },
    ],
  },
  {
    label: 'Services',
    children: [
      {
        label: 'Desktop & Laptop',
        children: [
          {
            label: 'Reinstalling & Upgrading',
            children: [
              { label: 'Windows OS', href: '/contact?product=Windows%20OS%20Service' },
              { label: 'Linux OS', href: '/contact?product=Linux%20OS%20Service' },
              { label: 'Phoniex OS', href: '/contact?product=Phoniex%20OS%20Service' },
            ],
          },
        ],
      },
      { label: 'Hearing AIDS', href: '/contact?product=Hearing%20AIDS%20Service' },
      { label: 'Web Design', href: '/contact?product=Web%20Design' },
      {
        label: 'Apply Online',
        children: [
          { label: 'E-Application ( Current )', href: '/contact?type=current' },
          {
            label: 'Apply Passport',
            children: [
              { label: 'Fresh Passport', href: '/contact?type=fresh-passport' },
              { label: 'Reissue Passport', href: '/contact?type=reissue-passport' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const DropdownItem = ({ item, depth = 0, activePath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownWidth = 240; // 15rem min-width is 240px
      
      if (depth === 0) {
        // If aligning to the left (default) overflows the screen right edge
        if (rect.left + dropdownWidth > window.innerWidth) {
          setOpenLeft(true);
        } else {
          setOpenLeft(false);
        }
      } else {
        // If opening to the right (default) overflows the screen right edge
        if (rect.right + dropdownWidth > window.innerWidth) {
          setOpenLeft(true);
        } else {
          setOpenLeft(false);
        }
      }
    }
    
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && (activePath === item.href || (item.href === '/home' && (activePath === '/' || !activePath)));

  const isExternal = item.href && item.href.startsWith('http');
  const isDummy = !item.href || item.href === '#';

  const linkContent = (
    <>
      <span>{item.label}</span>
      {hasChildren && (
        depth === 0 ? <ChevronDown size={14} className="menu-chevron-left-margin" /> : <ChevronRight size={14} />
      )}
    </>
  );

  const linkClass = `menu-link ${depth > 0 ? 'menu-link-sub' : ''} ${
    isActive 
      ? depth === 0
        ? 'menu-link-active-level0' 
        : 'menu-link-active-sub'
      : 'menu-link-inactive'
  } ${isOpen ? 'menu-link-open font-bold' : ''}`;

  return (
    <div
      ref={containerRef}
      className="dropdown-item-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isDummy ? (
        <span className={linkClass} style={{ cursor: 'pointer' }}>
          {linkContent}
        </span>
      ) : isExternal ? (
        <a
          href={item.href}
          className={linkClass}
          target={item.target || '_blank'}
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <Link
          to={item.href}
          className={linkClass}
        >
          {linkContent}
        </Link>
      )}

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: depth === 0 ? 10 : 0, 
              x: depth === 0 ? 0 : (openLeft ? -10 : 10) 
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ 
              opacity: 0, 
              y: depth === 0 ? 10 : 0, 
              x: depth === 0 ? 0 : (openLeft ? -10 : 10) 
            }}
            transition={{ duration: 0.2 }}
            className={`dropdown-menu ${
              depth === 0 
                ? openLeft ? 'dropdown-level0-right' : 'dropdown-level0-left'
                : openLeft ? 'dropdown-levelN-left' : 'dropdown-levelN-right'
            }`}
          >
            {item.children?.map((child, index) => (
              <DropdownItem key={index} item={child} depth={depth + 1} activePath={activePath} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileMenuItem = ({ item, depth = 0, activePath, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && (activePath === item.href || (item.href === '/home' && (activePath === '/' || !activePath)));

  const isExternal = item.href && item.href.startsWith('http');
  const isDummy = !item.href || item.href === '#';

  const linkClass = `mobile-item-link ${isActive ? 'mobile-item-link-active' : 'mobile-item-link-inactive'} ${isOpen ? 'mobile-item-open font-bold' : ''}`;
  const style = { paddingLeft: `${depth * 1}rem` };

  const renderLink = () => {
    if (hasChildren || isDummy) {
      return (
        <span
          className={linkClass}
          style={{ ...style, cursor: 'pointer' }}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              setIsOpen(!isOpen);
            } else if (onItemClick) {
              onItemClick();
            }
          }}
        >
          {item.label}
        </span>
      );
    }

    if (isExternal) {
      return (
        <a
          href={item.href}
          className={linkClass}
          style={style}
          target={item.target || '_blank'}
          rel="noopener noreferrer"
          onClick={onItemClick}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        to={item.href}
        className={linkClass}
        style={style}
        onClick={onItemClick}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <div className="mobile-item-container">
      <div
        className={`mobile-item-row ${isActive ? 'mobile-item-row-active' : ''}`}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {renderLink()}
        {hasChildren && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={18} />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mobile-submenu-container"
          >
            {item.children?.map((child, index) => (
              <MobileMenuItem key={index} item={child} depth={depth + 1} activePath={activePath} onItemClick={onItemClick} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar" id="app-navbar">
      <div className="navbar-container">
        <div className="navbar-row">
          {/* Logo */}
          <Link to="/" className="logo-container" id="navbar-logo-link">
            <div className="logo-icon" id="navbar-logo-icon">
              <span className="logo-text">F</span>
            </div>
            <span className="brand-name">FSwebdeveloper</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu" id="navbar-desktop-menu">
            {menuData.map((item, index) => (
              <DropdownItem 
                key={index} 
                item={item} 
                activePath={currentPath} 
              />
            ))}
          </div>

          {/* Mobile Actions Container (Hamburger) */}
          <div className="mobile-btn-container" id="navbar-mobile-controls" style={{ gap: '0.25rem' }}>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-drawer"
          >
            <div className="mobile-drawer-content">
              {menuData.map((item, index) => (
                <MobileMenuItem 
                  key={index} 
                  item={item} 
                  activePath={currentPath} 
                  onItemClick={() => setIsMobileMenuOpen(false)} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

