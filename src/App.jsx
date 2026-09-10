import { useEffect, useState } from "react";

function App() {
  // Estados para manejar los personajes, carga y errores
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Consulta a la API pública de Rick and Morty
    const obtenerPersonajes = async () => {
      try {
        const respuesta = await fetch("https://rickandmortyapi.com/api/character");

        // Validamos si la respuesta HTTP fue exitosa (código 200)
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la lista de personajes");
        }

        const datos = await respuesta.json();
        // Guardamos el arreglo 'results' que contiene los personajes
        setPersonajes(datos.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerPersonajes();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Personajes - The Rick and Morty API</h1>

      {/* Indicadores de estado */}
      {cargando && <p>Cargando personajes...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Renderizado de personajes en rejilla/tarjetas */}
      {!cargando && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {personajes.map((personaje) => (
            <div 
              key={personaje.id} 
              style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", textAlign: "center" }}
            >
              <img 
                src={personaje.image} 
                alt={personaje.name} 
                style={{ width: "100%", borderRadius: "6px" }} 
              />
              <h3>{personaje.name}</h3>
              <p><strong>Especie:</strong> {personaje.species}</p>
              <p><strong>Estado:</strong> {personaje.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;