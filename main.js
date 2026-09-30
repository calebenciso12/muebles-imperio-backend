// Cargar productos desde SQLite
async function cargarProductos(categoria = 'todos') {
  const contenedor = document.getElementById("grid-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "