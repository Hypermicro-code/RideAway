import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PlanleggTur() {
  const { id } = useParams();
  const [tur, setTur] = useState(null);
  const [start, setStart] = useState('');
  const [slutt, setSlutt] = useState('');
  const [dager, setDager] = useState('');

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    setTur(funnetTur);
  }, [id]);

  const håndterPlanlegg = (e) => {
    e.preventDefault();
    console.log('Start:', start);
    console.log('Slutt:', slutt);
    console.log('Antall dager:', dager);
    alert(`Planlegger reiserute for ${tur?.navn || 'turen'}!`);
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
          style={{ marginBottom: '10px' }}
        /><br />
        <input
          type="text"
          placeholder="Endepunkt"
          value={slutt}
          onChange={(e) => setSlutt(e.target.value)}
          style={{ marginBottom: '10px' }}
        /><br />
        <input
          type="number"
          placeholder="Antall dager"
          value={dager}
          onChange={(e) => setDager(e.target.value)}
          style={{ marginBottom: '10px' }}
        /><br />
        <button type="submit" style={{ marginTop: '10px' }}>Planlegg reiserute</button>
      </form>
    </div>
  );
}

export default PlanleggTur;
