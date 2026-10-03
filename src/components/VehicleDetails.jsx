import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Switch } from '@mui/material';
import { ExpandMore, CheckCircle, CardGiftcard } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, A11y } from 'swiper/modules';
import { asset } from '../assets';
import { carTitle, carUrl, money } from '../data/content';
import { useStore } from '../context/useStore';
import { Button, Section } from './Ui';
import { SpecialOffers } from './Marketing';
export function Equipment({ car, short = false }) {
  const groups = [
    [
      'Безопасность',
      [
        'Антиблокировочная система ABS',
        'Система курсовой устойчивости',
        'Фронтальные подушки безопасности',
        'Крепления детских кресел ISOFIX',
        'Контроль давления в шинах',
      ],
    ],
    [
      'Комфорт',
      [
        'Кондиционер',
        'Электростеклоподъёмники',
        'Электропривод зеркал',
        'Подогрев передних сидений',
        'Регулировка рулевой колонки',
      ],
    ],
    [
      'Интерьер и мультимедиа',
      [
        'Мультимедийная система',
        'Bluetooth и USB',
        'Бортовой компьютер',
        'Тканевая обивка салона',
        'Складываемое заднее сиденье',
      ],
    ],
  ];
  return (
    <div className="equipment-grid">
      {groups.map(([title, items]) => (
        <div key={title}>
          <h3>{title}</h3>
          <ul>
            {items.slice(0, short ? 3 : 5).map((item) => (
              <li key={item}>
                <CheckCircle />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!short && (
        <p className="equipment-note">
          Оснащение {carTitle(car)} зависит от выбранной комплектации. Уточняйте состав при бронировании.
        </p>
      )}
    </div>
  );
}
export function TrimList({ car, taxi = false }) {
  const { openModal } = useStore();
  const trims = taxi ? ['Origin', 'Respect', 'Exclusive'] : [car.trim, 'Комфорт', 'Элеганс'];
  return (
    <Section title={taxi ? 'Комплектации и цены' : car.model + ' в наличии'} id="stock">
      {trims.map((trim, index) => (
        <Accordion key={trim} className="trim-accordion" defaultExpanded={index === 0} disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div className="trim-summary">
              <b>{trim}</b>
              <span>
                {car.engine} л / {car.hp} л.с.
              </span>
              <span>{car.gear}</span>
              <span>{car.drive}</span>
              <strong>от {money(car.price + index * 120000)}</strong>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="trim-detail-head">
              <img src={asset[car.image]} alt={carTitle(car)} />
              <div>
                <h3>
                  {carTitle(car)} {trim}
                </h3>
                <p>
                  <CardGiftcard /> Комплект зимней резины в подарок
                </p>
                <p>
                  <CardGiftcard /> Дополнительное оборудование
                </p>
                <p>
                  <CardGiftcard /> Выгодное страхование
                </p>
              </div>
              <div>
                <strong>{money(car.price + index * 120000)}</strong>
                <Button onClick={() => openModal('reserve', { ...car, trim, price: car.price + index * 120000 })}>
                  Резерв онлайн
                </Button>
                <Link className="underline muted" to={carUrl(car) + '/trim/' + index}>
                  Подробнее о комплектации
                </Link>
              </div>
            </div>
            <Equipment car={car} short />
          </AccordionDetails>
        </Accordion>
      ))}
      <SpecialOffers />
    </Section>
  );
}
export function DiscountOptions({ car }) {
  const [selected, setSelected] = useState([]);
  const { openModal } = useStore();
  const options = [
    ['Trade-in', 80000],
    ['Кредит', 70000],
    ['Утилизация', 50000],
    ['Семейный автомобиль', 40000],
    ['Первый автомобиль', 30000],
    ['Онлайн-заявка', 30000],
  ];
  const discount = selected.reduce((sum, index) => sum + options[index][1], 0);
  function toggle(index) {
    setSelected((previous) =>
      previous.includes(index)
        ? previous.filter((value) => value !== index)
        : [
            ...previous.filter(
              (value) =>
                !([0, 2].includes(index) && [0, 2].includes(value)) &&
                !([3, 4].includes(index) && [3, 4].includes(value)),
            ),
            index,
          ],
    );
  }
  return (
    <Section title="Получите дополнительную выгоду" id="discounts">
      <div className="discount-grid">
        {options.map(([title, value], index) => (
          <label className={selected.includes(index) ? 'active' : ''} key={title}>
            <b>{title}</b>
            <span>Выгода до {money(value)}</span>
            <Switch checked={selected.includes(index)} onChange={() => toggle(index)} />
          </label>
        ))}
      </div>
      <div className="discount-total">
        <span>
          Ваша выгода <b>{money(discount)}</b>
        </span>
        <span>
          Цена с выбранными предложениями <b>{money(car.oldPrice - discount)}</b>
        </span>
        <Button
          onClick={() =>
            openModal('reserve', car, { details: { discount, options: selected.map((index) => options[index][0]) } })
          }
        >
          Зафиксировать скидку
        </Button>
      </div>
    </Section>
  );
}
export function TechnicalSpecs({ car }) {
  const specs = [
    ['Объём двигателя', car.engine + ' л'],
    ['Мощность', car.hp + ' л.с.'],
    ['Тип топлива', 'Бензин'],
    ['Коробка передач', car.gear],
    ['Привод', car.drive],
    ['Тип кузова', car.body],
    ['Максимальная скорость', car.speed + ' км/ч'],
    ['Разгон до 100 км/ч', car.acceleration + ' с'],
    ['Расход топлива', car.fuel + ' л/100 км'],
    ['Год выпуска', car.year],
  ];
  return (
    <Section title="Технические характеристики" id="specs">
      <div className="dimensions">
        <img src={asset.sizeFront} alt="Габариты: вид спереди" />
        <img src={asset.sizeBack} alt="Габариты: вид сзади" />
        <img src={asset.sizeSide} alt="Габариты: вид сбоку" />
      </div>
      {['Двигатель и трансмиссия', 'Кузов и эксплуатационные характеристики'].map((title, index) => (
        <Accordion key={title} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h3>{title}</h3>
          </AccordionSummary>
          <AccordionDetails>
            <dl className="spec-table">
              {specs.slice(index * 5, index * 5 + 5).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </AccordionDetails>
        </Accordion>
      ))}
    </Section>
  );
}
export function VehicleGallery({ car }) {
  const [thumbs, setThumbs] = useState(null);
  const gallery =
    car.model === 'Camry'
      ? ['camry', 'camryBlack', 'camryPhoto']
      : car.model === 'Corolla'
        ? ['corolla', 'corollaWhite', 'corollaRoad', 'interior']
        : [car.image];
  return (
    <Section title="Фотогалерея" id="gallery">
      <div className="vehicle-gallery">
        <Swiper
          modules={[Navigation, Thumbs, A11y]}
          navigation
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        >
          {gallery.map((key) => (
            <SwiperSlide key={key}>
              <img src={asset[key]} alt={carTitle(car)} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbs}
          watchSlidesProgress
          slidesPerView={Math.min(4, gallery.length)}
          spaceBetween={20}
          className="gallery-thumbs"
        >
          {gallery.map((key) => (
            <SwiperSlide key={key}>
              <img src={asset[key]} alt={'Фото ' + carTitle(car)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
