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
  const [turRetur, setTurRetur] = useState(false);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    setTur(funnetTur);

    if (funnetTur?.reiserute) {
      setStart(funnetTur.reiserute.start);
      setSlutt(funnetTur.reiserute.slutt);
      setDager(funnetTur.reiserute.dager);
      if (!redigerer) {
        setVisKart(true);
      }
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
      <h1>{tur.navn}</h1>
      <p>{tur.startdato} – {tur.sluttdato}</p>
      <p><em>{tur.beskrivelse}</em></p>

      {visKart && (
        <Kartvisning
          stopp={turRetur ? [start, slutt, start] : [start, slutt]}
          dager={parseInt(dager)}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')}>⬅️ Tilbake til forsiden</button>
      </div>
    </div>
  );
}

export default PlanleggTur;
