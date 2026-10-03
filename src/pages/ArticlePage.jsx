import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbUpOutlined, ThumbDownOutlined, VisibilityOutlined } from '@mui/icons-material';
import { articles } from '../data/content';
import { asset } from '../assets';
import { useStoredState } from '../context/useStoredState';
import { PageTitle } from '../components/Ui';
import { CompetitorBanner } from '../components/Marketing';
import Comments from '../components/Comments';
import NotFoundPage from './NotFoundPage';
export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  const [reactions, setReactions] = useStoredState('abc-article-reactions', {});
  const [views, setViews] = useStoredState('abc-article-views', {});
  useEffect(() => {
    const key = 'abc-viewed-' + slug;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      setViews((previous) => ({ ...previous, [slug]: (previous[slug] || 0) + 1 }));
    }
  }, [slug, setViews]);
  if (!article) return <NotFoundPage />;
  const react = (value) =>
    setReactions((previous) => ({ ...previous, [slug]: previous[slug] === value ? null : value }));
  return (
    <>
      <PageTitle title={article.title} crumbs={[['Блог', '/blog']]} compact />
      <article className="container article-page">
        <h1>{article.title}</h1>
        <time>{article.date}</time>
        <img className="article-cover" src={asset[article.image]} alt={article.title} />
        <h2>{article.title}</h2>
        <p>
          Выбор автомобиля начинается с ваших повседневных задач. Подумайте, где вы будете ездить чаще: в городе, за
          городом или в дальних путешествиях. От этого зависят удобный тип кузова, объём багажника и требования к
          оснащению.
        </p>
        <p>
          Сравните несколько вариантов в одном бюджете. Важны не только первоначальная стоимость, но и расход топлива,
          техническое обслуживание, страхование и удобство посадки для всех пассажиров.
        </p>
        <h2>На что обратить внимание</h2>
        <p>
          Перед покупкой изучите комплектацию, проверьте работу оборудования и оцените обзорность с водительского места.
          Уточните, какие системы безопасности и комфорта входят в выбранную версию.
        </p>
        <img
          className="article-cover"
          src={asset[slug === 'skoda-karoq' ? 'karoq' : article.image]}
          alt={slug === 'skoda-karoq' ? 'Skoda Karoq' : article.title}
        />
        <h2>Сравните автомобили лично</h2>
        <p>
          Даже подробное описание не заменяет знакомство с автомобилем. Осмотрите салон, проверьте удобство сидений и
          багажного отделения. Запишите вопросы заранее и обсудите их с консультантом.
        </p>
        <p>
          В каталоге ABC AUTO вы можете сохранить понравившиеся модели в избранное и сравнить их характеристики. Это
          поможет вернуться к выбору после осмотра и принять взвешенное решение.
        </p>
        <div className="article-reactions">
          <button
            aria-label="Статья понравилась"
            aria-pressed={reactions[slug] === 'like'}
            onClick={() => react('like')}
          >
            <ThumbUpOutlined />
            {reactions[slug] === 'like' ? 1 : 0}
          </button>
          <button
            aria-label="Статья не понравилась"
            aria-pressed={reactions[slug] === 'dislike'}
            onClick={() => react('dislike')}
          >
            <ThumbDownOutlined />
            {reactions[slug] === 'dislike' ? 1 : 0}
          </button>
          <span>
            <VisibilityOutlined />
            {views[slug] || 0}
          </span>
        </div>
        <Comments key={slug} slug={slug} />
      </article>
      <CompetitorBanner />
    </>
  );
}
