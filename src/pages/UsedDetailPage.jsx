import { useParams } from 'react-router-dom';
import { cars, carTitle, money } from '../data/content';
import { asset } from '../assets';
import { useStore } from '../context/useStore';
import { Button, PageTitle, Section } from '../components/Ui';
import CarCard, { CarActions } from '../components/CarCard';
import { Equipment, TechnicalSpecs, VehicleGallery } from '../components/VehicleDetails';
import CreditCalculator from '../components/CreditCalculator';
import { ProgramHero } from '../components/Hero';
import { SpecialOffers } from '../components/Marketing';
import NotFoundPage from './NotFoundPage';
export default function UsedDetailPage() {
  const { id } = useParams();
  const car = cars.find((item) => item.id === id && item.category === 'used');
  const { openModal } = useStore();
  if (!car) return <NotFoundPage />;
  return (
    <>
      <PageTitle title={carTitle(car) + ' ' + car.year} crumbs={[['Авто с пробегом', '/used']]} compact />
      <Section className="used-detail">
        <div className="used-detail-photo">
          <img src={asset[car.image]} alt={carTitle(car)} />
        </div>
        <div className="used-detail-info">
          <CarActions car={car} />
          <h1>
            {carTitle(car)} {car.year}
          </h1>
          <strong>{money(car.price)}</strong>
          <dl className="spec-table">
            {[
              ['Пробег', car.mileage.toLocaleString('ru-RU') + ' км'],
              ['Двигатель', car.engine + ' л / ' + car.hp + ' л.с.'],
              ['Коробка', car.gear],
              ['Привод', car.drive],
              ['Кузов', car.body],
            ].map(([title, value]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Button onClick={() => openModal('reserve', car)}>Резерв онлайн</Button>
          <Button className="button-dark" onClick={() => openModal('credit', car)}>
            Купить в кредит
          </Button>
          <p>
            ✓ Юридическая проверка
            <br />✓ Диагностика автомобиля
            <br />✓ Возможность обмена по Trade-in
          </p>
        </div>
      </Section>
      <SpecialOffers />
      <CreditCalculator car={car} />
      <Section title="Описание">
        <p>
          {carTitle(car)} {car.year} года с пробегом {car.mileage.toLocaleString('ru-RU')} км. {car.engine}-литровый
          бензиновый двигатель, {car.gear.toLowerCase()}, {car.drive.toLowerCase()} привод. Запишитесь на осмотр и
          тест-драйв, чтобы познакомиться с автомобилем.
        </p>
        <Equipment car={car} />
      </Section>
      <TechnicalSpecs car={car} />
      <VehicleGallery car={car} />
      <ProgramHero
        secondary
        program={{
          slug: 'trade-in',
          title: 'Обменяйте свой автомобиль',
          image: 'tradeBanner',
          rate: 'до 120 000 ₽',
          subtitle: 'Оценка автомобиля и подбор нового в одном месте',
        }}
      />
      <Section title="Похожие автомобили">
        <div className="car-grid">
          {cars
            .filter((item) => item.category === 'used' && item.id !== id)
            .slice(0, 3)
            .map((item) => (
              <CarCard key={item.id} car={item} />
            ))}
        </div>
      </Section>
    </>
  );
}
