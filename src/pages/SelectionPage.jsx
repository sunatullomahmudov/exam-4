import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { cars, collections } from '../data/content';
import Filters from '../components/Filters';
import { filterCars } from '../data/filters';
import CarCard from '../components/CarCard';
import { Button, EmptyState, PageTitle, Section } from '../components/Ui';
import { ConsultantBanner, SpecialOffers } from '../components/Marketing';
import LeadForm from '../components/LeadForm';
export default function SelectionPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('type') || 'new';
  return <SelectionContent key={category} category={category} setParams={setParams} />;
}
function SelectionContent({ category, setParams }) {
  const [filters, setFilters] = useState({});
  const [limit, setLimit] = useState(6);
  const results = filterCars(
    cars.filter((car) => car.category === category),
    filters,
  );
  return (
    <>
      <PageTitle title="Подбор авто" />
      <Section className="selection-page">
        <div className="category-tabs">
          {[
            ['new', 'Новые автомобили'],
            ['used', 'С пробегом'],
          ].map(([key, title]) => (
            <button
              key={key}
              className={category === key ? 'active' : ''}
              onClick={() => {
                setParams({ type: key });
                setFilters({});
                setLimit(6);
              }}
            >
              {title}
            </button>
          ))}
        </div>
        <Filters
          key={category}
          category={category}
          advanced
          onApply={(next) => {
            setFilters(next);
            setLimit(6);
          }}
        />
        <div className="selection-help">
          <h3>Не можете определиться с выбором?</h3>
          <LeadForm kind="Помощь в подборе" compact phoneOnly />
        </div>
        <div className="collection-chips">
          {collections.map(([slug, title]) => (
            <Link to={'/collections/' + slug} key={slug}>
              {title}
            </Link>
          ))}
        </div>
        <h2>
          {filters.brand ? filters.brand + ' ' + (filters.model || '') : 'Подходящие автомобили'}{' '}
          <small>({results.length})</small>
        </h2>
        {results.length ? (
          <div className="model-list">
            {results.slice(0, limit).map((car) => (
              <CarCard key={car.id} car={car} horizontal />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        {limit < results.length && (
          <div className="show-more">
            <Button onClick={() => setLimit(limit + 6)}>Показать ещё</Button>
          </div>
        )}
      </Section>
      <SpecialOffers />
      <ConsultantBanner />
    </>
  );
}
