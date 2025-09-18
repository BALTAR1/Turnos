// src/utils/api.js
export async function getMensaje() {
  const res = await fetch('http://localhost:5000/');
  if (!res.ok) throw new Error('Error al conectar con Flask');
  return await res.json();
}
