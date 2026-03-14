// ============================================
// SISTEMA DE NAVEGACIÓN ENTRE VISTAS
// ============================================

function mostrarVista(nombre) {
  const vistas = document.querySelectorAll(".vista");
  
  // Animar todas las vistas salientes
  vistas.forEach(v => {
    if (v.classList.contains("activa")) {
      v.classList.remove("activa");
    }
  });

  // Mostrar la nueva vista
  const objetivo = document.getElementById(`vista-${nombre}`);
  if (objetivo) {
    objetivo.classList.add("activa");
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ============================================
// BOTONES DEL MENÚ PRINCIPAL
// ============================================

document.querySelectorAll("button[data-vista]").forEach(btn => {
  btn.addEventListener("click", () => {
    const vista = btn.getAttribute("data-vista");
    mostrarVista(vista);
  });
});

// ============================================
// BOTONES VOLVER
// ============================================

document.getElementById("volver-cultivo").addEventListener("click", () => mostrarVista("inicio"));
document.getElementById("volver-galeria").addEventListener("click", () => mostrarVista("inicio"));
document.getElementById("volver-historias").addEventListener("click", () => mostrarVista("inicio"));
document.getElementById("volver-contacto").addEventListener("click", () => mostrarVista("inicio"));

// ============================================
// SISTEMA DE GALERÍA DE FOTOS
// ============================================

const inputFotos = document.getElementById("inputFotos");
const galerias = [];

// Evento para cargar fotos
inputFotos.addEventListener("change", function(event) {
  const archivos = event.target.files;
  
  for (let archivo of archivos) {
    // Validar que sea una imagen
    if (!archivo.type.startsWith("image/")) {
      console.warn("El archivo no es una imagen:", archivo.name);
      continue;
    }

    // Validar tamaño (máx 5MB)
    if (archivo.size > 5 * 1024 * 1024) {
      alert(`La imagen ${archivo.name} es muy grande (máx 5MB)`);
      continue;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
      galerias.push({
        src: e.target.result,
        nombre: archivo.name,
        fecha: new Date().toLocaleDateString("es-ES")
      });
      renderizarGaleria();
    };

    reader.onerror = function() {
      console.error("Error al leer el archivo:", archivo.name);
    };

    reader.readAsDataURL(archivo);
  }
  
  // Limpiar input para permitir subir el mismo archivo nuevamente
  inputFotos.value = '';
});

// Renderizar galería de fotos
function renderizarGaleria() {
  const contenedor = document.getElementById("galeria-container");
  contenedor.innerHTML = '';
  
  if (galerias.length === 0) {
    // Mensaje cuando no hay fotos
    const mensajeVacio = document.createElement("p");
    mensajeVacio.style.gridColumn = "1 / -1";
    mensajeVacio.style.textAlign = "center";
    mensajeVacio.style.color = "#94a3b8";
    mensajeVacio.style.padding = "32px";
    mensajeVacio.textContent = "Aún no hay fotos. ¡Sube las tuyas!";
    contenedor.appendChild(mensajeVacio);
    return;
  }
  
  galerias.forEach((foto, indice) => {
    const div = document.createElement("div");
    div.className = "foto-item";
    
    div.innerHTML = `
      <img src="${foto.src}" alt="Foto ${indice + 1}">
      <button class="btn-eliminar" data-indice="${indice}" title="Eliminar foto">×</button>
    `;
    
    // Evento para eliminar foto
    const btnEliminar = div.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", (e) => {
      e.preventDefault();
      galerias.splice(indice, 1);
      renderizarGaleria();
    });
    
    contenedor.appendChild(div);
  });
}

// ============================================
// MEJORAS DE UX
// ============================================

// Agregar efecto ripple a los botones
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.6)";
    ripple.style.pointerEvents = "none";
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.animation = "rippleEffect 0.6s ease-out";
    
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Agregar animación ripple al CSS dinámicamente
const style = document.createElement("style");
style.textContent = `
  @keyframes rippleEffect {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// INICIALIZACIÓN
// ============================================

console.log("✅ Aplicación Feria Digital Agropecuaria cargada correctamente");
