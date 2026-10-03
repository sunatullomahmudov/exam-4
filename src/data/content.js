import rawCars from './cars.json';
export const brands = [
  'Kia',
  'Hyundai',
  'Skoda',
  'Volkswagen',
  'Toyota',
  'Brilliance',
  'Changan',
  'Chery',
  'Exeed',
  'Chevrolet',
  'Citroen',
  'Datsun',
  'Dongfeng',
  'Haval',
  'FAW',
  'Ford',
  'Foton',
  'GAC',
  'Geely',
  'Great Wall',
  'Haima',
  'Honda',
  'JAC',
  'Lada',
  'Lifan',
  'Mazda',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot',
  'Ravon',
  'Renault',
  'SsangYong',
  'Suzuki',
  'UAZ',
  'Zotye',
];
export const programs = [
  {
    slug: 'express',
    title: 'Экспресс-кредит',
    image: 'expressBanner',
    rate: 'от 1,9%',
    subtitle: 'Воплотите мечту о новом автомобиле уже сегодня с выгодным предложением.',
  },
  {
    slug: 'family',
    title: 'Семейный автомобиль',
    image: 'familyBanner',
    rate: '−10%',
    subtitle: 'Новый автомобиль для всей семьи. Государственная программа поддержки.',
  },
  {
    slug: 'first',
    title: 'Первый автомобиль',
    image: 'firstBanner',
    rate: '−10%',
    subtitle: 'Ваш первый автомобиль на особых условиях.',
  },
  {
    slug: 'trade-in',
    title: 'Trade-in',
    image: 'tradeBanner',
    rate: 'до 120 000 ₽',
    subtitle: 'Обменяйте свой автомобиль на новый с дополнительной выгодой.',
  },
  {
    slug: 'medical',
    title: 'Работникам медицины',
    image: 'medicBanner',
    rate: '−10%',
    subtitle: 'Специальные условия покупки автомобиля для медицинских работников.',
  },
  {
    slug: 'installment',
    title: 'Рассрочка',
    image: 'installmentBanner',
    rate: '0%',
    subtitle: 'Ваш новый автомобиль без переплаты.',
  },
  {
    slug: 'recycling',
    title: 'Утилизация',
    image: 'recyclingBanner',
    rate: 'до 150 000 ₽',
    subtitle: 'Сдайте старый автомобиль и получите скидку на новый.',
  },
];
const used = rawCars.slice(0, 8).map((car, index) => ({
  ...car,
  id: car.id + '-used',
  category: 'used',
  year: 2017 + (index % 3),
  price: Math.round((car.price * 0.68) / 1000) * 1000,
  mileage: 35000 + index * 7200,
  image: car.id === 'toyota-camry' ? 'camryBlack' : car.image,
}));
const taxi = [
  { ...rawCars[7], id: 'skoda-rapid-taxi', model: 'Rapid', image: 'taxiRapid', brand: 'Skoda', taxiClass: 'Эконом' },
  {
    ...rawCars[1],
    id: 'volkswagen-polo-taxi',
    model: 'Polo',
    image: 'taxiPolo',
    brand: 'Volkswagen',
    taxiClass: 'Комфорт',
  },
  { ...rawCars[2], id: 'toyota-camry-taxi', image: 'camry', taxiClass: 'Комфорт+' },
].map((car) => ({ ...car, category: 'taxi' }));
export const cars = [...rawCars, ...used, ...taxi];
export const collections = [
  ['family', 'Семейные автомобили', 'family'],
  ['travel', 'Автомобили для путешествий', 'travel'],
  ['city', 'Городские автомобили', 'cityCar'],
  ['pickup', 'Пикапы', 'suv'],
  ['minivan', 'Минивэны', 'family'],
  ['crossover', 'Кроссоверы', 'road'],
  ['van', 'Коммерческий транспорт', 'showroom'],
  ['hatchback', 'Хэтчбеки', 'corollaRoad'],
  ['suv', 'Внедорожники', 'suv'],
];
export const articles = [
  ['skoda-karoq', 'Тест-драйв Skoda Karoq — городской кроссовер на каждый день', 'family'],
  ['family-car', 'Как выбрать автомобиль для семьи', 'family'],
  ['travel-checklist', 'Готовимся к путешествию на автомобиле', 'travel'],
  ['trade-in-guide', 'Как проходит обмен автомобиля по программе Trade-in', 'road'],
  ['first-car', 'На что обратить внимание при покупке первого автомобиля', 'firstBanner'],
  ['winter', 'Подготовка автомобиля к зимнему сезону', 'cityCar'],
  ['sedan-or-crossover', 'Седан или кроссовер: выбираем свой автомобиль', 'camryPhoto'],
  ['documents', 'Документы для покупки автомобиля', 'showroom'],
  ['maintenance', 'Когда проходить техническое обслуживание', 'usedPhoto'],
  ['comfort', 'Что входит в комфортную комплектацию', 'interior'],
  ['hybrid', 'Гибридный автомобиль для города', 'corollaRoad'],
  ['insurance', 'Как выбрать страховую программу', 'insuranceBanner'],
].map(([slug, title, image], index) => ({ slug, title, image, date: 12 + index + '.09.2021' }));
export const money = (value) => new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
export const carTitle = (car) => car.brand + ' ' + car.model;
export const carUrl = (car) =>
  (car.category === 'used' ? '/used/' : car.category === 'taxi' ? '/taxi/' : '/model/') + car.id;
export function monthlyPayment(price, months = 84, deposit = 0, rate = 1.9) {
  const principal = Math.max(0, price - deposit);
  const interest = rate / 1200;
  return interest ? (principal * interest) / (1 - Math.pow(1 + interest, -months)) : principal / months;
}
