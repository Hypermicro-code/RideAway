import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TurDetaljer() {
  const { id } = useParams();
  const [tur, setTur] = useState(null);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    setTur(lagredeTurer[id]);
  }, [id]);

  if (!tur) {
    return <p>Laster turdetaljer...</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>{tur.navn}</h1>
      <p>{tur.startdato} – {tur.sluttdato}</p>
      <p><em>{tur.beskrivelse}</em></p>

      <Link to="/">
        <button style={{ marginTop: '20px' }}>⬅️ Tilbake til forsiden</button>
      </Link>
    </div>
  );
}

export default TurDetaljer;
