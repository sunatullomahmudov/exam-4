import { PaymentsOutlined, TimerOutlined, Percent, HandshakeOutlined, CheckCircle } from '@mui/icons-material';
import { asset } from '../assets';
import { Section } from './Ui';

export function ProgramAdvantages() {
  const list = [
    [PaymentsOutlined, 'от 0%', 'Первоначальный взнос'],
    [TimerOutlined, '30 минут', 'Ответ кредитного специалиста'],
    [Percent, 'от 1,9%', 'Ставка по кредиту'],
    [HandshakeOutlined, '98%', 'Одобрение кредита'],
  ];
  return (
    <Section title="Преимущества программы" className="program-advantages">
      <div>
        {list.map(([Icon, title, text]) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
export function CreditAdvantages() {
  return (
    <Section title="Преимущества автокредита">
      <div className="credit-advantages">
        {[
          ['keysWoman', '43 кредитные программы на выбор'],
          ['friends', 'Срок кредитования до 7 лет'],
          ['keyTable', 'Размер кредита до 3 000 000 ₽'],
          ['keys', 'Досрочное погашение без штрафов'],
          ['0%', 'Первоначальный взнос от 0%'],
          ['1,9%', 'Ставка по кредиту от 1,9%'],
          ['thumbs', 'Высокий процент одобрения'],
          ['operator', 'Ответ кредитного специалиста в течение 30 минут'],
        ].map(([image, text]) => (
          <article key={text}>
            {asset[image] ? <img src={asset[image]} alt="" /> : <strong>{image}</strong>}
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="credit-conditions">
        <div>
          <h3>Условия покупки</h3>
          <ul>
            {[
              'Взнос от 0 ₽',
              'Срок кредита до 7 лет',
              'Потребительский кредит',
              'Семейный автомобиль',
              'Автокредит для медицинских работников',
              'Скидка по программе Trade-in',
            ].map((text) => (
              <li key={text}>
                <CheckCircle />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Необходимые документы</h3>
          <ul>
            <li>
              <CheckCircle />
              Паспорт
            </li>
            <li>
              <CheckCircle />
              Водительское удостоверение
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
export function CreditConditionsBanner() {
  return (
    <div className="wide conditions-banner">
      <img className="hero-city" src={asset.city} alt="" />
      <div className="container">
        <div>
          <h2>
            Условия получения
            <br />
            кредита
          </h2>
          {['Без подтверждения дохода', 'Без первоначального взноса', 'Без сложностей с регистрацией'].map((title) => (
            <article key={title}>
              <CheckCircle />
              <div>
                <h3>{title}</h3>
                <p>Подберите удобную программу и обсудите условия со специалистом.</p>
              </div>
            </article>
          ))}
        </div>
        <div className="conditions-cars">
          <img src={asset.rapid} alt="Skoda Rapid" />
          <img src={asset.brilliance} alt="Brilliance V3" />
        </div>
      </div>
    </div>
  );
}
