import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Kartvisning from './Kartvisning';

function PlanleggTur() {
  const { id } = useParams();
  const [tur, setTur] = useState(null);
  const [start, setStart] = useState('');
  const [slutt, setSlutt] = useState('');
  const [dager, setDager] = useState('');
  const [visKart, setVisKart] = useState(false);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    setTur(funnetTur);
  }, [id]);

  const håndterPlanlegg = (e) => {
    e.preventDefault();
    setVisKart(true);
  };

  if (!tur) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Turen ble ikke funnet.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Planlegg reiserute for: {tur.navn}</h1>
      <form onSubmit={håndterPlanlegg}>
        <input
          type="text"
          placeholder="Startsted"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Endepunkt"
          value={slutt}
          onChange={(e) => setSlutt(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Antall dager"
          value={dager}
          onChange={(e) => setDager(e.target.value)}
        /><br />
        <button type="submit" style={{ marginTop: '10px' }}>Planlegg reiserute</button>
      </form>

      {visKart && <Kartvisning start={start} slutt={slutt} />}
    </div>
  );
}

export default PlanleggTur;
