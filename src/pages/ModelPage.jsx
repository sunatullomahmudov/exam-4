import { Link, useParams } from 'react-router-dom';
import { cars } from '../data/content';
import { ModelHero, ProgramHero } from '../components/Hero';
import { Section } from '../components/Ui';
import { DiscountOptions, Equipment, TechnicalSpecs, TrimList, VehicleGallery } from '../components/VehicleDetails';
import { BlogPreview, ConsultantBanner, Reviews, Seo, Trust } from '../components/Marketing';
import CarCard from '../components/CarCard';
import CreditCalculator from '../components/CreditCalculator';
import NotFoundPage from './NotFoundPage';
export default function ModelPage({ mode = 'model' }) {
  const { id, trim } = useParams();
  const original = cars.find((car) => car.id === id);
  if (!original || (trim !== undefined && !['0', '1', '2'].includes(trim))) return <NotFoundPage />;
  const car = trim
    ? {
        ...original,
        trim: [original.trim, 'Комфорт', 'Элеганс'][Number(trim)] || original.trim,
        price: original.price + Number(trim) * 120000,
      }
    : original;
  const similar = cars.filter((item) => item.category === 'new' && item.id !== car.id).slice(0, 3);
  return (
    <>
      <ModelHero car={car} trim={mode === 'trim'} />
      <nav className="container detail-tabs">
        <a href="#stock">В наличии</a>
        <a href="#specs">Характеристики</a>
        <a href="#gallery">Фотогалерея</a>
        <a href="#discounts">Преимущества</a>
        <Link to={'/model/' + original.id + '/credit'}>Купить в кредит</Link>
      </nav>
      {mode === 'credit' ? (
        <CreditCalculator key={car.id} car={car} />
      ) : mode === 'trim' ? (
        <Section title={'Комплектация ' + car.trim}>
          <Equipment car={car} />
        </Section>
      ) : (
        <TrimList car={car} />
      )}
      <DiscountOptions car={car} />
      <ProgramHero
        secondary
        program={{
          slug: 'trade-in',
          title: 'Обменяйте свой автомобиль на новый',
          image: 'tradeBanner',
          rate: 'до 120 000 ₽',
          subtitle: 'Выгодные условия по программе Trade-in',
        }}
      />
      {mode !== 'credit' && <TechnicalSpecs car={car} />}
      {mode === 'trim' && <TrimList car={original} />}
      <VehicleGallery car={car} />
      <Section title="Вам также может понравиться">
        <div className="car-grid">
          {similar.map((item) => (
            <CarCard key={item.id} car={item} />
          ))}
        </div>
      </Section>
      <Trust />
      <Reviews />
      <BlogPreview />
      <ConsultantBanner />
      <Seo title={car.brand + ' ' + car.model + ' в автосалоне ABC'} full />
    </>
  );
}
