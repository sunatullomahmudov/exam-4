import { categories } from '../data/categories';
export default function CategoryTabs({ items, category, onChange }) {
  return (
    <div className="category-tabs">
      {categories.map(([key, title]) => (
        <button key={key} className={category === key ? 'active' : ''} onClick={() => onChange(key)}>
          {title}
          <sup>{items.filter((car) => car.category === key).length}</sup>
        </button>
      ))}
      <span>Всего: {items.length}</span>
    </div>
  );
}
