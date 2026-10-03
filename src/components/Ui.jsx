import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
export function Button({ children, to, className = '', ...props }) {
  return to ? (
    <Link to={to} className={'button ' + className} {...props}>
      {children}
    </Link>
  ) : (
    <button className={'button ' + className} {...props}>
      {children}
    </button>
  );
}
export function Section({ title, children, className = '', action, id }) {
  return (
    <section id={id} className={'section container ' + className}>
      {title && (
        <div className="section-heading">
          <h2>{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
export function PageTitle({ title, crumbs = [], compact = false }) {
  return (
    <div className={'container page-intro ' + (compact ? 'compact-intro' : '')}>
      <nav aria-label="Хлебные крошки" className="breadcrumbs">
        <Link to="/">Главная</Link>
        {crumbs.map(([label, url]) => (
          <span key={label}>
            {' '}
            / <Link to={url}>{label}</Link>
          </span>
        ))}{' '}
        / {title}
      </nav>
      {!compact && <h1>{title}</h1>}
    </div>
  );
}
export function Carousel({ items, render, columns = 3, autoplay = false, className = '' }) {
  const slider = useRef(null);
  return (
    <div className={'carousel ' + className}>
      <div className="carousel-controls">
        <button aria-label="Предыдущий слайд" onClick={() => slider.current?.slidePrev()}>
          <ChevronLeft />
        </button>
        <button aria-label="Следующий слайд" onClick={() => slider.current?.slideNext()}>
          <ChevronRight />
        </button>
      </div>
      <Swiper
        modules={[A11y, Autoplay, Pagination]}
        onSwiper={(instance) => (slider.current = instance)}
        spaceBetween={24}
        slidesPerView={1}
        watchOverflow
        autoplay={autoplay ? { delay: 5500, disableOnInteraction: true } : false}
        breakpoints={{ 560: { slidesPerView: Math.min(2, columns) }, 1000: { slidesPerView: columns } }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || item.slug || index}>{render(item, index)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export function Select({ label, value, onChange, options, placeholder, required = false, name }) {
  return (
    <label className="field">
      <span className="sr-only">{label}</span>
      <select aria-label={label} name={name} required={required} value={value} onChange={onChange}>
        <option value="">{placeholder || label}</option>
        {options.map((option) => {
          const item = typeof option === 'object' ? option : { value: option, label: option };
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}
export function EmptyState({ title = 'Автомобили не найдены', text = 'Попробуйте изменить параметры подбора.' }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
      <Button to="/catalog">Перейти в каталог</Button>
    </div>
  );
}
export const Consent = () => (
  <p className="consent">
    Нажимая кнопку, вы даёте согласие на <Link to="/privacy">обработку персональных данных</Link>.
  </p>
);
