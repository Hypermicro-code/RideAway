import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Kartvisning from './Kartvisning';

function PlanleggTur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tur, setTur] = useState(null);
  const [visKart, setVisKart] = useState(false);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    if (funnetTur) {
      setTur(funnetTur);
      setVisKart(true);
    }
  }, [id]);

  if (!tur) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Turen ble ikke funnet.</p>;
  }

  // 🚨 Sørg for at vi alltid har minst 2 stopp
  const stopp =
    tur.reiserute?.stopp?.length >= 2
      ? tur.reiserute.stopp
      : [tur.startsted, tur.sluttsted].filter(Boolean);

  const dager = parseInt(tur.reiserute?.dager || tur.dager || 1);

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>{tur.navn}</h1>
      <p>{tur.startdato} – {tur.sluttdato}</p>
      <p><em>{tur.beskrivelse}</em></p>

      <h2>Reiserute</h2>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setVisKart(true)}>🛠️ {tur.reiserute ? 'Rediger' : 'Planlegg'} reiserute</button>
      </div>

      {visKart && (
        <Kartvisning
          stopp={stopp}
          dager={dager}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')}>⬅️ Tilbake til forsiden</button>
      </div>
    </div>
  );
}

export default PlanleggTur;
