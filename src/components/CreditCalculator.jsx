import { useState } from 'react';
import { Slider, Switch, Checkbox } from '@mui/material';
import { asset } from '../assets';
import { cars, carTitle, money, monthlyPayment } from '../data/content';
import { Select, Section } from './Ui';
import LeadForm from './LeadForm';
const available = cars.filter((car) => car.category === 'new');
export default function CreditCalculator({ compact = false, car: initialCar, program = 'express', taxi = false }) {
  const source = taxi
    ? cars.filter((car) => car.category === 'taxi')
    : initialCar?.category === 'used'
      ? cars.filter((car) => car.category === 'used')
      : available;
  const [carId, setCarId] = useState(initialCar?.id || '');
  const [brand, setBrand] = useState(initialCar?.brand || '');
  const [months, setMonths] = useState(36);
  const [depositPercent, setDepositPercent] = useState(10);
  const [credit, setCredit] = useState(program !== 'trade-in');
  const [trade, setTrade] = useState(['express', 'trade-in', 'recycling'].includes(program));
  const [bank, setBank] = useState('Сбербанк');
  const [gift, setGift] = useState('Комплект зимних шин');
  const [tradeData, setTradeData] = useState({ brand: '', model: '', year: '', mileage: '', gear: '' });
  const car = source.find((item) => item.id === carId);
  const price = car?.price || 2200000;
  const deposit = (price * depositPercent) / 100;
  const rate = program === 'installment' ? 0 : 1.9;
  const payment = monthlyPayment(price, months, deposit, rate);
  const chooseBrand = (event) => {
    setBrand(event.target.value);
    setCarId('');
  };
  const tradeChange = (key, event) => setTradeData({ ...tradeData, [key]: event.target.value });
  const selectors = (
    <div className="credit-selects">
      <Select
        label="Марка автомобиля"
        value={brand}
        onChange={chooseBrand}
        options={[...new Set(source.map((item) => item.brand))]}
      />
      <Select
        label="Модель автомобиля"
        value={carId}
        onChange={(event) => setCarId(event.target.value)}
        options={source
          .filter((item) => !brand || item.brand === brand)
          .map((item) => ({ value: item.id, label: item.model }))}
      />
      <Select
        label="Комплектация"
        value={carId}
        onChange={(event) => setCarId(event.target.value)}
        options={source
          .filter((item) => !brand || item.brand === brand)
          .map((item) => ({ value: item.id, label: item.trim }))}
      />
    </div>
  );
  const sliders = (
    <div className="credit-sliders">
      <label>
        <span>
          Срок кредита, месяцев <b>{months} мес.</b>
        </span>
        <Slider
          value={months}
          min={6}
          max={84}
          step={6}
          aria-label="Срок кредита"
          onChange={(_, value) => setMonths(value)}
        />
        <small>
          6 мес. <span>84 мес.</span>
        </small>
      </label>
      <label>
        <span>
          Первоначальный взнос <b>{money(deposit)}</b>
        </span>
        <Slider
          value={depositPercent}
          min={0}
          max={90}
          step={5}
          aria-label="Первоначальный взнос"
          onChange={(_, value) => setDepositPercent(value)}
        />
        <small>
          0% <span>90%</span>
        </small>
      </label>
    </div>
  );
  const preview = (
    <div className="credit-preview">
      <img src={asset[car?.image || 'covered']} alt={car ? carTitle(car) : 'Ваш будущий автомобиль'} />
      <div>
        <b>{car ? carTitle(car) : 'Ваш будущий автомобиль'}</b>
        <p>{money(price)}</p>
        <small>Ежемесячный платёж</small>
        <strong>{money(payment)} / мес.</strong>
      </div>
    </div>
  );
  const details = {
    program,
    months,
    deposit,
    rate,
    payment: Math.round(payment),
    credit,
    trade,
    bank,
    gift,
    tradeData,
  };
  if (compact)
    return (
      <section className="credit-home wide">
        <div className="container">
          <h2>Заявка на автокредит</h2>
          <div className="credit-home-grid">
            <div>
              {selectors}
              <div className="credit-home-calculation">
                {preview}
                {sliders}
              </div>
            </div>
            <div className="credit-home-lead">
              <h3>
                Получить выгоду
                <br />
                <em>300 000 ₽</em>
              </h3>
              <LeadForm kind="Автокредит" car={car} details={details} />
            </div>
          </div>
        </div>
      </section>
    );
  return (
    <Section className={'credit-calculator ' + (taxi ? 'taxi-calculator' : '')} id="credit-calculator">
      <div className="credit-step">
        <span className="step-number">1</span>
        <div>
          <h3>Ваш будущий автомобиль</h3>
          {selectors}
        </div>
        {preview}
      </div>
      <div className="credit-step">
        <span className="step-number">2</span>
        <div>
          <h3>
            Купить в кредит{' '}
            <Switch
              checked={credit}
              onChange={(event) => setCredit(event.target.checked)}
              slotProps={{ input: { 'aria-label': 'Купить в кредит' } }}
            />
          </h3>
          {credit && sliders}
        </div>
        <div>
          {credit && (
            <>
              <p className="checkbox-line">
                <Checkbox checked readOnly size="small" /> Ставка от {rate}% годовых
              </p>
              <p>
                Платёж: <b>{money(payment)} / мес.</b>
              </p>
              <p>Первоначальный взнос: {money(deposit)}</p>
            </>
          )}
        </div>
        {credit && (
          <div className="bank-options">
            <span>Выберите банк</span>
            {['Сбербанк', 'ВТБ', 'Альфа-Банк', 'Совкомбанк'].map((name) => (
              <label key={name} className={bank === name ? 'selected' : ''}>
                <input type="radio" name="bank" checked={bank === name} onChange={() => setBank(name)} />
                {name}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="credit-step">
        <span className="step-number">3</span>
        <div className="trade-form">
          <h3>
            Программа Trade-in{' '}
            <Switch
              checked={trade}
              onChange={(event) => setTrade(event.target.checked)}
              slotProps={{ input: { 'aria-label': 'Программа Trade-in' } }}
            />
          </h3>
          {trade && (
            <div className="trade-fields">
              <Select
                label="Марка вашего автомобиля"
                value={tradeData.brand}
                onChange={(event) => tradeChange('brand', event)}
                options={[...new Set(cars.map((item) => item.brand))]}
              />
              <input
                placeholder="Модель вашего автомобиля"
                aria-label="Модель вашего автомобиля"
                value={tradeData.model}
                onChange={(event) => tradeChange('model', event)}
              />
              <Select
                label="Год выпуска"
                value={tradeData.year}
                onChange={(event) => tradeChange('year', event)}
                options={Array.from({ length: 27 }, (_, i) => 2026 - i)}
              />
              <input
                type="number"
                min="0"
                placeholder="Пробег, км"
                aria-label="Пробег вашего автомобиля"
                value={tradeData.mileage}
                onChange={(event) => tradeChange('mileage', event)}
              />
              <Select
                label="Коробка передач"
                value={tradeData.gear}
                onChange={(event) => tradeChange('gear', event)}
                options={['Автомат', 'Механика', 'Вариатор']}
              />
            </div>
          )}
        </div>
      </div>
      <div className="credit-step personal-step">
        <span className="step-number">4</span>
        <h3>Персональные данные</h3>
        <LeadForm kind={'Кредит: ' + program} car={car} details={details} button="Получить лучшие условия">
          <label className="gift-select">
            <span className="sr-only">Выберите подарок</span>
            <select value={gift} onChange={(event) => setGift(event.target.value)}>
              {['Комплект зимних шин', 'КАСКО', 'Дополнительное оборудование'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </LeadForm>
      </div>
      <p className="calculation-note">
        Расчёт предварительный. Окончательные условия определяются банком после рассмотрения заявки.
      </p>
    </Section>
  );
}
