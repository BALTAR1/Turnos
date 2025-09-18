import { useState } from "react";

// Navegación programática para Astro/React
function goToAdmin() {
  window.location.href = "/admin";
}

export default function LoginExample() {
  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí iría la lógica de autenticación real
    // Si el login es exitoso, redirige al panel admin
    goToAdmin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-2xl mx-auto flex rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Panel Izquierdo */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10 text-gray-800">
          <h2 className="text-3xl font-extrabold mb-2">¡BIENVENIDO!</h2>
          <p className="text-lg font-medium mb-2">Accede a tu panel administrativo</p>
          <p className="text-sm text-gray-400">TurnosApp</p>
        </div>
        {/* Panel Derecho */}
        <div className="w-1/2 bg-gray-900 p-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-8">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white font-semibold">Email</label>
              <div className="relative">
                <input type="email" id="email" name="correo" value={form.correo || ""} onChange={handleChange} required
                  className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:bg-gray-700 transition placeholder-gray-400" placeholder="tuemail@dominio.com" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 10-8 0m8 0v4a4 4 0 01-8 0v-4" /></svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white font-semibold">Contraseña</label>
              <div className="relative">
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required
                  className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:bg-gray-700 transition placeholder-gray-400" placeholder="••••••" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v-6m0 0a4 4 0 10-8 0m8 0v4a4 4 0 01-8 0v-4" /></svg>
                </span>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-gray-700 text-white font-bold text-lg shadow-lg hover:bg-gray-800 transition">Ingresar</button>
          </form>
          <div className="mt-6 text-center text-gray-400 text-sm">¿No tienes cuenta? <a href="/" className="text-gray-300 hover:underline">Volver a Inicio</a></div>
        </div>
      </div>
    </div>
  );
}
