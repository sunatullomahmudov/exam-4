import { useState } from 'react';
import { useStoredState } from '../context/useStoredState';
import { Button } from './Ui';
export default function Comments({ slug }) {
  const [comments, setComments] = useStoredState('abc-comments-' + slug, []);
  const [reply, setReply] = useState(null);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = String(data.get('text')).trim();
    const name = String(data.get('name')).trim();
    if (!text || !name) return;
    setComments((previous) => [
      ...previous,
      { id: Date.now(), name, text, reply, date: new Date().toLocaleDateString('ru-RU') },
    ]);
    setReply(null);
    event.currentTarget.reset();
  }
  return (
    <section className="comments">
      <h2>Комментарии ({comments.length})</h2>
      <form onSubmit={submit}>
        {reply && (
          <p>
            Ответ на комментарий{' '}
            <button type="button" onClick={() => setReply(null)}>
              Отменить
            </button>
          </p>
        )}
        <input
          name="name"
          required
          minLength={2}
          maxLength={60}
          placeholder="Ваше имя"
          aria-label="Ваше имя для комментария"
        />
        <textarea
          name="text"
          required
          minLength={3}
          maxLength={2000}
          placeholder="Оставьте комментарий"
          aria-label="Комментарий"
        />
        <Button type="submit">Отправить</Button>
      </form>
      <div>
        {comments.map((comment) => (
          <article className={comment.reply ? 'comment reply' : 'comment'} key={comment.id}>
            <div className="comment-avatar">{comment.name[0]}</div>
            <div>
              <h4>
                {comment.name} <small>{comment.date}</small>
              </h4>
              <p>{comment.text}</p>
              <button
                onClick={() => {
                  setReply(comment.id);
                  document.querySelector('.comments textarea')?.focus();
                }}
              >
                Ответить
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
