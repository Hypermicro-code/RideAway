import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [turer, setTurer] = useState([]);
  const [navn, setNavn] = useState('');
  const [startdato, setStartdato] = useState('');
  const [sluttdato, setSluttdato] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');
  const [startsted, setStartsted] = useState('');
  const [sluttsted, setSluttsted] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    setTurer(lagredeTurer);
  }, []);

  const håndterNyTur = (e) => {
    e.preventDefault();

    const start = new Date(startdato);
const slutt = new Date(sluttdato);

if (slutt < start) {
  alert('Sluttdato kan ikke være før startdato.'); // 🏷️ i18n
  return;
}

    const id = Date.now().toString();
    const dager =
      (new Date(sluttdato).getTime() - new Date(startdato).getTime()) / (1000 * 60 * 60 * 24) + 1;

    const nyTur = {
      id,
      navn,
      startdato,
      sluttdato,
      beskrivelse,
      reiserute: {
        start: startsted,
        slutt: sluttsted,
        dager: Math.round(dager),
      },
    };

    const oppdatert = [...turer, nyTur];
    localStorage.setItem('turer', JSON.stringify(oppdatert));
    setTurer(oppdatert);

    // Naviger direkte til kartvisning
    navigate(`/planlegg/${id}`);
  };

  const slettTur = (id) => {
    const filtrert = turer.filter((t) => t.id !== id);
    localStorage.setItem('turer', JSON.stringify(filtrert));
    setTurer(filtrert);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>RideAway</h1> {/* 🏷️ i18n */}

      <form onSubmit={håndterNyTur} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Turens navn" // 🏷️ i18n
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          required
        /><br />
        <input
          type="date"
          placeholder="Startdato" // 🏷️ i18n
          value={startdato}
          onChange={(e) => setStartdato(e.target.value)}
          required
        /><br />
        <input
          type="date"
          placeholder="Sluttdato" // 🏷️ i18n
          value={sluttdato}
          onChange={(e) => setSluttdato(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Beskrivelse (valgfritt)" // 🏷️ i18n
          value={beskrivelse}
          onChange={(e) => setBeskrivelse(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Turen går fra..." // 🏷️ i18n
          value={startsted}
          onChange={(e) => setStartsted(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Turen går til..." // 🏷️ i18n
          value={sluttsted}
          onChange={(e) => setSluttsted(e.target.value)}
          required
        /><br />
        <button type="submit" style={{ marginTop: '10px' }}>
          🚀 Opprett tur
        </button>
      </form>

      <h2>Dine turer</h2> {/* 🏷️ i18n */}
      {turer.length === 0 && <p>Ingen turer opprettet enda.</p>} {/* 🏷️ i18n */}

      {turer.map((tur) => (
        <div key={tur.id} style={{ marginBottom: '15px' }}>
          <strong>{tur.navn}</strong> ({tur.startdato} – {tur.sluttdato})<br />
          {tur.reiserute ? (
            <Link to={`/planlegg/${tur.id}`}>
              <button>📍 Vis reiserute</button> {/* 🏷️ i18n */}
            </Link>
          ) : (
            <Link to={`/planlegg/${tur.id}`}>
              <button>➕ Opprett reiserute</button> {/* 🏷️ i18n */}
            </Link>
          )}
          <button onClick={() => slettTur(tur.id)} style={{ marginLeft: '10px' }}>
            🗑️ Slett
          </button> {/* 🏷️ i18n */}
        </div>
      ))}
    </div>
  );
}

export default App;
