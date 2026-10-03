import { useParams } from 'react-router-dom';
import { asset } from '../assets';
import { brands, cars } from '../data/content';
import { ModelHero, ProgramHero } from '../components/Hero';
import { Button, EmptyState, PageTitle, Section } from '../components/Ui';
import CarCard from '../components/CarCard';
import { BlogPreview, CompetitorBanner, Reviews, Seo, SpecialOffers, Trust } from '../components/Marketing';
export default function BrandPage() {
  const { brand: slug } = useParams();
  const brand = brands.find((item) => item.toLowerCase() === slug);
  const list = cars.filter((car) => car.category === 'new' && car.brand === brand);
  if (!brand)
    return (
      <>
        <PageTitle title="Марка не найдена" />
        <Section>
          <EmptyState />
        </Section>
      </>
    );
  if (!list.length)
    return (
      <>
        <PageTitle title={'Автомобили ' + brand} />
        <Section>
          <EmptyState
            title={'Автомобилей ' + brand + ' пока нет в наличии'}
            text="Выберите другую марку или оставьте заявку на подбор автомобиля."
          />
        </Section>
        <SpecialOffers />
      </>
    );
  return (
    <>
      <ModelHero car={list.find((car) => car.model === 'Camry') || list[0]} brand />
      <Section title={'Модельный ряд ' + brand}>
        <div className="model-list">
          {list.map((car, index) => (
            <div key={car.id}>
              <CarCard car={car} horizontal />
              {index === 2 && <CompetitorBanner />}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Архивные модели">
        <div className="archive-models">
          {list.map((car) => (
            <div key={car.id}>
              <img src={asset[car.image]} alt={car.model} />
              <h3>
                {brand} {car.model}
              </h3>
              <Button to={'/model/' + car.id}>Подробнее</Button>
            </div>
          ))}
        </div>
      </Section>
      <SpecialOffers />
      <ProgramHero
        secondary
        program={{
          slug: 'family',
          title: 'Семейный автомобиль',
          image: 'familyBanner',
          rate: '−10%',
          subtitle: 'Выберите автомобиль для всей семьи',
        }}
      />
      <Section title={'Преимущества автомобилей ' + brand}>
        <div className="brand-benefits">
          {[
            ['Надёжность', 'toyota'],
            ['Безопасность', 'brake'],
            ['Комфорт', 'interior'],
            ['Современный дизайн', 'camryPhoto'],
            ['Экономичность', 'road'],
            ['Выбор комплектаций', list[0].image],
          ].map(([title, image]) => (
            <article key={title}>
              <img src={asset[image]} alt="" />
              <h3>{title}</h3>
              <p>Продуманные решения для повседневных поездок и дальних путешествий.</p>
            </article>
          ))}
        </div>
      </Section>
      <Trust />
      <Reviews />
      <BlogPreview />
      <Seo title={'Автомобили ' + brand + ' в Москве'} full />
    </>
  );
}
