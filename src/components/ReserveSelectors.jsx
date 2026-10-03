import { cars } from '../data/content';
import { useStore } from '../context/useStore';
import { Select } from './Ui';

export default function ReserveSelectors({ car }) {
  const { openModal } = useStore();
  const available = cars.filter((item) => item.category === car.category);
  const choose = (next) => openModal('reserve', next);
  return (
    <>
      <Select
        label="Марка для бронирования"
        value={car.brand}
        options={[...new Set(available.map((item) => item.brand))]}
        onChange={(event) => {
          const next = available.find((item) => item.brand === event.target.value);
          if (next) choose(next);
        }}
      />
      <Select
        label="Модель для бронирования"
        value={car.id}
        options={available
          .filter((item) => item.brand === car.brand)
          .map((item) => ({ value: item.id, label: item.model }))}
        onChange={(event) => {
          const next = available.find((item) => item.id === event.target.value);
          if (next) choose(next);
        }}
      />
    </>
  );
}
