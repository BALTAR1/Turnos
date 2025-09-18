// ...existing code...
import { useState, useEffect } from "react";

export default function FormAgendar() {
  const [horarios, setHorarios] = useState(["Selecciona una fecha primero"]);
  const [form, setForm] = useState({
    nombre: "",
    servicio: "Corte de pelo",
    fecha: "",
    hora: "",
    correo: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!form.fecha) {
        setHorarios(["Selecciona una fecha primero"]);
        return;
      }
      setHorarios(["Cargando..."]);
      fetch(`http://localhost:5000/disponibilidad/${form.fecha}`)
        .then(res => res.json())
        .then(data => {
          if (data.disponibles && data.disponibles.length > 0) {
            setHorarios(data.disponibles);
          } else {
            setHorarios(["No hay horarios disponibles"]);
          }
        })
        .catch(() => setHorarios(["Error al cargar horarios"]));
    }
  }, [form.fecha]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => alert(data.mensaje))
      .catch(() => alert("Error al agendar turno"));
  }

  return (
    <section className="form-container w-full max-w-xl mx-auto my-12 bg-white p-10 rounded-2xl shadow-xl border-t-4 border-orange-500">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Agendar Turno</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit} id="form-agendar">
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="text-base font-semibold text-gray-600">Nombre</label>
          <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" required className="p-4 text-base border-2 border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:bg-blue-50 transition" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="servicio" className="text-base font-semibold text-gray-600">Servicio</label>
          <select id="servicio" name="servicio" value={form.servicio} onChange={handleChange} required className="p-4 text-base border-2 border-gray-300 rounded-xl bg-white focus:border-orange-500 focus:bg-orange-50 transition">
            <option value="Corte de pelo">Corte de pelo</option>
            <option value="Corte de pelo + Barba">Corte de pelo + Barba</option>
            <option value="Barba">Barba</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="fecha" className="text-base font-semibold text-gray-600">Fecha</label>
          <input type="date" id="fecha" name="fecha" value={form.fecha} onChange={handleChange} required className="p-4 text-base border-2 border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:bg-blue-50 transition" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="hora" className="text-base font-semibold text-gray-600">Hora</label>
          <select id="hora" name="hora" value={form.hora} onChange={handleChange} required className="p-4 text-base border-2 border-gray-300 rounded-xl bg-white focus:border-orange-500 focus:bg-orange-50 transition">
            {horarios.map((hora, i) => (
              <option key={i} value={hora === "Cargando..." || hora === "No hay horarios disponibles" || hora === "Error al cargar horarios" ? "" : hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="correo" className="text-base font-semibold text-gray-600">Correo Electrónico</label>
          <input type="email" id="correo" name="correo" value={form.correo} onChange={handleChange} placeholder="tuemail@dominio.com" required className="p-4 text-base border-2 border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:bg-blue-50 transition" />
        </div>
        <button type="submit" className="mt-8 w-full py-4 px-8 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition">Agendar Turno</button>
      </form>
    </section>
  );
}
