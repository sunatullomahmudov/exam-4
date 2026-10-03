import { Phone, LocationOn } from '@mui/icons-material';
import AltRoute from '@mui/icons-material/AltRoute';
import { asset } from '../assets';
import { Carousel, PageTitle, Section } from '../components/Ui';
import { MapBlock } from '../components/Marketing';
export default function ContactsPage() {
  return (
    <>
      <PageTitle title="Контакты" />
      <Section className="contact-grid">
        <div>
          <h3>
            <Phone />
            Телефон
          </h3>
          <a href="tel:78005519431">+7 (800) 551-94-31</a>
          <a href="tel:74952921867">+7 (495) 292-18-67</a>
        </div>
        <div>
          <h3>
            <LocationOn />
            Адрес
          </h3>
          <p>Россия, Москва, 38КМ МКАД, 6Бс1</p>
          <p className="contact-gps">GPS: 55.597068, 37.511805</p>
        </div>
        <div>
          <h3>
            <AltRoute />
            Как проехать
          </h3>
          {[
            ['от МКАД (внутренняя сторона)', '55.600,37.513'],
            ['от МКАД (внешняя сторона)', '55.594,37.509'],
            ['из области, из центра', '55.7558,37.6173'],
          ].map(([title, start]) => (
            <a
              key={title}
              href={'https://yandex.ru/maps/?rtext=' + start + '~55.597068,37.511805&rtt=auto'}
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          ))}
        </div>
      </Section>
      <MapBlock contact={false} />
      <Section>
        <div className="contact-about">
          <div>
            <h2>О компании</h2>
            <p>
              Мы располагаем огромной торговой площадкой более 5000 квадратных метров, у нас в наличии не менее 200
              автомобилей как отечественного, так и иностранного производства. В штате автосалона «Альтера» работают
              настоящие профессионалы, которые знают особенности каждого конкретного автомобиля.
            </p>
          </div>
          <Carousel
            columns={1}
            items={['showroom', 'usedPhoto', 'camryPhoto']}
            render={(key) => <img className="showroom-image" src={asset[key]} alt="Автосалон ABC AUTO" />}
          />
        </div>
      </Section>
    </>
  );
}
