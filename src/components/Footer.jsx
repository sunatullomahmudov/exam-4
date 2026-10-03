import { Link, useLocation } from 'react-router-dom';
import FooterDescriptions from './FooterDescriptions';
import { Phone, AccessTime, LocationOn } from '@mui/icons-material';
import { brands, programs } from '../data/content';
import { useStore } from '../context/useStore';
export default function Footer() {
  const { openModal } = useStore();
  const { pathname } = useLocation();
  return (
    <footer className="footer">
      <nav className="container footer-nav">
        {[
          ['catalog', 'Каталог авто'],
          ['used', 'Авто с пробегом'],
          ['credit', 'Кредит и рассрочка'],
          ['offers', 'Спецпредложения'],
          ['taxi', 'Такси в кредит'],
        ].map(([url, label]) => (
          <Link key={url} to={'/' + url}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="container footer-main">
        <div className="footer-catalog">
          <h4>
            Каталог авто <Link to="/catalog">Подробнее</Link>
          </h4>
          <div className="footer-brands">
            {brands.map((brand) => (
              <Link key={brand} to={'/brands/' + brand.toLowerCase()}>
                {brand}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4>Кредит и рассрочка</h4>
          {programs.map((program) => (
            <Link key={program.slug} to={'/credit/' + program.slug}>
              {program.title}
            </Link>
          ))}
        </div>
        <div>
          <h4>Контакты</h4>
          <a href="tel:78005519431">
            <Phone /> +7 (800) 551-94-31
          </a>
          <a href="tel:74952921867">+7 (495) 292-18-67</a>
          <p>
            <AccessTime /> Ежедневно с 08:00 до 21:00
          </p>
          <p>
            <LocationOn /> Россия, Москва, 38КМ МКАД, 6Бс1
          </p>
          <button className="text-red underline" onClick={() => openModal('directions')}>
            Схема проезда
          </button>
          <Link to="/contacts" className="footer-city">
            Москва
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div>
            © 2021 Автосалон «ABC AUTO». Официальный дилер
            <br />
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Пользовательское соглашение</Link>
          </div>
          <p>
            Информация на сайте носит исключительно информационный характер и не является публичной офертой. Условия
            покупки уточняйте у менеджера.
          </p>
          <a
            className="footer-rating"
            href="https://yandex.ru/maps/?text=ABC%20AUTO%20Москва"
            target="_blank"
            rel="noreferrer"
          >
            <b>
              Я<span>★</span> 5,0
            </b>
            <small>Рейтинг на Яндекс Картах</small>
          </a>
        </div>
      </div>
      {pathname === '/' && <FooterDescriptions />}
    </footer>
  );
}
