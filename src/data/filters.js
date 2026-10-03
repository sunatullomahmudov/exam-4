export const emptyFilters = {
  brand: '',
  model: '',
  body: '',
  gear: '',
  country: '',
  year: '',
  engine: '',
  drive: '',
  trim: '',
  brands: [],
  priceMin: 0,
  price: 4000000,
};
export function filterCars(list, filters) {
  const selectedBrands = Array.isArray(filters.brands)
    ? filters.brands
    : (filters.brands || '').split(',').filter(Boolean);
  return list.filter(
    (car) =>
      ['brand', 'model', 'body', 'gear', 'country', 'year', 'engine', 'drive', 'trim'].every(
        (key) => !filters[key] || String(car[key]) === String(filters[key]),
      ) &&
      car.price <= Number(filters.price || 4000000) &&
      car.price >= Number(filters.priceMin || 0) &&
      (!selectedBrands.length || selectedBrands.includes(car.brand)),
  );
}
