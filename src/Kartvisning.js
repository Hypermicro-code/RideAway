import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RedigerbareStopp from './RedigerbareStopp';

function Kartvisning({ stopp: initialStopp, dager }) {
  const kartRef = useRef(null);
  const { id } = useParams();
  const [stoppListe, setStoppListe] = useState(initialStopp || []);
  const [nyStopp, setNyStopp] = useState('');
  const [dagsetapper, setDagsetapper] = useState(null);
  const [visLagre, setVisLagre] = useState(false);
  const [kart, setKart] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (!window.google || stoppListe.length < 2) return;

    const nyttKart = new window.google.maps.Map(kartRef.current, {
      zoom: 6,
      center: { lat: 60.472, lng: 8.4689 },
    });

    const renderer = new window.google.maps.DirectionsRenderer();
    renderer.setMap(nyttKart);

    setKart(nyttKart);
    setDirectionsRenderer(renderer);
  }, [stoppListe]);

  // 🔁 Kjør rute når kart og renderer er klar
  useEffect(() => {
    if (kart && directionsRenderer) oppdaterRute();
  }, [kart, directionsRenderer]);

  const oppdaterRute = () => {
    const dagerInt = parseInt(dager);
    if (stoppListe.length < 2 || isNaN(dagerInt)) {
      alert('Du må ha minst 2 stopp og gyldig antall dager.');
      return;
    }

    const origin = stoppListe[0];
    const destination = stoppListe[stoppListe.length - 1];
    const mellomstopp = stoppListe.slice(1, -1);

    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = mellomstopp.map((sted) => ({
      location: sted,
      stopover: true,
    }));

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);

          const totalSekunder = response.routes[0].legs.reduce(
            (sum, leg) => sum + leg.duration.value,
            0
          );
          const timerPerDag = totalSekunder / 3600 / dagerInt;

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
        stopp: stoppListe,
        dager,
        dagsetapper,
      };
      localStorage.setItem('turer', JSON.stringify(turer));
      alert('Reiseruten ble lagret!');
    }
  };

  return (
    <div>
      <div ref={kartRef} style={{ width: '100%', height: '400px', marginTop: '20px' }} />

      <RedigerbareStopp
        stoppListe={stoppListe}
        setStoppListe={setStoppListe}
        nyStopp={nyStopp}
        setNyStopp={setNyStopp}
      />

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
