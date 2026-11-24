import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get('filter') ?? '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keep the search field in sync when navigating back or opening a shared URL.
  useEffect(() => {
    setSearch(params.get('filter') ?? '');
  }, [location.search, params]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = search.trim();
    navigate(`/products${value ? `?filter=${encodeURIComponent(value)}` : ''}`);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Produtos' },
    { href: '/products?category=Tênis', label: 'Categorias' },
    { href: '/orders', label: 'Meus Pedidos' },
  ];

  return (
    <header className="site-header">
      <div className="container header-main">
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Logo />
        <form className={`search-field${searchOpen ? ' search-field--open' : ''}`} onSubmit={submit} role="search">
          <input
            aria-label="Pesquisar produtos"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Pesquisar produto..."
          />
          <button type="submit" aria-label="Buscar produtos"><Search size={23} /></button>
        </form>
        <div className="account-actions">
          <Link to="/register" className="register-link">Cadastre-se</Link>
          <Link to="/login" className="button button--primary login-button">Entrar</Link>
          <button
            className="mobile-search-toggle"
            type="button"
            aria-label={searchOpen ? 'Fechar pesquisa' : 'Abrir pesquisa'}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(value => !value)}
          >
            {searchOpen ? <X size={21} /> : <Search size={21} />}
          </button>
          <Link to="/cart" className="cart-icon" aria-label="Abrir carrinho de compras">
            <img src="/assets/mini-cart.svg" alt="" width="26" height="26" />
          </Link>
        </div>
      </div>
      <div id="main-nav" className={`container header-bottom ${menuOpen ? 'header-bottom--open' : ''}`}>
        <nav aria-label="Menu principal">
          {nav.map(({ href, label }) => (
            <NavLink
              key={label}
              to={href}
              end={href === '/' || href.includes('?')}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => {
                const active = isActive && (
                  label !== 'Categorias' || params.get('category') === 'Tênis'
                ) && (label !== 'Produtos' || !params.get('category'));
                return `nav-link${active ? ' nav-link--active' : ''}`;
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
