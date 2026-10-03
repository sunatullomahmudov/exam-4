import { useState } from 'react';
import { Button, PageTitle, Section } from '../components/Ui';
import { ReviewCard } from '../components/Marketing';
export default function ReviewsPage() {
  const [limit, setLimit] = useState(6);
  return (
    <>
      <PageTitle title="Отзывы" />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: limit }, (_, index) => (
            <ReviewCard key={index} index={index} />
          ))}
        </div>
        {limit < 9 && (
          <div className="show-more">
            <Button onClick={() => setLimit(9)}>Показать ещё</Button>
          </div>
        )}
      </Section>
    </>
  );
}
