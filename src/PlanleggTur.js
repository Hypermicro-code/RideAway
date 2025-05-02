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
  const [stoppListe, setStoppListe] = useState([]);
  const [visKart, setVisKart] = useState(false);
  const [redigerer, setRedigerer] = useState(false);
  const [turRetur, setTurRetur] = useState(false);

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    const funnetTur = lagredeTurer.find((t) => t.id === id);
    setTur(funnetTur);

    if (funnetTur?.reiserute) {
      setStart(funnetTur.reiserute.start || '');
      setSlutt(funnetTur.reiserute.slutt || '');
      setDager(funnetTur.reiserute.dager || '');
      setTurRetur(funnetTur.reiserute.turRetur || false);
      setStoppListe(funnetTur.reiserute.stopp || []);
      setVisKart(true);
    }
  }, [id]);

  useEffect(() => {
    // Oppdater stoppListe automatisk når start/slutt eller turRetur endres
    const stopp = [];
    if (start) stopp.push(start);
    if (turRetur && slutt) {
      stopp.push(slutt, start);
    } else if (slutt) {
      stopp.push(slutt);
    }
    setStoppListe(stopp);
  }, [start, slutt, turRetur]);

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

      <h2>{redigerer ? 'Rediger reiserute' : 'Reiserute'}</h2>

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
          <label style={{ display: 'block', marginTop: '10px' }}>
            <input
              type="checkbox"
              checked={turRetur}
              onChange={(e) => setTurRetur(e.target.checked)}
            />{' '}
            Planlegg som tur/retur
          </label>
          <button type="submit" style={{ marginTop: '10px' }}>Planlegg reiserute</button>
        </form>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setRedigerer(true)}>✏️ Rediger reiserute</button>
        </div>
      )}

      {visKart && (
        <Kartvisning
          stopp={stoppListe}
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
