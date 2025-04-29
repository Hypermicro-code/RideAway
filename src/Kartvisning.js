import React, { useEffect, useRef } from 'react';

function Kartvisning({ start, slutt }) {
  const kartRef = useRef(null);

  useEffect(() => {
    if (!window.google || !start || !slutt) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    const kart = new window.google.maps.Map(kartRef.current, {
      zoom: 6,
      center: { lat: 60.472, lng: 8.4689 }, // Midt i Norge
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
        } else {
          alert('Fant ikke rute: ' + status);
        }
      }
    );
  }, [start, slutt]);

  return <div ref={kartRef} style={{ width: '100%', height: '400px', marginTop: '20px' }} />;
}

export default Kartvisning;
