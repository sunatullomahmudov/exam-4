import { Link } from 'react-router-dom';
import { useState } from 'react';
import { carColors } from '../data/carColors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import { CheckCircle, CardGiftcard, Percent, AccessTime } from '@mui/icons-material';
import { asset } from '../assets';
import { money, carTitle } from '../data/content';
import { useStore } from '../context/useStore';
import { Button } from './Ui';
import LeadForm from './LeadForm';
export function HomeHero() {
  const { openModal } = useStore();
  const slides = [
    {
      title: 'Грандиозная распродажа тестового парка!',
      label: 'Осталось всего 10 авто!',
      cars: ['kia', 'rav4', 'rapid'],
    },
    {
      title: 'Ваш новый автомобиль с выгодой до 350 000 ₽',
      label: 'Специальное предложение',
      cars: ['camry', 'corolla', 'prius'],
    },
    { title: 'Обменяйте свой автомобиль на новый', label: 'Программа Trade-in', cars: ['mazda', 'karoq', 'octavia'] },
  ];
  return (
    <div className="home-hero wide">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 6500, disableOnInteraction: true }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="hero-slide">
              <img className="hero-city" src={asset.city} alt="" />
              <div className="container hero-inner">
                <div className="hero-copy">
                  <span className="red-pill">{slide.label}</span>
                  <h1>{slide.title}</h1>
                  <button className="hero-cta" onClick={() => openModal(index === 2 ? 'trade' : 'offer')}>
                    Узнай свою цену!
                  </button>
                </div>
                <div className="hero-cars">
                  {[...slide.cars].reverse().map((car, index) => (
                    <img
                      key={car}
                      className={'hero-car hero-car-' + index}
                      src={asset[car]}
                      alt={car === 'kia' ? 'Kia Rio' : car === 'rav4' ? 'Toyota RAV4' : 'Автомобиль из каталога'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export function ProgramHero({ program, secondary = false }) {
  const { openModal } = useStore();
  const modalType =
    { express: 'express', installment: 'installment', 'trade-in': 'trade', insurance: 'insurance' }[program.slug] ||
    'credit';
  const Heading = secondary ? 'h2' : 'h1';
  return (
    <>
      <div className={'program-hero wide ' + program.slug + (secondary ? ' secondary-banner' : '')}>
        <img className="program-hero-photo" src={asset[program.image]} alt={program.title} />
        <div className="container program-hero-content">
          {!secondary && (
            <nav className="breadcrumbs">
              <Link to="/">Главная</Link> / <Link to="/credit">Кредит и рассрочка</Link> / {program.title}
            </nav>
          )}
          <Heading>{program.title}</Heading>
          <p>{program.subtitle}</p>
          <button className="hero-rate" aria-label={'Подробнее: ' + program.title} onClick={() => openModal(modalType)}>
            {program.rate}
            <small>
              на специальных
              <br />
              условиях
            </small>
          </button>
          <div className="hero-benefits">
            <span>
              <CheckCircle />
              Компенсируем дорогу
              <br />
              до автосалона
            </span>
            <span>
              <AccessTime />
              Быстрое оформление
              <br />
              от 30 минут
            </span>
            <span>
              <Percent />
              Скидки
              <br />
              по программе
            </span>
          </div>
        </div>
      </div>
      <LeadStrip kind={program.title} />
    </>
  );
}
export function LeadStrip({ kind = 'Специальное предложение', car }) {
  return (
    <div className="container lead-strip">
      <div>
        <b>
          Получите
          <br />
          специальную цену
        </b>
        <small>Персональное предложение</small>
      </div>
      <LeadForm kind={kind} car={car} compact />
    </div>
  );
}
export function ModelHero(props) {
  return <ModelHeroContent key={props.car.id + props.car.image} {...props} />;
}
function ModelHeroContent({ car, brand = false, trim = false }) {
  const { openModal } = useStore();
  const colors = carColors(car);
  const [selectedImage, setSelectedImage] = useState(car.image);
  return (
    <>
      <div className="model-hero wide">
        <img className="hero-city" src={asset.city} alt="" />
        <div className="container model-hero-inner">
          <nav className="breadcrumbs">
            <Link to="/">Главная</Link> / <Link to="/catalog">Каталог авто</Link> / {car.brand}
            {!brand && ' / ' + car.model}
          </nav>
          <div className="model-hero-copy">
            <p className="eyebrow">Официальный дилер {car.brand}</p>
            <h1>{brand ? 'Автомобили ' + car.brand : carTitle(car)}</h1>
            {trim && (
              <h3>
                {car.trim} ({car.year})
              </h3>
            )}
            <p>Специальное предложение в ABC AUTO</p>
            <strong className="hero-rate">
              {brand ? 'Выгода до ' + money(car.oldPrice - car.price) : 'от ' + money(car.price)}
            </strong>
            <div className="hero-benefits">
              <span>
                <CardGiftcard />
                Комплект резины
                <br />в подарок
              </span>
              <span>
                <Percent />
                Кредит
                <br />
                от 1,9%
              </span>
              <span>
                <CheckCircle />
                Выгодный
                <br />
                Trade-in
              </span>
            </div>
            <Button onClick={() => openModal('discount', car)}>Зафиксировать скидку</Button>
          </div>
          <img className="model-hero-car" src={asset[selectedImage]} alt={carTitle(car)} />
          {!brand && (
            <div className="model-colors">
              <span>Цвет: {colors.find((color) => color.image === selectedImage)?.name}</span>
              {colors.map((color) => (
                <button
                  key={color.image}
                  aria-label={'Цвет: ' + color.name}
                  aria-pressed={selectedImage === color.image}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedImage(color.image)}
                />
              ))}
            </div>
          )}
          {brand && <div className="brand-watermark">{car.brand}</div>}
        </div>
      </div>
      <LeadStrip car={car} />
    </>
  );
}
