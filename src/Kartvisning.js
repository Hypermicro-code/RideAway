import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Kartvisning({ start, slutt, dager }) {
  const kartRef = useRef(null);
  const [dagsetapper, setDagsetapper] = useState(null);
  const [visLagre, setVisLagre] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!window.google || !start || !slutt || !dager) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    const kart = new window.google.maps.Map(kartRef.current, {
      zoom: 6,
      center: { lat: 60.472, lng: 8.4689 },
    });

    directionsRenderer.setMap(kart);

    directionsService.route(
      {
        origin: start,
        destination: slutt,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);

          const totalSekunder = response.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0);
          const timerTotal = totalSekunder / 3600;
          const timerPerDag = timerTotal / dager;

          const forslag = Array.from({ length: dager }, (_, i) =>
            `Dag ${i + 1}: Kjør ca. ${timerPerDag.toFixed(1)} timer`
          );

          setDagsetapper(forslag);
          setVisLagre(true);
        } else {
          alert('Fant ikke rute: ' + status);
        }
      }
    );
  }, [start, slutt, dager]);

  const lagreRute = () => {
    const turer = JSON.parse(localStorage.getItem('turer')) || [];
    const index = turer.findIndex((t) => t.id === id);
    if (index !== -1) {
      turer[index].reiserute = {
        start,
        slutt,
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
      )}
    </div>
  );
}

export default Kartvisning;
