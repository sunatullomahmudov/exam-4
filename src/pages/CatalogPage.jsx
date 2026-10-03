import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cars } from '../data/content';
import Filters from '../components/Filters';
import { filterCars } from '../data/filters';
import CarCard from '../components/CarCard';
import { Button, EmptyState, PageTitle, Section } from '../components/Ui';
import { BlogPreview, Seo } from '../components/Marketing';
export default function CatalogPage({ category = 'new' }) {
  const [params, setParams] = useSearchParams();
  const [limit, setLimit] = useState(6);
  const filters = Object.fromEntries(params);
  const results = filterCars(
    cars.filter((car) => car.category === category),
    filters,
  );
  const title = category === 'used' ? 'Автомобили с пробегом' : 'Каталог авто';
  function apply(next) {
    setParams(Object.fromEntries(Object.entries(next).filter(([, value]) => value !== '')));
    setLimit(6);
  }
  return (
    <>
      <PageTitle title={title} />
      <Section className="catalog-section">
        <Filters key={params.toString()} category={category} initial={filters} onApply={apply} />
        {results.length ? (
          <>
            <div className="catalog-result-count">Найдено автомобилей: {results.length}</div>
            <div className="car-grid">
              {results.slice(0, limit).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            {limit < results.length && (
              <div className="show-more">
                <Button onClick={() => setLimit(limit + 6)}>Показать ещё</Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </Section>
      {category === 'used' && <BlogPreview />}
      <Seo title={title} full />
    </>
  );
}
