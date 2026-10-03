import { HomeHero } from '../components/Hero';
import Filters from '../components/Filters';
import CarCard from '../components/CarCard';
import CreditCalculator from '../components/CreditCalculator';
import { cars } from '../data/content';
import { Button, Section } from '../components/Ui';
import {
  AboutVideo,
  Banks,
  BlogPreview,
  Collections,
  CompetitorBanner,
  MapBlock,
  Reviews,
  Seo,
  SpecialOffers,
  Trust,
} from '../components/Marketing';
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="container home-filter">
        <Filters />
      </div>
      <Section title="Автомобили в наличии с ПТС" className="inventory-home">
        <div className="car-grid">
          {cars
            .filter((car) => car.category === 'new')
            .slice(0, 6)
            .map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
        </div>
        <div className="show-more">
          <Button to="/catalog">Показать все</Button>
        </div>
      </Section>
      <Collections />
      <CompetitorBanner />
      <SpecialOffers />
      <CreditCalculator compact />
      <Banks insurance />
      <Trust />
      <Reviews />
      <AboutVideo />
      <BlogPreview />
      <Seo />
      <MapBlock full />
    </>
  );
}
