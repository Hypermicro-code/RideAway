import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function RedigerbareStopp({ stoppListe, setStoppListe, nyStopp, setNyStopp }) {
  // Dra og slipp-håndtering
  const håndterDra = (result) => {
    if (!result.destination) return;

    const oppdatert = Array.from(stoppListe);
    const [flyttet] = oppdatert.splice(result.source.index, 1);
    oppdatert.splice(result.destination.index, 0, flyttet);
    setStoppListe(oppdatert);
  };

  const leggTilStopp = () => {
    if (nyStopp.trim() !== '') {
      setStoppListe([...stoppListe, nyStopp]);
      setNyStopp('');
    }
  };

  const slettStopp = (indeks) => {
    const kopi = [...stoppListe];
    kopi.splice(indeks, 1);
    setStoppListe(kopi);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>Stopp underveis:</h4>
      <input
        type="text"
        placeholder="Legg til sted"
        value={nyStopp}
        onChange={(e) => setNyStopp(e.target.value)}
      />
      <button onClick={leggTilStopp}>➕</button>

      <DragDropContext onDragEnd={håndterDra}>
        <Droppable droppableId="stoppListe">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}
            >
              {stoppListe.map((sted, index) => (
                <Draggable key={sted + index} draggableId={sted + index} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: '8px',
                        marginBottom: '5px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <span>📍 {sted}</span>
                      <button onClick={() => slettStopp(index)}>❌</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default RedigerbareStopp;
