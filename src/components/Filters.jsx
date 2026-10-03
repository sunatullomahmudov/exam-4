import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@mui/material';
import { brands, cars, money } from '../data/content';
import { brandLogo } from '../assets';
import { Button, Select } from './Ui';
import { emptyFilters, filterCars } from '../data/filters';
export default function Filters({
  category = 'new',
  initial = {},
  onApply,
  advanced = false,
  checkboxBrands = false,
  sourceCars,
}) {
  const [filters, setFilters] = useState({
    ...emptyFilters,
    ...initial,
    brands: Array.isArray(initial.brands) ? initial.brands : (initial.brands || '').split(',').filter(Boolean),
  });
  const navigate = useNavigate();
  const source = sourceCars || cars.filter((car) => car.category === category);
  const filtered = useMemo(() => filterCars(source, filters), [source, filters]);
  const set = (key, value) =>
    setFilters((previous) => ({
      ...previous,
      [key]: value,
      ...(key === 'brand' ? { model: '', trim: '' } : {}),
      ...(key === 'model' ? { trim: '' } : {}),
    }));
  function apply(event) {
    event.preventDefault();
    if (onApply) onApply(filters);
    else {
      const query = new URLSearchParams(Object.entries(filters).filter(([key, value]) => value && key !== 'price'));
      query.set('price', filters.price);
      navigate((category === 'used' ? '/used' : '/catalog') + '?' + query);
    }
  }
  const choices = (key) => [
    ...new Set(source.filter((car) => !filters.brand || car.brand === filters.brand).map((car) => car[key])),
  ];
  return (
    <form onSubmit={apply} className={'filter-panel ' + (advanced ? 'advanced-filter' : 'quick-filter')}>
      {!advanced && (
        <div className="brand-grid">
          {brands.map((brand) => (
            <button
              type="button"
              key={brand}
              className={filters.brand === brand || filters.brands.includes(brand) ? 'selected' : ''}
              onClick={() =>
                checkboxBrands
                  ? set(
                      'brands',
                      filters.brands.includes(brand)
                        ? filters.brands.filter((value) => value !== brand)
                        : [...filters.brands, brand],
                    )
                  : set('brand', filters.brand === brand ? '' : brand)
              }
            >
              {checkboxBrands ? (
                <input
                  type="checkbox"
                  aria-label={brand}
                  readOnly
                  checked={filters.brands.includes(brand)}
                  tabIndex={-1}
                />
              ) : (
                brandLogo(brand) && <img src={brandLogo(brand)} alt="" />
              )}
              {brand}
            </button>
          ))}
        </div>
      )}
      <div className="filter-controls">
        {!advanced && <h3>Быстрый подбор авто</h3>}
        {!advanced && (
          <div className="price-range">
            <div>
              <span>Цена</span>
              <b>
                {money(filters.priceMin)} — {money(filters.price)}
              </b>
            </div>
            <Slider
              min={0}
              max={4000000}
              step={50000}
              value={[Number(filters.priceMin), Number(filters.price)]}
              onChange={(_, value) => setFilters((previous) => ({ ...previous, priceMin: value[0], price: value[1] }))}
              getAriaLabel={(index) => (index === 0 ? 'Минимальная цена' : 'Максимальная цена')}
            />
            <div className="range-labels">
              <span>0</span>
              <span>1м</span>
              <span>1,5м</span>
              <span>2м</span>
              <span>3м</span>
              <span>4м</span>
            </div>
          </div>
        )}
        <div className={'filter-fields ' + (advanced ? 'advanced-fields' : '')}>
          {(advanced || category === 'used') && (
            <>
              <Select
                label="Марка"
                value={filters.brand}
                onChange={(event) => set('brand', event.target.value)}
                options={brands}
              />
              <Select
                label="Модель"
                value={filters.model}
                onChange={(event) => set('model', event.target.value)}
                options={choices('model')}
              />
            </>
          )}
          {advanced && (
            <Select
              label="Комплектация"
              value={filters.trim}
              onChange={(event) => set('trim', event.target.value)}
              options={choices('trim')}
            />
          )}
          <Select
            label="Тип кузова"
            value={filters.body}
            onChange={(event) => set('body', event.target.value)}
            options={choices('body')}
          />
          <Select
            label="Коробка"
            value={filters.gear}
            onChange={(event) => set('gear', event.target.value)}
            options={choices('gear')}
          />
          {advanced && (
            <>
              <Select
                label="Цена до"
                value={filters.price}
                onChange={(event) => set('price', event.target.value || 4000000)}
                options={[1000000, 1500000, 2000000, 2500000, 3000000, 4000000].map((value) => ({
                  value,
                  label: money(value),
                }))}
              />
              <Select
                label="Страна"
                value={filters.country}
                onChange={(event) => set('country', event.target.value)}
                options={choices('country')}
              />
              <Select
                label="Год выпуска"
                value={filters.year}
                onChange={(event) => set('year', event.target.value)}
                options={choices('year')}
              />
              <Select
                label="Объём двигателя"
                value={filters.engine}
                onChange={(event) => set('engine', event.target.value)}
                options={choices('engine')}
              />
              <Select
                label="Привод"
                value={filters.drive}
                onChange={(event) => set('drive', event.target.value)}
                options={choices('drive')}
              />
            </>
          )}
          {advanced && (
            <button
              type="button"
              className="reset-filter"
              onClick={() => {
                setFilters(emptyFilters);
                onApply?.(emptyFilters);
              }}
            >
              Сбросить фильтр
            </button>
          )}
          <Button type="submit" className="filter-submit">
            Показать {filtered.length}
          </Button>
        </div>
      </div>
    </form>
  );
}
