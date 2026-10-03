import { useParams } from 'react-router-dom';
import { programs } from '../data/content';
import { ProgramHero } from '../components/Hero';
import CreditCalculator from '../components/CreditCalculator';
import { ProgramAdvantages, CreditAdvantages, CreditConditionsBanner } from '../components/CreditBenefits';
import { Banks, CompetitorBanner, Reviews, Trust } from '../components/Marketing';
import NotFoundPage from './NotFoundPage';
export default function CreditProgramPage() {
  const { slug } = useParams();
  const program = programs.find((item) => item.slug === slug);
  if (!program) return <NotFoundPage />;
  return (
    <>
      <ProgramHero program={program} />
      {!['installment', 'recycling'].includes(slug) && <ProgramAdvantages />}
      <CreditCalculator key={slug} program={slug} />
      <CreditAdvantages />
      {['family', 'first', 'medical'].includes(slug) ? (
        <ProgramHero
          program={{
            slug: 'family',
            title: 'Скидка на ваш новый автомобиль',
            image: 'familyBanner',
            rate: '−10%',
            subtitle: 'Подберите автомобиль на специальных условиях',
          }}
        />
      ) : (
        <CreditConditionsBanner />
      )}
      <Banks />
      <CompetitorBanner />
      <Trust />
      <Reviews />
    </>
  );
}
