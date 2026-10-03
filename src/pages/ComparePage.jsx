import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useStore } from '../context/useStore';
import { cars, carTitle, carUrl, money } from '../data/content';
import { asset } from '../assets';
import { CarActions } from '../components/CarCard';
import { Button, EmptyState, PageTitle, Section } from '../components/Ui';
import CategoryTabs from '../components/CategoryTabs';
export default function ComparePage() {
  const { compared, toggleCompare, clearCompare } = useStore();
  const [params, setParams] = useSearchParams();
  const category = params.get('type') || 'new';
  const [different, setDifferent] = useState(false);
  const selected = cars.filter((car) => compared.includes(car.id));
  const list = selected.filter((car) => car.category === category);
  const rows = [
    ['Стоимость', (car) => money(car.price)],
    ['Выгода', (car) => money(car.oldPrice - car.price)],
    ['Состояние', (car) => (car.category === 'used' ? 'С пробегом' : 'Новый')],
    ['Марка', (car) => car.brand],
    ['Модель', (car) => car.model],
    ['Комплектация', (car) => car.trim],
    ['Год выпуска', (car) => car.year],
    ['Пробег', (car) => car.mileage + ' км'],
    ['Двигатель', (car) => car.engine + ' л'],
    ['Мощность', (car) => car.hp + ' л.с.'],
    ['Коробка передач', (car) => car.gear],
    ['Кузов', (car) => car.body],
    ['Привод', (car) => car.drive],
    ['Расход топлива', (car) => car.fuel + ' л / 100 км'],
    ['Максимальная скорость', (car) => car.speed + ' км/ч'],
    ['Разгон до 100 км/ч', (car) => car.acceleration + ' с'],
  ];
  return (
    <>
      <PageTitle title="Сравнение автомобилей" />
      <Section className="saved-page">
        <CategoryTabs items={selected} category={category} onChange={(type) => setParams({ type })} />
        {list.length ? (
          <>
            <div className="compare-toolbar">
              <label>
                <Checkbox checked={different} onChange={(event) => setDifferent(event.target.checked)} />
                Показать только различия
              </label>
              <button onClick={clearCompare}>Очистить сравнение</button>
            </div>
            <div className="compare-scroll">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Характеристики</th>
                    {list.map((car) => (
                      <th key={car.id}>
                        <button
                          className="compare-remove"
                          aria-label={'Убрать из сравнения ' + carTitle(car)}
                          onClick={() => toggleCompare(car.id)}
                        >
                          <Close />
                        </button>
                        <CarActions car={car} />
                        <Link to={carUrl(car)}>
                          <img src={asset[car.image]} alt={carTitle(car)} />
                          <h3>{carTitle(car)}</h3>
                          <span>{car.trim}</span>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows
                    .filter(([, get]) => !different || new Set(list.map(get)).size > 1)
                    .map(([label, get]) => (
                      <tr key={label}>
                        <th>{label}</th>
                        {list.map((car) => (
                          <td key={car.id}>{get(car)}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Button to="/catalog" className="mt-8">
              Добавить автомобиль
            </Button>
          </>
        ) : (
          <EmptyState
            title="Выберите автомобили для сравнения"
            text="Нажмите на значок сравнения в карточке автомобиля."
          />
        )}
      </Section>
    </>
  );
}
