import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/content';
import { asset } from '../assets';
import { Button, PageTitle, Section } from '../components/Ui';
export default function BlogPage() {
  const [limit, setLimit] = useState(8);
  return (
    <>
      <PageTitle title="Блог" />
      <Section>
        <div className="blog-grid">
          {articles.slice(0, limit).map((article) => (
            <Link to={'/blog/' + article.slug} className="blog-card" key={article.slug}>
              <img src={asset[article.image]} alt={article.title} loading="lazy" />
              <small>{article.date}</small>
              <h2>{article.title}</h2>
              <p>
                Рассказываем об автомобилях, выборе комплектации и подготовке к поездкам. Полезная информация для
                будущих владельцев.
              </p>
            </Link>
          ))}
        </div>
        {limit < articles.length && (
          <div className="show-more">
            <Button onClick={() => setLimit(limit + 4)}>Показать ещё</Button>
            <button className="underline" onClick={() => setLimit(articles.length)}>
              Показать все
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
