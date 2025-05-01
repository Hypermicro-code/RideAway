import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [turer, setTurer] = useState([]);
  const [visModal, setVisModal] = useState(false);
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
    const dager = (slutt - start) / (1000 * 60 * 60 * 24) + 1;

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
    setVisModal(false); // Lukk modal
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

      <button onClick={() => setVisModal(true)}>➕ Opprett ny tur</button> {/* 🏷️ i18n */}

      {visModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'left'
          }}>
            <h2>Ny tur</h2> {/* 🏷️ i18n */}
            <form onSubmit={håndterNyTur}>
              <input
                type="text"
                placeholder="Turens navn"
                value={navn}
                onChange={(e) => setNavn(e.target.value)}
                required
              /><br />
              <input
                type="date"
                placeholder="Startdato"
                value={startdato}
                onChange={(e) => setStartdato(e.target.value)}
                required
              /><br />
              <input
                type="date"
                placeholder="Sluttdato"
                value={sluttdato}
                onChange={(e) => setSluttdato(e.target.value)}
                required
                min={startdato}
              /><br />
              <textarea
                placeholder="Beskrivelse (valgfritt)"
                value={beskrivelse}
                onChange={(e) => setBeskrivelse(e.target.value)}
              /><br />
              <input
                type="text"
                placeholder="Turen går fra..."
                value={startsted}
                onChange={(e) => setStartsted(e.target.value)}
                required
              /><br />
              <input
                type="text"
                placeholder="Turen går til..."
                value={sluttsted}
                onChange={(e) => setSluttsted(e.target.value)}
                required
              /><br />
              <button type="submit" style={{ marginTop: '10px' }}>
                🚀 Opprett tur
              </button>
              <button type="button" onClick={() => setVisModal(false)} style={{ marginLeft: '10px' }}>
                ❌ Avbryt
              </button>
            </form>
          </div>
        </div>
      )}

      <h2 style={{ marginTop: '40px' }}>Dine turer</h2> {/* 🏷️ i18n */}
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

