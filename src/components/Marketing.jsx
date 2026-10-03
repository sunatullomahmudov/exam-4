import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PlayArrow, LocationOn, Phone, AccessTime } from '@mui/icons-material';
import { asset } from '../assets';
import { articles, collections, programs } from '../data/content';
import { useStore } from '../context/useStore';
import { Button, Carousel, Section } from './Ui';
import LeadForm from './LeadForm';
import videos from '../data/videos.json';
export function Collections({ all = false, showTitle = true }) {
  const items = all ? collections : collections.slice(0, 3);
  const render = ([slug, title, image]) => (
    <Link className="collection-card" to={'/collections/' + slug}>
      <img src={asset[image]} alt={title} loading="lazy" />
      <div>
        <h3>{title}</h3>
        <span>Подробнее</span>
      </div>
    </Link>
  );
  return (
    <Section
      title={showTitle ? 'Наши подборки' : undefined}
      action={
        !all && (
          <Link className="small-red" to="/collections">
            Все подборки
          </Link>
        )
      }
    >
      {all ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item[0]}>{render(item)}</div>
          ))}
        </div>
      ) : (
        <Carousel items={items} render={render} />
      )}
    </Section>
  );
}
export function SpecialOffers({ all = false }) {
  const items = all
    ? programs
    : ['first', 'family', 'express'].map((slug) => programs.find((item) => item.slug === slug));
  return (
    <Section title="Спецпредложения">
      <Carousel
        items={items}
        render={(program) => (
          <Link to={'/credit/' + program.slug} className="program-tile">
            <img src={asset[program.image]} alt="" loading="lazy" />
            <div>
              <h3>{program.title}</h3>
              <p>Выгодные условия покупки</p>
              <span>Подробнее</span>
            </div>
          </Link>
        )}
      />
    </Section>
  );
}
export function CompetitorBanner() {
  return (
    <Section>
      <div className="competitor-banner">
        <img src={asset.glove} alt="Боксёрская перчатка" loading="lazy" />
        <div>
          <h3>ПЕРЕБЬЕМ ПРЕДЛОЖЕНИЯ ОТ КОНКУРЕНТОВ!</h3>
          <p>
            Скидки <b>до 10%</b> на стоимость автомобиля
          </p>
          <LeadForm kind="Предложение конкурента" compact phoneOnly />
        </div>
      </div>
    </Section>
  );
}
export function Banks({ insurance = false }) {
  const banks = insurance
    ? [
        ['Альфа', 'СТРАХОВАНИЕ', '#ed1b35'],
        ['ВСК', 'СТРАХОВОЙ ДОМ', '#0077b9'],
        ['СОВКОМБАНК', 'СТРАХОВАНИЕ', '#437ab9'],
        ['РОСГОССТРАХ', '', '#a1002a'],
        ['СБЕРБАНК', '', '#32a852'],
        ['ВТБ', '', '#005ca9'],
      ]
    : [
        ['СБЕРБАНК', '', '#32a852'],
        ['ВТБ', '', '#005ca9'],
        ['Альфа-Банк', '', '#e40000'],
        ['СБЕРБАНК', '', '#32a852'],
        ['ВТБ', '', '#005ca9'],
      ];
  return (
    <Section title="Банки-партнёры">
      <Carousel
        columns={4}
        items={banks}
        render={([name, sub, color]) => (
          <Link to="/credit" className="bank-logo" style={{ color }}>
            <strong>{name}</strong>
            <small>{sub}</small>
          </Link>
        )}
      />
    </Section>
  );
}
export function Trust() {
  return (
    <Section title="Нам доверяют">
      <Carousel
        columns={4}
        items={['Яндекс', 'Google', '2ГИС', 'Авто.ру']}
        render={(name) => (
          <a
            className="trust-card"
            href={
              name === 'Google'
                ? 'https://www.google.com/maps/search/ABC+AUTO+Москва'
                : 'https://yandex.ru/maps/?text=ABC%20AUTO%20Москва'
            }
            target="_blank"
            rel="noreferrer"
          >
            <b>Сайт отзывов</b>
            <small>{name} — отзывы покупателей</small>
            <div>
              <span>Рекомендуют 90%</span>
              <strong>★★★★★</strong>
              <em>4,5</em>
            </div>
          </a>
        )}
      />
      <div className="map-ratings">
        <a href="https://yandex.ru/maps/?text=ABC%20AUTO%20Москва" target="_blank" rel="noreferrer">
          <b>
            <em>Я</em> Яндекс Карты
          </b>
          <span>
            Рекомендуют 90%<small>★★★★★</small>
          </span>
          <strong>4.5</strong>
        </a>
        <a href="https://www.google.com/maps/search/ABC+AUTO+Москва" target="_blank" rel="noreferrer">
          <b>
            <em>●</em> Google Maps
          </b>
          <span>
            Рекомендуют 90%<small>★★★★★</small>
          </span>
          <strong>4.1</strong>
        </a>
      </div>
    </Section>
  );
}
export { ReviewCard, Reviews } from './ReviewBlocks';
export function BlogPreview() {
  return (
    <Section
      title="Блог"
      action={
        <Link to="/blog" className="small-red">
          Все статьи
        </Link>
      }
    >
      <Carousel
        columns={4}
        items={articles.slice(0, 4)}
        render={(article) => (
          <Link className="blog-card" to={'/blog/' + article.slug}>
            <img src={asset[article.image]} alt={article.title} loading="lazy" />
            <small>{article.date}</small>
            <h3>{article.title}</h3>
          </Link>
        )}
      />
    </Section>
  );
}
export function AboutVideo() {
  const { openModal } = useStore();
  return (
    <Section className="about-video">
      <h2>О компании</h2>
      <p>
        Мы предлагаем новые автомобили и автомобили с пробегом. Поможем выбрать комплектацию, сравнить предложения и
        оформить покупку на удобных условиях.
      </p>
      <button
        aria-label="Смотреть видео о компании"
        onClick={() => openModal('video', null, { title: 'О компании ABC AUTO', videoId: videos.about })}
      >
        <img src={asset.team} alt="Команда автосалона ABC AUTO" loading="lazy" />
        <span className="play-button">
          <PlayArrow />
        </span>
      </button>
    </Section>
  );
}
export function Seo({ title = 'Об автосалоне ABC', full = false }) {
  const [tab, setTab] = useState('Автосалон');
  return (
    <Section className="seo">
      <div className="text-tabs">
        {['Автосалон', 'Трейд-ин', 'Кредит'].map((item) => (
          <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <h2>
        {tab === 'Автосалон'
          ? title
          : tab === 'Кредит'
            ? 'Покупка автомобиля в кредит'
            : 'Обмен автомобиля по программе Trade-in'}
      </h2>
      <p>
        {tab === 'Автосалон'
          ? 'Автосалон ABC AUTO предлагает широкий выбор новых автомобилей и автомобилей с пробегом. В каталоге представлены популярные марки и модели: сравните комплектации, характеристики и стоимость. Наши специалисты помогут подобрать автомобиль для города, семьи или путешествий.'
          : tab === 'Кредит'
            ? 'Выберите автомобиль, первоначальный взнос и срок кредита в калькуляторе. Размер ежемесячного платежа рассчитывается автоматически. Решение о предоставлении кредита и окончательные условия определяются банком.'
            : 'Вы можете обменять свой автомобиль на новый с зачётом его стоимости. Укажите данные автомобиля в форме, чтобы обсудить оценку и подходящие варианты обмена.'}
      </p>
      {full && (
        <>
          <h3>Автомобиль для ваших задач</h3>
          <p>
            Воспользуйтесь фильтрами по марке, модели, коробке передач и типу кузова. Сохраняйте интересующие автомобили
            в избранное и добавляйте их в сравнение, чтобы сопоставить характеристики и выбрать комплектацию.
          </p>
          <h3>Удобные условия покупки</h3>
          <p>
            Доступны программы автокредитования, рассрочка, страхование и Trade-in. Ознакомьтесь с автомобилем в
            каталоге и оставьте заявку для уточнения наличия и условий покупки.
          </p>
        </>
      )}
    </Section>
  );
}
export function MapBlock({ full = false, contact = true }) {
  const { openModal } = useStore();
  return (
    <div className={'map-block ' + (full ? 'wide-map' : 'container')}>
      <img src={asset.map} alt="Карта расположения автосалона: 38-й километр МКАД" loading="lazy" />
      {contact && (
        <div className="map-contact">
          <a href="tel:78005519431">
            <Phone /> +7 (800) 551-94-31
          </a>
          <p>
            <AccessTime /> Ежедневно с 08:00 до 21:00
          </p>
          <p>
            <LocationOn /> Россия, Москва, 38КМ МКАД, 6Бс1
          </p>
          <Button onClick={() => openModal('directions')}>Как до нас добраться</Button>
        </div>
      )}
    </div>
  );
}
export function ConsultantBanner() {
  return (
    <Section>
      <div className="consultant-banner">
        <div>
          <h2>Поможем выбрать ваш автомобиль</h2>
          <p>Оставьте заявку и получите персональное предложение</p>
          <LeadForm compact kind="Помощь в подборе" />
        </div>
        <img src={asset.consultant} alt="Консультант автосалона" loading="lazy" />
      </div>
    </Section>
  );
}
