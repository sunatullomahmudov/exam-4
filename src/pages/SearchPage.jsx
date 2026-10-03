import { useSearchParams } from 'react-router-dom';
import { cars } from '../data/content';
import CarCard from '../components/CarCard';
import { EmptyState, PageTitle, Section } from '../components/Ui';
export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();
  const results = query
    ? cars.filter((car) => (car.brand + ' ' + car.model + ' ' + car.trim).toLowerCase().includes(query.toLowerCase()))
    : [];
  return (
    <>
      <PageTitle title="Поиск по сайту" />
      <Section>
        <h2>Результаты поиска «{query}»</h2>
        <p className="muted mb-6">Найдено автомобилей: {results.length}</p>
        {results.length ? (
          <div className="car-grid">
            {results.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </Section>
    </>
  );
}
