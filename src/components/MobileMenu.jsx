import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ExpandMore, Search, Phone, LocationOn, AccessTime } from '@mui/icons-material';
import { asset } from '../assets';
import { brands, programs } from '../data/content';
import { useStore } from '../context/useStore';
import { Button } from './Ui';

export default function MobileMenu({ onSearch }) {
  const { openModal } = useStore();
  const groups = [
    ['Каталог авто', '/catalog', brands.map((brand) => [brand, '/brands/' + brand.toLowerCase()])],
    ['Авто с пробегом', '/used', brands.map((brand) => [brand, '/used?brand=' + brand])],
    ['Кредит и рассрочка', '/credit', programs.map((program) => [program.title, '/credit/' + program.slug])],
    [
      'Спецпредложения',
      '/offers',
      [
        ['Trade-in', '/credit/trade-in'],
        ['Утилизация', '/credit/recycling'],
        ['Страхование', '/insurance'],
      ],
    ],
    ['Такси в кредит', '/taxi', []],
  ];
  return (
    <div className="mobile-menu">
      <a className="mobile-menu-phone" href="tel:78005519431">
        +7 (800) 551-94-31
      </a>
      <div className="mobile-menu-logo">
        <Link to="/">
          <img src={asset.logo} alt="ABC AUTO" />
        </Link>
        <button aria-label="Открыть поиск" onClick={onSearch}>
          <Search />
        </button>
      </div>
      {groups.map(([title, url, links]) =>
        links.length ? (
          <Accordion key={url} disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <span>{title}</span>
            </AccordionSummary>
            <AccordionDetails>
              <Link className="text-red" to={url}>
                Все предложения →
              </Link>
              {links.map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>
        ) : (
          <Link className="mobile-menu-direct" key={url} to={url}>
            {title}
          </Link>
        ),
      )}
      <div className="mobile-utility-links">
        {[
          ['/selection', 'Подбор авто'],
          ['/about', 'О компании'],
          ['/service', 'Техцентр'],
          ['/reviews', 'Отзывы'],
          ['/contacts', 'Контакты'],
          ['/blog', 'Блог'],
        ].map(([url, title]) => (
          <Link key={url} to={url}>
            {title}
          </Link>
        ))}
      </div>
      <div className="mobile-menu-contact">
        <a href="tel:78005519431">
          <Phone /> +7 (800) 551-94-31
        </a>
        <a href="tel:74952921867">+7 (495) 292-18-67</a>
        <p>
          <LocationOn /> Россия, Москва, 38КМ МКАД, 6Бс1
        </p>
        <p>
          <AccessTime /> Ежедневно с 08:00 до 21:00
        </p>
        <Button onClick={() => openModal('callback')}>Обратный звонок</Button>
      </div>
    </div>
  );
}
