# Соответствие макетам

| Макет | Маршрут |
|---|---|
| 1 Главная | / |
| 1_1 Каталог | /catalog |
| 2 Марка | /brands/toyota (и другие марки) |
| 3 Модель | /model/toyota-camry |
| 3_1 Комплектация | /model/toyota-camry/trim/0 |
| 4 Страхование | /insurance |
| 5 Избранное новые / б/у / такси | /favorites?type=new / used / taxi |
| 6 Авто с пробегом | /used |
| 7 Страница авто с пробегом | /used/toyota-camry-used |
| 8 Кредит и рассрочка | /credit |
| 9 Экспресс-кредит | /credit/express |
| 10 Семейный автомобиль | /credit/family |
| 11 Первый автомобиль | /credit/first |
| 12 Trade-in | /credit/trade-in |
| 13 Работникам медицины | /credit/medical |
| 14 Рассрочка | /credit/installment |
| 15 Утилизация | /credit/recycling |
| 16 Такси в кредит | /taxi |
| 16_1 Автомобиль для такси | /taxi/volkswagen-polo-taxi |
| 17 О компании | /about |
| 18 Техцентр | /service |
| 19 Отзывы | /reviews |
| 20 Открытый отзыв | /reviews → Подробнее |
| 21 Контакты | /contacts |
| 22 Подбор новые / б/у | /selection?type=new / used |
| 23 Наши подборки | /collections |
| 24 Подборка | /collections/family |
| 25 404 | /404 и неизвестные адреса |
| 26 Сравнение новые / такси | /compare?type=new / taxi |
| 27 Блог | /blog |
| 28 Статья | /blog/skoda-karoq |
| 29 Модель + кредит | /model/toyota-camry/credit |
| Спецпредложения | /offers |
| Поиск | /search?q=Toyota |

Меню каталога, кредита и спецпредложений открываются стрелками в шапке.
Гамбургер открывает полную навигацию и поиск.
Модальные окна callback / offer / reserve / discount / credit / installment / express / trade / directions / success реализованы общим компонентом Dialogs.

Состояния пустого избранного и сравнения намеренно не содержат фиктивных машин.

