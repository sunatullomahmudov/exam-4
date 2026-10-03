import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';
import { cars, carTitle, money, monthlyPayment } from '../data/content';
import { asset } from '../assets';
import { ModelHero, LeadStrip } from '../components/Hero';
import { Banks } from '../components/Marketing';
import { TrimList } from '../components/VehicleDetails';
import CreditCalculator from '../components/CreditCalculator';
import CarCard from '../components/CarCard';
import { Button, EmptyState, Section, Select } from '../components/Ui';
import { useStore } from '../context/useStore';
import NotFoundPage from './NotFoundPage';
function TaxiAdvantages() {
  return (
    <Section title="Такси в кредит">
      <p>
        Начните работать на собственном автомобиле. Подберите комплектацию, рассчитайте платёж и выберите подходящий
        класс такси.
      </p>
      <div className="taxi-advantages">
        {[
          'Автомобиль в собственности',
          'Без первоначального взноса',
          'Оформление от 30 минут',
          'Кредит от 1,9%',
          'Помощь с оформлением',
          'Выгодное страхование',
          'Комплект резины',
          'Несколько классов такси',
          'Поддержка при покупке',
        ].map((text) => (
          <span key={text}>
            <CheckCircle />
            {text}
          </span>
        ))}
      </div>
    </Section>
  );
}
function OwnTaxiBanner() {
  const { openModal } = useStore();
  return (
    <Section>
      <div className="own-taxi">
        <div>
          <h2>
            Своё такси
            <br />
            выгоднее аренды!
          </h2>
          <p>Работайте на себя и управляйте своим доходом</p>
          <Button
            onClick={() =>
              openModal(
                'credit',
                cars.find((car) => car.id === 'volkswagen-polo-taxi'),
              )
            }
          >
            Получить предложение
          </Button>
        </div>
        <img src={asset.taxiFront} alt="Volkswagen Polo — такси" />
      </div>
    </Section>
  );
}
export default function TaxiPage({ detail = false }) {
  const { id } = useParams();
  const [taxiClass, setTaxiClass] = useState('Все');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const taxiCars = cars.filter((car) => car.category === 'taxi');
  const car = taxiCars.find((item) => item.id === id);
  const list = taxiCars.filter(
    (item) =>
      (taxiClass === 'Все' || item.taxiClass === taxiClass) &&
      (!brand || item.brand === brand) &&
      (!model || item.model === model),
  );
  if (detail && !car) return <NotFoundPage />;
  return (
    <>
      {detail ? (
        <ModelHero car={car} />
      ) : (
        <>
          <div className="taxi-hero wide">
            <div className="container">
              <div>
                <p>ABC AUTO • Специальное предложение</p>
                <h1>Такси в кредит</h1>
                <h2>
                  Начните зарабатывать
                  <br />
                  на своём автомобиле!
                </h2>
                <strong>от 1,9%</strong>
                <p>Автомобиль для работы на выгодных условиях</p>
              </div>
              <img src={asset.taxiFront} alt="Жёлтый Volkswagen Polo для такси" />
            </div>
          </div>
          <LeadStrip kind="Такси в кредит" />
        </>
      )}
      <TaxiAdvantages />
      {detail ? (
        <TrimList car={car} taxi />
      ) : (
        <Section title="Автомобили для такси" className="taxi-inventory">
          <div className="category-tabs">
            {['Все', 'Эконом', 'Комфорт', 'Комфорт+'].map((item) => (
              <button key={item} className={taxiClass === item ? 'active' : ''} onClick={() => setTaxiClass(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="taxi-filters">
            <Select
              label="Марка"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                setModel('');
              }}
              options={[...new Set(taxiCars.map((item) => item.brand))]}
            />
            <Select
              label="Модель"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              options={taxiCars.filter((item) => !brand || item.brand === brand).map((item) => item.model)}
            />
          </div>
          {list.length ? (
            <div className="car-grid">
              {list.map((item) => (
                <CarCard key={item.id} car={item} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </Section>
      )}
      <OwnTaxiBanner />
      {!detail && (
        <>
          <CreditCalculator taxi />
          <Section title="Сколько можно зарабатывать">
            <div className="table-scroll">
              <table className="income-table">
                <thead>
                  <tr>
                    <th>Автомобиль</th>
                    <th>Класс</th>
                    <th>Платёж в день</th>
                    <th>Платёж в месяц</th>
                  </tr>
                </thead>
                <tbody>
                  {taxiCars.map((item) => (
                    <tr key={item.id}>
                      <th>{carTitle(item)}</th>
                      <td>{item.taxiClass}</td>
                      <td>{money(monthlyPayment(item.price) / 30)}</td>
                      <td>{money(monthlyPayment(item.price))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted mt-4">Доход зависит от количества поездок и расходов на обслуживание автомобиля.</p>
          </Section>
          <Banks />
        </>
      )}
    </>
  );
}
