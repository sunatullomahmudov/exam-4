import { useId, useState } from 'react';
import { Button, Consent } from './Ui';
import { useStore } from '../context/useStore';
export default function LeadForm({
  kind = 'Консультация',
  car,
  compact = false,
  phoneOnly = false,
  button = 'Получить предложение',
  details = {},
  children,
}) {
  const id = useId();
  const { openModal } = useStore();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.phone.replace(/\D/g, '').length < 10) {
      setError('Введите корректный номер телефона.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kind, carId: car?.id, details }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Не удалось сохранить заявку.');
      form.reset();
      setStatus('');
      openModal('success', car, { requestId: result.id });
    } catch {
      setStatus('');
      setError('Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.');
    }
  }
  return (
    <form className={'lead-form ' + (compact ? 'lead-inline' : '')} onSubmit={submit}>
      {children}
      {!phoneOnly && (
        <label htmlFor={id + 'name'}>
          <span className="sr-only">Ваше имя</span>
          <input
            id={id + 'name'}
            name="name"
            placeholder="Ваше имя"
            minLength={2}
            maxLength={80}
            required
            autoComplete="name"
          />
        </label>
      )}
      <label htmlFor={id + 'phone'}>
        <span className="sr-only">Ваш телефон</span>
        <input
          id={id + 'phone'}
          name="phone"
          placeholder="Ваш телефон"
          type="tel"
          autoComplete="tel"
          required
          pattern="[+0-9 ()-]{10,22}"
          maxLength={22}
        />
      </label>
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправка…' : button}
      </Button>
      <Consent />
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
