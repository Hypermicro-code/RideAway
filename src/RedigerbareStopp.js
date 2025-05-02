import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function RedigerbareStopp({ stoppListe, setStoppListe, nyStopp, setNyStopp }) {
  // 📦 Håndterer dra og slipp
  const håndterDra = (result) => {
    if (!result.destination) return;
    const kopi = Array.from(stoppListe);
    const [flyttet] = kopi.splice(result.source.index, 1);
    kopi.splice(result.destination.index, 0, flyttet);
    setStoppListe(kopi);
  };

  // ➕ Legg til nytt stopp
  const leggTilStopp = () => {
    const trimmed = nyStopp.trim();
    if (trimmed !== '') {
      setStoppListe([...stoppListe, trimmed]);
      setNyStopp('');
    }
  };

  // ❌ Slett stopp fra liste
  const slettStopp = (indeks) => {
    const kopi = [...stoppListe];
    kopi.splice(indeks, 1);
    setStoppListe(kopi);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>🗺️ Rediger rekkefølge på stopp:</h4>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Nytt sted"
          value={nyStopp}
          onChange={(e) => setNyStopp(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <button onClick={leggTilStopp}>➕</button>
      </div>

      <DragDropContext onDragEnd={håndterDra}>
        <Droppable droppableId="stoppListe">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}
            >
              {stoppListe.map((sted, index) => (
                <Draggable key={`${sted}-${index}`} draggableId={`${sted}-${index}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        background: '#f0f0f0',
                        padding: '8px',
                        marginBottom: '6px',
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
