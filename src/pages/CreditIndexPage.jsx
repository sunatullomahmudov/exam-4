import { Link } from 'react-router-dom';
import { asset } from '../assets';
import { programs } from '../data/content';
import { PageTitle, Section } from '../components/Ui';
import { CompetitorBanner, Reviews, Trust } from '../components/Marketing';
export default function CreditIndexPage({ offers = false }) {
  const list = offers
    ? programs.filter((program) => ['trade-in', 'recycling'].includes(program.slug))
    : programs.filter((program) => program.slug !== 'recycling');
  return (
    <>
      <PageTitle title={offers ? 'Спецпредложения' : 'Кредит и рассрочка'} />
      <Section>
        <div className="program-grid">
          {list.map((program) => (
            <Link key={program.slug} to={'/credit/' + program.slug} className="program-tile">
              <img src={asset[program.image]} alt="" />
              <div>
                <h3>{program.title}</h3>
                <p>{program.subtitle}</p>
                <span>Подробнее</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <CompetitorBanner />
      <Trust />
      <Reviews />
    </>
  );
}
