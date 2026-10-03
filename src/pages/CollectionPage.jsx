import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cars, collections } from '../data/content';
import Filters from '../components/Filters';
import { filterCars } from '../data/filters';
import CarCard from '../components/CarCard';
import { Button, EmptyState, PageTitle, Section } from '../components/Ui';
import { Collections, Seo } from '../components/Marketing';
import NotFoundPage from './NotFoundPage';
export default function CollectionPage() {
  const { slug } = useParams();
  return <CollectionContent key={slug} slug={slug} />;
}
function CollectionContent({ slug }) {
  const collection = collections.find((item) => item[0] === slug);
  const [filters, setFilters] = useState({});
  const [limit, setLimit] = useState(6);
  if (!collection) return <NotFoundPage />;
  const bodyGroups = {
    family: ['Седан', 'Кроссовер', 'Лифтбек'],
    travel: ['Кроссовер'],
    city: ['Седан', 'Хэтчбек', 'Лифтбек'],
    crossover: ['Кроссовер'],
    hatchback: ['Хэтчбек'],
    suv: ['Кроссовер'],
    pickup: ['Пикап'],
    minivan: ['Минивэн'],
    van: ['Фургон'],
  };
  const source = cars.filter((car) => car.category === 'new' && (bodyGroups[slug] || []).includes(car.body));
  const results = filterCars(source, filters);
  return (
    <>
      <PageTitle title={collection[1]} />
      <Section>
        <Filters
          key={slug}
          sourceCars={source}
          checkboxBrands
          onApply={(next) => {
            setFilters(next);
            setLimit(6);
          }}
        />
        {results.length ? (
          <div className="car-grid mt-8">
            {results.slice(0, limit).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="В этой подборке пока нет автомобилей"
            text="Посмотрите другие подборки или подберите автомобиль в каталоге."
          />
        )}
        {limit < results.length && (
          <div className="show-more">
            <Button onClick={() => setLimit(limit + 6)}>Показать ещё</Button>
          </div>
        )}
      </Section>
      <Seo title={collection[1]} full />
      <Collections />
    </>
  );
}
