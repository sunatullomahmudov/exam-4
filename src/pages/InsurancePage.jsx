import { asset } from '../assets';
import { useStore } from '../context/useStore';
import { ProgramHero } from '../components/Hero';
import { Banks } from '../components/Marketing';
import { Button, Section } from '../components/Ui';
export default function InsurancePage() {
  const { openModal } = useStore();
  return (
    <>
      <ProgramHero
        program={{
          slug: 'insurance',
          title: 'Страховые полисы без комиссий и надбавок',
          image: 'insuranceBanner',
          rate: 'КАСКО / ОСАГО',
          subtitle: 'Подберите страховую защиту для вашего автомобиля',
        }}
      />
      <Section>
        <div className="insurance-options">
          {[
            ['КАСКО', 'contract'],
            ['ОСАГО', 'papers'],
          ].map(([title, image]) => (
            <article key={title}>
              <div>
                <h2>{title}</h2>
                <p>Подбор программы страхования</p>
                <Button onClick={() => openModal('insurance', null, { details: { insurance: title } })}>
                  Рассчитать стоимость
                </Button>
              </div>
              <img src={asset[image]} alt={title} />
            </article>
          ))}
        </div>
      </Section>
      <Section title="ОСАГО">
        <div className="insurance-description">
          <div>
            <p>
              ОСАГО — обязательное страхование гражданской ответственности владельца транспортного средства. Полис
              помогает возместить ущерб пострадавшей стороне в пределах страхового покрытия.
            </p>
            <h3>Для оформления понадобятся</h3>
            <ul>
              <li>Паспорт собственника автомобиля</li>
              <li>Документы на автомобиль</li>
              <li>Водительские удостоверения допущенных водителей</li>
            </ul>
            <Button onClick={() => openModal('insurance', null, { details: { insurance: 'ОСАГО' } })}>
              Оформить ОСАГО
            </Button>
          </div>
          <img src={asset.papers} alt="Документы для страхования" />
        </div>
      </Section>
      <Section title="Программы КАСКО">
        <div className="insurance-plans">
          {[
            ['Мини', 'Защита от крупных рисков'],
            ['Стандарт', 'Оптимальное страховое покрытие'],
            ['Премиум', 'Расширенная защита автомобиля'],
          ].map(([title, subtitle], index) => (
            <article key={title}>
              <h3>КАСКО {title}</h3>
              <p>{subtitle}</p>
              <ul>
                <li>Защита от угона</li>
                <li>Повреждение автомобиля</li>
                {index > 0 && <li>Помощь на дороге</li>}
                {index > 1 && <li>Расширенный сервис</li>}
              </ul>
              <Button onClick={() => openModal('insurance', null, { details: { insurance: 'КАСКО ' + title } })}>
                Рассчитать стоимость
              </Button>
            </article>
          ))}
        </div>
      </Section>
      <Banks />
    </>
  );
}
