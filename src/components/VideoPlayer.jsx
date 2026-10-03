import { useState } from 'react';
import { PlayArrow } from '@mui/icons-material';

function youtubeId(source) {
  if (typeof source !== 'string') return '';
  if (/^[\w-]{11}$/.test(source)) return source;
  try {
    const url = new URL(source);
    const host = url.hostname.replace(/^www\./, '');
    const id =
      host === 'youtu.be'
        ? url.pathname.slice(1)
        : ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)
          ? url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([\w-]{11})/)?.[1]
          : '';
    return /^[\w-]{11}$/.test(id || '') ? id : '';
  } catch {
    return '';
  }
}

export default function VideoPlayer({ source, title = 'Видео об автосалоне' }) {
  const id = youtubeId(source);
  const [loaded, setLoaded] = useState(false);
  const params = new URLSearchParams({ autoplay: '1', playsinline: '1', rel: '0', origin: window.location.origin });
  return (
    <div className="video-dialog">
      <h2 id="video-dialog-title">{title}</h2>
      {id ? (
        <div className="embedded-video">
          {!loaded && (
            <p className="video-loading" role="status">
              Загрузка видео…
            </p>
          )}
          <iframe
            title={title}
            src={'https://www.youtube-nocookie.com/embed/' + id + '?' + params}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        </div>
      ) : (
        <div className="video-unavailable" role="status">
          <PlayArrow fontSize="large" />
          <p>Видео пока недоступно</p>
          <small>Этот ролик ещё не добавлен.</small>
        </div>
      )}
    </div>
  );
}
