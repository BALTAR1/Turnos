import { useState, useEffect } from "react";

export default function AdminPanelExample() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/turnos")
      .then(res => res.json())
      .then(data => setTurnos(data.turnos))
      .catch(() => setTurnos([]));
  }, []);

  function eliminarTurno(id) {
    if (window.confirm("¿Estás seguro de que deseas eliminar este turno?")) {
      setTurnos(turnos.filter(t => t.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <header className="w-full bg-gray-50 text-gray-800 py-6 px-10 rounded-b-2xl flex flex-col md:flex-row items-center justify-between shadow-xl border-b border-gray-200">
        <h1 className="text-3xl font-extrabold mb-2 md:mb-0 tracking-tight">Panel de Administración</h1>
        <nav className="flex gap-4">
          <a href="/" className="bg-gray-900 px-5 py-2 rounded-lg text-white font-bold hover:bg-blue-800 transition">Inicio</a>
          <a href="/login" className="bg-gray-900 px-5 py-2 rounded-lg text-white font-bold hover:bg-blue-800 transition">Cerrar Sesión</a>
        </nav>
      </header>
      <div className="flex flex-col w-full items-center justify-center py-16">
  <main className="container bg-gray-100 rounded-xl shadow-lg p-8 w-full max-w-2xl border border-gray-300">
          <h2 className="text-center text-xl font-bold mb-6 text-gray-800 tracking-tight">Turnos Agendados</h2>
          <table className="w-full border-separate border-spacing-y-2">
            <thead className="bg-blue-900 text-white rounded-lg">
              <tr>
                <th className="px-3 py-2 font-semibold text-sm rounded-tl-lg">Cliente</th>
                <th className="px-3 py-2 font-semibold text-sm">Servicio</th>
                <th className="px-3 py-2 font-semibold text-sm">Fecha</th>
                <th className="px-3 py-2 font-semibold text-sm">Hora</th>
                <th className="px-3 py-2 font-semibold text-sm rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map(turno => (
                <tr key={turno.id} className="bg-white rounded-lg shadow-sm hover:bg-gray-200 transition border border-gray-200">
                  <td className="px-3 py-2 text-gray-800 text-sm font-medium">{turno.nombre}</td>
                  <td className="px-3 py-2 text-gray-800 text-sm font-medium">{turno.servicio}</td>
                  <td className="px-3 py-2 text-gray-800 text-sm font-medium">{turno.fecha}</td>
                  <td className="px-3 py-2 text-gray-800 text-sm font-medium">{turno.hora}</td>
                  <td className="px-3 py-2">
                    <button
                      className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition text-xs font-semibold shadow-sm border border-gray-300"
                      onClick={() => eliminarTurno(turno.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
