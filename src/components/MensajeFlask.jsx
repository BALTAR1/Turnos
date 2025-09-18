import { useEffect, useState } from 'react';
import { getMensaje } from '../utils/api.js';

export default function MensajeFlask() {
  const [mensaje, setMensaje] = useState('Cargando...');
  const [error, setError] = useState(null);

  useEffect(() => {
    getMensaje()
      .then(data => setMensaje(data.mensaje))
      .catch(err => setError('No se pudo conectar con Flask'));
  }, []);

  return (
    <div className="p-4 bg-blue-100 rounded text-blue-900">
      {error ? error : mensaje}
    </div>
  );
}
