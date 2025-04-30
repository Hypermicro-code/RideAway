import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TurDetaljer() {
  const { id } = useParams();
  const [tur, setTur] = useState(null);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    setTur(funnetTur);
  }, [id]);

  if (!tur) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Turen ble ikke funnet.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>{tur.navn}</h1>
      <p>{tur.startdato} – {tur.sluttdato}</p>
      <p><em>{tur.beskrivelse}</em></p>

      {tur.reiserute ? (
        <Link to={`/planlegg/${tur.id}`}>
          <button style={{ marginTop: '20px' }}>📄 Åpne reiserute</button>
        </Link>
      ) : (
        <Link to={`/planlegg/${tur.id}`}>
          <button style={{ marginTop: '20px' }}>➕ Opprett reiserute</button>
        </Link>
      )}

      <br />
      <Link to="/">
        <button style={{ marginTop: '20px' }}>⬅️ Tilbake til forsiden</button>
      </Link>
    </div>
  );
}

export default TurDetaljer;
