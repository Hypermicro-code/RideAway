import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Kartvisning({ start, slutt, dager, stopp: initialStopp }){
  const kartRef = useRef(null);
  const [dagsetapper, setDagsetapper] = useState(null);
  const [visLagre, setVisLagre] = useState(false);
  const [kart, setKart] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [stopp, setStopp] = useState('');
  const [stoppListe, setStoppListe] = useState(initialStopp || []);
  const navigate = useNavigate();
  const { id } = useParams();

   console.log("📦 Kartkomponent lastet. Data:", {
  start,
  slutt,
  dager,
  stoppListe
});

useEffect(() => {
  if (!window.google || !start || !slutt || !dager) return;

  console.log("🗺️ Initialiserer kartet...");

  const nyttKart = new window.google.maps.Map(kartRef.current, {
    zoom: 6,
    center: { lat: 60.472, lng: 8.4689 },
  });

  const renderer = new window.google.maps.DirectionsRenderer();
  renderer.setMap(nyttKart);

  setKart(nyttKart);
  setDirectionsRenderer(renderer);
}, [start, slutt, dager]);


  // 🚀 Automatisk kjør rute når kart og renderer er klar
  useEffect(() => {
    if (kart && directionsRenderer) {
      oppdaterRute();
    }
  }, [kart, directionsRenderer]);

  const oppdaterRute = () => {
    const dagerInt = parseInt(dager);
    if (!start || !slutt || isNaN(dagerInt)) {
      alert('Startsted, endepunkt eller antall dager mangler eller er ugyldig.');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = stoppListe.map((sted) => ({
      location: sted,
      stopover: true,
    }));

    directionsService.route(
      {
        origin: start,
        destination: slutt,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);

          const totalSekunder = response.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0);
          const timerTotal = totalSekunder / 3600;
          const timerPerDag = timerTotal / dagerInt;

          const forslag = Array.from({ length: dagerInt }, (_, i) =>
            `Dag ${i + 1}: Kjør ca. ${timerPerDag.toFixed(1)} timer`
          );

          setDagsetapper(forslag);
          setVisLagre(true);
        } else {
          alert('Fant ikke rute: ' + status);
        }
      }
    );
  };

  const lagreRute = () => {
    const turer = JSON.parse(localStorage.getItem('turer')) || [];
    const index = turer.findIndex((t) => t.id === id);
    if (index !== -1) {
      turer[index].reiserute = {
        start,
        slutt,
        dager,
        stopp: stoppListe,
        dagsetapper,
      };
      localStorage.setItem('turer', JSON.stringify(turer));
      alert('Reiseruten ble lagret!');
    }
  };

  const leggTilStopp = () => {
    if (stopp.trim() !== '') {
      setStoppListe([...stoppListe, stopp]);
      setStopp('');
    }
  };
if (!start || !slutt || !dager) {
  return <p>Mangler data for å vise kart.</p>;
}

  return (
    <div>
      <div ref={kartRef} style={{ width: '100%', height: '400px', marginTop: '20px' }} />

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Legg til mellomstopp"
          value={stopp}
          onChange={(e) => setStopp(e.target.value)}
        />
        <button onClick={leggTilStopp}>➕ Legg til stopp</button>
      </div>

      {stoppListe.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4>Mellomstopp:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {stoppListe.map((sted, idx) => (
              <li key={idx}>📍 {sted}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={oppdaterRute}>🔄 Oppdater reiserute</button>
      </div>

      {dagsetapper && (
        <div style={{ marginTop: '20px' }}>
          <h3>Foreslåtte dagsetapper:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {dagsetapper.map((dag, idx) => (
              <li key={idx}>{dag}</li>
            ))}
          </ul>
        </div>
      )}

      {visLagre && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={lagreRute}>💾 Lagre reiserute</button>
        </div>
      )}
    </div>
  );
}

export default Kartvisning;
