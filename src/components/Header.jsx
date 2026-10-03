import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Close,
  Search,
  FavoriteBorder,
  KeyboardArrowDown,
  Phone,
  AccessTime,
  LocationOnOutlined,
  WhatsApp,
} from '@mui/icons-material';
import { asset, brandLogo } from '../assets';
import { brands, programs, cars, carTitle, carUrl } from '../data/content';
import { useStore } from '../context/useStore';
import { Button } from './Ui';
import MobileMenu from './MobileMenu';
import CompareIcon from './CompareIcon';
const navigation = [
  ['/catalog', 'Каталог авто', 'catalog'],
  ['/used', 'Авто с пробегом', 'used'],
  ['/credit', 'Кредит и рассрочка', 'credit'],
  ['/offers', 'Спецпредложения', 'offers'],
  ['/taxi', 'Такси в кредит', null],
];
export default function Header() {
  const location = useLocation();
  return <HeaderContent key={location.pathname + location.search} />;
}
function HeaderContent() {
  const { favorites, compared, openModal } = useStore();
  const [menu, setMenu] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menu]);
  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape') setMenu('');
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  const toggle = (value) => setMenu((previous) => (previous === value ? '' : value));
  const results = query.trim()
    ? cars.filter((car) => carTitle(car).toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];
  function search(event) {
    event.preventDefault();
    navigate('/search?q=' + encodeURIComponent(query.trim()));
  }
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container flex justify-between gap-4">
          <span>
            <LocationOnOutlined /> Россия, Москва, 38КМ МКАД, 6Бс1
          </span>
          <span>
            <AccessTime /> Время работы: с 08:00 до 21:00
          </span>
          <a href="https://wa.me/78005519431" target="_blank" rel="noreferrer">
            <WhatsApp /> Whatsapp
          </a>
        </div>
      </div>
      <div className="container header-main">
        <button
          className="icon-button hamburger"
          aria-label={menu ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={!!menu}
          onClick={() => toggle('all')}
        >
          {menu ? <Close /> : <Menu />}
        </button>
        <Link to="/" className="logo">
          <img src={asset.logo} alt="ABC AUTO — официальный дилер" />
        </Link>
        <p className="anniversary">
          <b>10 лет</b> превосходим
          <br /> ваши ожидания
        </p>
        <div className="header-links">
          {[
            ['/selection', 'Подбор авто'],
            ['/about', 'О компании'],
            ['/service', 'Техцентр'],
            ['/reviews', 'Отзывы'],
            ['/contacts', 'Контакты'],
          ].map(([url, label]) => (
            <NavLink key={url} to={url}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="phones">
          <a href="tel:78005519431">
            <Phone /> +7 (800) 551-94-31
          </a>
          <a href="tel:74952921867">+7 (495) 292-18-67</a>
        </div>
        <Button className="callback-button" onClick={() => openModal('callback')}>
          Обратный звонок
        </Button>
      </div>
      <nav className="container header-nav" aria-label="Основная навигация">
        {navigation.map(([url, label, key]) => (
          <div key={url} className="nav-item">
            <NavLink to={url}>{label}</NavLink>
            {key && (
              <button aria-label={'Открыть раздел ' + label} aria-expanded={menu === key} onClick={() => toggle(key)}>
                <KeyboardArrowDown />
              </button>
            )}
          </div>
        ))}
        <div className="header-actions">
          <Link to="/favorites" className="icon-button" aria-label={'Избранное: ' + favorites.length}>
            <FavoriteBorder />
            {favorites.length > 0 && <b className="badge">{favorites.length}</b>}
          </Link>
          <Link to="/compare" className="icon-button" aria-label={'Сравнение: ' + compared.length}>
            <CompareIcon />
            {compared.length > 0 && <b className="badge">{compared.length}</b>}
          </Link>
          <button className="icon-button" aria-label="Поиск" onClick={() => toggle('search')}>
            <Search />
          </button>
        </div>
      </nav>
      {menu && (
        <>
          <button className="menu-backdrop" aria-label="Закрыть раскрытое меню" onClick={() => setMenu('')} />
          <div className="mega-menu">
            <div className="container">
              {menu === 'all' && <MobileMenu onSearch={() => setMenu('search')} />}
              <div className={menu === 'all' ? 'desktop-menu-content' : ''}>
                <form className="search-form" onSubmit={search}>
                  <Search />
                  <input
                    autoFocus={menu === 'search'}
                    placeholder="Поиск по сайту"
                    aria-label="Поиск по сайту"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Button type="submit">Найти</Button>
                </form>
                {query && (
                  <div className="search-results">
                    {results.map((car) => (
                      <Link to={carUrl(car)} key={car.id}>
                        <img src={asset[car.image]} alt="" />
                        <span>
                          {carTitle(car)}
                          <small>{car.trim}</small>
                        </span>
                      </Link>
                    ))}
                    {!results.length && <p>По вашему запросу ничего не найдено.</p>}
                  </div>
                )}
                {(menu === 'catalog' || menu === 'used' || menu === 'all') && (
                  <div className="menu-brands">
                    <h3>{menu === 'used' ? 'Автомобили с пробегом' : 'Новые автомобили'}</h3>
                    <div className="brand-grid">
                      {brands.map((brand) => (
                        <Link
                          key={brand}
                          to={menu === 'used' ? '/used?brand=' + brand : '/brands/' + brand.toLowerCase()}
                        >
                          {brandLogo(brand) && <img src={brandLogo(brand)} alt="" />}
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {(menu === 'credit' || menu === 'offers') && (
                  <div className="program-grid">
                    {programs
                      .filter((program) =>
                        menu === 'credit'
                          ? program.slug !== 'recycling'
                          : ['recycling', 'trade-in'].includes(program.slug),
                      )
                      .map((program) => (
                        <Link to={'/credit/' + program.slug} className="program-tile" key={program.slug}>
                          <img src={asset[program.image]} alt="" />
                          <div>
                            <h3>{program.title}</h3>
                            <span>Подробнее →</span>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
                {menu === 'all' && (
                  <div className="mega-columns">
                    <div>
                      <h3>Кредит и рассрочка</h3>
                      {programs.map((program) => (
                        <Link key={program.slug} to={'/credit/' + program.slug}>
                          {program.title}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <h3>Спецпредложения</h3>
                      <Link to="/insurance">Страхование</Link>
                      <Link to="/collections">Наши подборки</Link>
                      <Link to="/taxi">Такси в кредит</Link>
                      <Link to="/selection">Подбор автомобиля</Link>
                    </div>
                    <div>
                      <h3>Автосалон</h3>
                      {[
                        ['about', 'О компании'],
                        ['service', 'Техцентр'],
                        ['reviews', 'Отзывы'],
                        ['blog', 'Блог'],
                        ['contacts', 'Контакты'],
                      ].map(([url, label]) => (
                        <Link key={url} to={'/' + url}>
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
