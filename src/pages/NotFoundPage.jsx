import { Link } from 'react-router-dom';
import { asset } from '../assets';
import { Button } from '../components/Ui';
export default function NotFoundPage() {
  return (
    <main className="not-found">
      <img className="not-found-city" src={asset.city} alt="" />
      <nav>
        <Link to="/catalog">Каталог авто</Link>
        <Link to="/credit">Кредит</Link>
        <Link to="/about">О компании</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
      <div className="error-number">
        4
        <span>
          0<img src={asset.kia} alt="Kia Rio" />
        </span>
        4
      </div>
      <h1>Страница не найдена!</h1>
      <p>
        Возможно, страница была удалена или вы ошиблись в адресе.
        <br />
        Продолжите выбор автомобиля на главной странице.
      </p>
      <Button to="/">На главную</Button>
    </main>
  );
}
