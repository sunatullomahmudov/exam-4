import { Dialog, DialogContent, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useStore } from '../context/useStore';
import { asset } from '../assets';
import { money, carTitle } from '../data/content';
import LeadForm from './LeadForm';
import ReserveSelectors from './ReserveSelectors';
import { Button } from './Ui';
import VideoPlayer from './VideoPlayer';
const titles = {
  callback: 'Обратный звонок',
  offer: 'Получить предложение',
  reserve: 'Резерв онлайн',
  discount: 'Зафиксировать скидку',
  credit: 'Выгодный автокредит',
  installment: 'Рассрочка от 0%',
  express: 'Экспресс-кредит от 1,9%',
  trade: 'Trade-in с выгодой',
  directions: 'Как до нас добраться',
  insurance: 'Оформить страхование',
  service: 'Запись в техцентр',
};
const pictures = {
  callback: 'callback',
  credit: 'familyPeople',
  installment: 'installmentWoman',
  express: 'expressWoman',
  trade: 'couple',
  insurance: 'consultant2',
  service: 'consultant',
};
export default function Dialogs() {
  const { modal, closeModal, notice, setNotice } = useStore();
  const type = modal?.type;
  return (
    <>
      <Dialog
        open={!!modal}
        onClose={closeModal}
        maxWidth={type === 'success' ? 'xs' : 'md'}
        fullWidth
        classes={{ paper: 'site-dialog dialog-' + type }}
        aria-labelledby={type === 'video' ? 'video-dialog-title' : undefined}
      >
        <IconButton aria-label="Закрыть окно" className="dialog-close" onClick={closeModal}>
          <Close />
        </IconButton>
        <DialogContent>
          {type === 'success' ? (
            <div className="success-dialog">
              <img src={asset.kia} alt="Kia Rio" />
              <h2>Спасибо за обращение!</h2>
              <p>Ваша заявка №{modal.requestId} сохранена. Вы можете продолжить выбор автомобиля.</p>
              <Button onClick={closeModal}>ОК</Button>
            </div>
          ) : type === 'video' ? (
            <VideoPlayer key={modal.videoId || 'missing'} source={modal.videoId} title={modal.title} />
          ) : (
            <div className={'dialog-grid ' + (type === 'directions' ? 'directions-dialog' : '')}>
              {type === 'directions' ? (
                <div>
                  <h2>Как до нас добраться</h2>
                  <h3>На автомобиле</h3>
                  <p>Москва, 38-й километр МКАД, 6Бс1. Въезд со стороны внешнего кольца.</p>
                  <h3>На общественном транспорте</h3>
                  <p>Постройте маршрут от вашего местоположения до автосалона.</p>
                  <a
                    className="text-red underline"
                    href="https://yandex.ru/maps/?rtext=~55.597068,37.511805&rtt=auto"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть маршрут на карте
                  </a>
                </div>
              ) : null}
              <div>
                <h2>{titles[type] || 'Получить предложение'}</h2>
                {modal?.car ? (
                  <>
                    <h3>{carTitle(modal.car)}</h3>
                    <p>{modal.car.trim}</p>
                    <p className="dialog-price">от {money(modal.car.price)}</p>
                  </>
                ) : type !== 'callback' ? (
                  <p>Оставьте контакты для консультации специалиста.</p>
                ) : null}
                <LeadForm
                  kind={titles[type]}
                  car={modal?.car}
                  details={modal?.details || {}}
                  button={
                    type === 'reserve'
                      ? 'Забронировать автомобиль'
                      : type === 'callback'
                        ? 'Перезвоните мне'
                        : 'Получить предложение'
                  }
                >
                  {type === 'reserve' && modal.car && <ReserveSelectors car={modal.car} />}
                  {type === 'reserve' && (
                    <label>
                      <span className="sr-only">Подарок</span>
                      <select name="gift">
                        <option>Выберите подарок</option>
                        <option>Комплект зимних шин</option>
                        <option>КАСКО</option>
                        <option>Дополнительное оборудование</option>
                      </select>
                    </label>
                  )}
                  {type === 'directions' && (
                    <textarea name="message" placeholder="Ваш вопрос" aria-label="Ваш вопрос" />
                  )}
                </LeadForm>
              </div>
              {type !== 'directions' && (
                <img
                  className="dialog-person"
                  src={asset[modal?.car?.image || pictures[type] || 'camry']}
                  alt={modal?.car ? carTitle(modal.car) : ''}
                />
              )}
              {type === 'callback' && <img className="dialog-city" src={asset.city} alt="" />}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Snackbar open={!!notice} autoHideDuration={3000} message={notice} onClose={() => setNotice('')} />
    </>
  );
}
