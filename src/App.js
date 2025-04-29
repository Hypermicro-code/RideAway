import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [turer, setTurer] = useState([]);
  const [visSkjema, setVisSkjema] = useState(false);
  const [nyTur, setNyTur] = useState({
    navn: '',
    startdato: '',
    sluttdato: '',
    beskrivelse: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const lagredeTurer = JSON.parse(localStorage.getItem('turer')) || [];
    setTurer(lagredeTurer);
  }, []);

  const håndterInput = (e) => {
    const { name, value } = e.target;
    setNyTur({ ...nyTur, [name]: value });
  };

  const lagreTur = () => {
    const oppdatertTurer = [...turer, nyTur];
    setTurer(oppdatertTurer);
    localStorage.setItem('turer', JSON.stringify(oppdatertTurer));

    const nyTurId = oppdatertTurer.length - 1;
    setNyTur({ navn: '', startdato: '', sluttdato: '', beskrivelse: '' });
    setVisSkjema(false);

    navigate(`/tur/${nyTurId}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>RideAway</h1>
      <p>Your motorcycle travel planner prototype is running smoothly.</p>

      <button onClick={() => setVisSkjema(!visSkjema)} style={{ margin: '20px' }}>
        ➕ Opprett ny tur
      </button>

      {visSkjema && (
        <div>
          <input
            type="text"
            name="navn"
            placeholder="Tur-navn"
            value={nyTur.navn}
            onChange={håndterInput}
          /><br/>
          <input
            type="date"
            name="startdato"
            value={nyTur.startdato}
            onChange={håndterInput}
          /><br/>
          <input
            type="date"
            name="sluttdato"
            value={nyTur.sluttdato}
            onChange={håndterInput}
          /><br/>
          <textarea
            name="beskrivelse"
            placeholder="Beskrivelse"
            value={nyTur.beskrivelse}
            onChange={håndterInput}
          /><br/>
          <button onClick={lagreTur}>Lagre tur</button>
        </div>
      )}

      <h2>Dine turer</h2>
      {turer.length === 0 ? (
        <p>Du har ingen planlagte turer ennå.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {turer.map((tur, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <a href={`/tur/${index}`} style={{ textDecoration: 'none', color: 'blue' }}>
                <strong>{tur.navn}</strong><br/>
                {tur.startdato} - {tur.sluttdato}
              </a>
              <br/>
              <em>{tur.beskrivelse}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
