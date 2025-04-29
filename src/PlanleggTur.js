import React, { useState } from 'react';

function PlanleggTur() {
  const [start, setStart] = useState('');
  const [slutt, setSlutt] = useState('');
  const [dager, setDager] = useState('');

  const håndterPlanlegg = (e) => {
    e.preventDefault();
    console.log('Start:', start);
    console.log('Slutt:', slutt);
    console.log('Antall dager:', dager);

    // Her skal vi senere koble opp Google Maps-ruting
    alert(`Planlegger tur fra ${start} til ${slutt} over ${dager} dager!`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Planlegg ny tur</h1>
      <form onSubmit={håndterPlanlegg}>
        <input
          type="text"
          placeholder="Startsted"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          style={{ marginBottom: '10px' }}
        /><br/>
        <input
          type="text"
          placeholder="Endepunkt"
          value={slutt}
          onChange={(e) => setSlutt(e.target.value)}
          style={{ marginBottom: '10px' }}
        /><br/>
        <input
          type="number"
          placeholder="Antall dager"
          value={dager}
          onChange={(e) => setDager(e.target.value)}
          style={{ marginBottom: '10px' }}
        /><br/>
        <button type="submit" style={{ marginTop: '10px' }}>Planlegg tur</button>
      </form>
    </div>
  );
}

export default PlanleggTur;
