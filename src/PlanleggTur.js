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
    setTur(funnetTur);
    if (funnetTur?.reiserute) {
      setVisKart(true);
    }
  }, [id]);

  const håndterPlanlegg = () => {
    setVisKart(true);
  };

  if (!tur) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Turen ble ikke funnet.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>{tur.navn}</h1>
      <p>{tur.startdato} – {tur.sluttdato}</p>
      <p><em>{tur.beskrivelse}</em></p>

      <h2>Reiserute</h2>

      {!tur.reiserute ? (
        <div style={{ marginTop: '20px' }}>
          <button onClick={håndterPlanlegg}>🛠️ Planlegg reiserute</button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setVisKart(true)}>✏️ Rediger reiserute</button>
        </div>
      )}

      {visKart && (
        <Kartvisning
          stopp={tur.reiserute?.stopp || [tur.startsted, tur.sluttsted]}
          dager={parseInt(tur.reiserute?.dager || tur.dager || 1)}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')}>⬅️ Tilbake til forsiden</button>
      </div>
    </div>
  );
}

export default PlanleggTur;
