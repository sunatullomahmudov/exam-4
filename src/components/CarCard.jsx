import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder, CardGiftcard, Speed, LocalGasStation, Timer, Settings } from '@mui/icons-material';
import { asset } from '../assets';
import { carTitle, carUrl, money, monthlyPayment } from '../data/content';
import { useStore } from '../context/useStore';
import CompareIcon from './CompareIcon';
export function CarActions({ car }) {
  const { favorites, compared, toggleFavorite, toggleCompare } = useStore();
  return (
    <div className="car-actions">
      <button
        aria-label={(favorites.includes(car.id) ? 'Удалить из избранного: ' : 'В избранное: ') + carTitle(car)}
        aria-pressed={favorites.includes(car.id)}
        onClick={() => toggleFavorite(car.id)}
      >
        {favorites.includes(car.id) ? <Favorite /> : <FavoriteBorder />}
      </button>
      <button
        aria-label={'Сравнить: ' + carTitle(car)}
        aria-pressed={compared.includes(car.id)}
        onClick={() => toggleCompare(car.id)}
      >
        <CompareIcon />
      </button>
    </div>
  );
}
export function CarButtons({ car }) {
  const { openModal } = useStore();
  return (
    <div className="car-buttons">
      <button onClick={() => openModal('reserve', car)}>Резерв онлайн</button>
      <button onClick={() => openModal('offer', car)}>Купить</button>
      <Link to={carUrl(car)}>Подробнее</Link>
    </div>
  );
}
export default function CarCard({ car, horizontal = false }) {
  const used = car.category === 'used';
  const taxi = car.category === 'taxi';
  return (
    <article
      className={
        'car-card ' + (used ? 'used-card ' : '') + (taxi ? 'taxi-card ' : '') + (horizontal ? 'horizontal-card' : '')
      }
    >
      <CarActions car={car} />
      <div className="car-card-heading">
        <Link to={carUrl(car)}>
          <h3>
            {carTitle(car)}
            <br />
            {used ? car.year : car.trim}
          </h3>
        </Link>
      </div>
      <div className="car-visual">
        {!used && !taxi && <img className="car-city" src={asset.city} alt="" />}
        {!used && !taxi && (
          <>
            <div className="car-offer">
              <span>Предложение дня</span>
              <small>
                Выгода
                <br />
                до {money(car.oldPrice - car.price)}
              </small>
            </div>
            <ul className="car-gifts">
              {['Оборудование', 'КАСКО', 'Комплект резины'].map((gift) => (
                <li key={gift}>
                  <CardGiftcard />
                  <span>
                    {gift}
                    <em>в подарок</em>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        <Link to={carUrl(car)} className="car-image-link">
          <img
            className={'car-image ' + (car.image === 'octavia' ? 'compact-cutout' : '')}
            src={asset[car.image]}
            alt={carTitle(car) + ' ' + car.trim}
            loading="lazy"
          />
        </Link>
      </div>
      {used && (
        <div className="used-specs">
          <span>
            Пробег: <b>{car.mileage.toLocaleString('ru-RU')} км</b>
          </span>
          <span>
            Двигатель: <b>{car.engine} л</b>
          </span>
          <span>
            Коробка: <b>{car.gear}</b>
          </span>
          <span>
            Привод: <b>{car.drive}</b>
          </span>
          <span>
            Кузов: <b>{car.body}</b>
          </span>
          <span>
            Мощность: <b>{car.hp} л.с.</b>
          </span>
        </div>
      )}
      <div className="car-price">
        <strong>от {money(car.price)}</strong>
        <span>
          {taxi ? 'В день от ' : 'Кредит от '}
          <b>{money(monthlyPayment(car.price) / (taxi ? 30 : 1))}</b>
          {taxi ? '' : '/мес.'}
        </span>
      </div>
      {!used && (
        <div className="car-specs">
          <span>
            <Settings />
            {car.hp} л.с.
          </span>
          <span>
            <LocalGasStation />
            {car.fuel} л/км
          </span>
          <span>
            <Speed />
            {car.speed} км/ч
          </span>
          <span>
            <Timer />
            {car.acceleration} с.
          </span>
        </div>
      )}
      <CarButtons car={car} />
    </article>
  );
}
