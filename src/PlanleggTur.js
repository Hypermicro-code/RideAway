import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Kartvisning from './Kartvisning';
import { useNavigate } from 'react-router-dom';

function PlanleggTur() {
  const { id } = useParams();
  const [tur, setTur] = useState(null);
  const [start, setStart] = useState('');
  const [slutt, setSlutt] = useState('');
  const [dager, setDager] = useState('');
  const [visKart, setVisKart] = useState(false);
  const [redigerer, setRedigerer] = useState(false);
  const navigate = useNavigate();

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
      <h1>{redigerer ? 'Rediger reiserute' : 'Reiserute for'}: {tur.navn}</h1>

      {!tur.reiserute || redigerer ? (
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
          <button type="submit" style={{ marginTop: '10px' }}>
            Planlegg reiserute
          </button>
        </form>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setRedigerer(true)}>✏️ Rediger reiserute</button>
        </div>
      )}

      {visKart && <Kartvisning start={start} slutt={slutt} dager={parseInt(dager)} />}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate(`/tur/${id}`)}>⬅️ Tilbake til turdetaljer</button>
      </div>
    </div>
  );
}

export default PlanleggTur;
