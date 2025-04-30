import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Kartvisning from './Kartvisning';

function PlanleggTur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tur, setTur] = useState(null);
  const [start, setStart] = useState('');
  const [slutt, setSlutt] = useState('');
  const [dager, setDager] = useState('');
  const [visKart, setVisKart] = useState(false);
  const [redigerer, setRedigerer] = useState(false);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    setTur(funnetTur);

    if (funnetTur?.reiserute && !redigerer) {
      setStart(funnetTur.reiserute.start);
      setSlutt(funnetTur.reiserute.slutt);
      setDager(funnetTur.reiserute.dager);
      setVisKart(true);
    }
  }, [id, redigerer]);

  const håndterPlanlegg = (e) => {
    e.preventDefault();
    setVisKart(true);
  };

  if (!tur) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Turen ble ikke funnet.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      {/* 🏷️ i18n: Turinfo */}
      <h1>{tur.navn}</h1>
      <p>{tur.startdato} – {tur.sluttdato}</p>
      <p><em>{tur.beskrivelse}</em></p>

      <h2>{redigerer ? 'Rediger reiserute' : 'Reiserute'}</h2> {/* 🏷️ i18n */}

      {!tur.reiserute || redigerer ? (
        <form onSubmit={håndterPlanlegg}>
          <input
            type="text"
            placeholder="Startsted" // 🏷️ i18n
            value={start}
            onChange={(e) => setStart(e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="Endepunkt" // 🏷️ i18n
            value={slutt}
            onChange={(e) => setSlutt(e.target.value)}
          /><br />
          <input
            type="number"
            placeholder="Antall dager" // 🏷️ i18n
            value={dager}
            onChange={(e) => setDager(e.target.value)}
          /><br />
          <button type="submit" style={{ marginTop: '10px' }}>Planlegg reiserute</button> {/* 🏷️ i18n */}
        </form>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setRedigerer(true)}>✏️ Rediger reiserute</button> {/* 🏷️ i18n */}
        </div>
      )}

      {visKart && <Kartvisning start={start} slutt={slutt} dager={parseInt(dager)} />}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')}>⬅️ Tilbake til forsiden</button> {/* 🏷️ i18n */}
      </div>
    </div>
  );
}

export default PlanleggTur;
