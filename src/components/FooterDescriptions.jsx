import { Link } from 'react-router-dom';
import { brands } from '../data/content';

export default function FooterDescriptions() {
  return (
    <div className="container footer-descriptions">
      {brands.slice(0, 16).map((brand) => (
        <article key={brand}>
          <h4>
            <Link to={'/brands/' + brand.toLowerCase()}>{brand}</Link>
          </h4>
          <p>
            Автомобили {brand} в автосалоне ABC AUTO. Подберите модель и комплектацию, сравните характеристики и
            ознакомьтесь с доступными предложениями. Узнайте условия покупки в кредит и обмена автомобиля по программе
            Trade-in.
          </p>
          <p>
            Вы можете оставить заявку на подбор, сохранить понравившиеся автомобили в избранное или связаться с
            консультантом для уточнения наличия.
          </p>
        </article>
      ))}
    </div>
  );
}
