import { useState } from 'react';
import { PlayArrow, KeyboardArrowDown } from '@mui/icons-material';
import { asset } from '../assets';
import { useStore } from '../context/useStore';
import { Section } from './Ui';
import BrandMark from './BrandMark';
import videos from '../data/videos.json';

export function ReviewCard({ index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const { openModal } = useStore();
  return (
    <article className="review-card">
      <button
        className="review-video"
        aria-label="Открыть видеоотзыв"
        onClick={() => openModal('video', null, { title: 'Отзыв об автосалоне', videoId: videos.reviews[index] })}
      >
        {expanded ? (
          <img className="expanded-review-photo" src={asset.review} alt="Видеоотзыв клиента" />
        ) : (
          <BrandMark />
        )}
        <span className="play-button">
          <PlayArrow />
        </span>
      </button>
      <div className="review-text">
        <h4>{['Сергей Васильев', 'Александр Петров', 'Анна Смирнова'][index % 3]}</h4>
        <p>
          «Я покупал автомобиль в автосалоне. Долго сомневался, какую модель выбрать, но консультант помог разобраться в
          комплектациях и условиях покупки.
          {expanded
            ? ' Рассмотрели несколько автомобилей, сравнили характеристики и подобрали удобный вариант. Благодарю команду за внимательное отношение и подробную консультацию.'
            : '…'}
          »
        </p>
        <button onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? 'Свернуть' : 'Подробнее'}
          <KeyboardArrowDown />
        </button>
      </div>
    </article>
  );
}
export function Reviews({ count = 3 }) {
  return (
    <Section title="Отзывы">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: count }, (_, index) => (
          <ReviewCard key={index} index={index} />
        ))}
      </div>
    </Section>
  );
}
