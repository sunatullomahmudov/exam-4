import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/useStore';
import { cars } from '../data/content';
import CarCard from '../components/CarCard';
import { EmptyState, PageTitle, Section } from '../components/Ui';
import CategoryTabs from '../components/CategoryTabs';
import { categories } from '../data/categories';
export default function FavoritesPage() {
  const { favorites, clearFavorites } = useStore();
  const [params, setParams] = useSearchParams();
  const category = params.get('type') || 'new';
  const saved = cars.filter((car) => favorites.includes(car.id));
  const shown = saved.filter((car) => car.category === category);
  return (
    <>
      <PageTitle title="Избранное" />
      <Section className="saved-page">
        <CategoryTabs items={saved} category={category} onChange={(type) => setParams({ type })} />
        <div className="section-heading">
          <h2>{categories.find(([key]) => key === category)?.[1]}</h2>
          {saved.length > 0 && (
            <button className="muted underline" onClick={clearFavorites}>
              Очистить избранное
            </button>
          )}
        </div>
        {shown.length ? (
          <div className="car-grid">
            {shown.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="В избранном пока пусто"
            text="Нажмите на сердечко рядом с автомобилем, чтобы сохранить его здесь."
          />
        )}
      </Section>
    </>
  );
}
