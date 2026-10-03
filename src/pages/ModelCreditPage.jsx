import { useParams } from 'react-router-dom';
import { cars } from '../data/content';
import { ModelHero } from '../components/Hero';
import { ProgramAdvantages, CreditAdvantages, CreditConditionsBanner } from '../components/CreditBenefits';
import CreditCalculator from '../components/CreditCalculator';
import { Banks, CompetitorBanner, Trust, Reviews, Seo } from '../components/Marketing';
import CarCard from '../components/CarCard';
import { Section } from '../components/Ui';
import NotFoundPage from './NotFoundPage';

export default function ModelCreditPage() {
  const { id } = useParams();
  const car = cars.find((item) => item.id === id);
  if (!car) return <NotFoundPage />;
  return (
    <>
      <ModelHero car={car} />
      <ProgramAdvantages />
      <CreditCalculator key={id} car={car} />
      <CreditAdvantages />
      <CreditConditionsBanner />
      <Banks />
      <CompetitorBanner />
      <Trust />
      <Reviews />
      <Section title="Похожие автомобили">
        <div className="car-grid">
          {cars
            .filter((item) => item.category === 'new' && item.id !== id)
            .slice(0, 3)
            .map((item) => (
              <CarCard key={item.id} car={item} />
            ))}
        </div>
      </Section>
      <Seo title={car.brand + ' ' + car.model + ' в кредит'} full />
    </>
  );
}
