# Feria Digital Agropecuaria

## Descripción
Proyecto de una landing para una feria digital agropecuaria que muestra tipos de cultivo, galería de fotos, historias de productores y una sección de contacto con enlaces a correo, WhatsApp y teléfono. La navegación entre “vistas” se maneja con JavaScript y se apoya en una estética verde / acuática creada por `estilo.css`.

## Tecnologías
- `index.html`: estructura semántica básica con `header`, `main`, `section` y `footer`.
- `estilo.css`: sistema completo de variables, grids responsive y animaciones.
- `funcion.js`: control de vistas, galería de fotos mediante `FileReader` y mejoras visuales (ripple).

## Cómo probar localmente
1. Abrir `index.html` en un navegador moderno (no requiere servidor).
2. Usar los botones de la vista principal para moverse entre los módulos y confirmar que los `section` pasan de `display: none` a `block`.
3. Dentro de la galería, subir imágenes (máx. 5 MB c/u) y comprobar que se renderizan, se eliminan y que se pueden leer varias.

## Hallazgos sobre el “formulario”
- **¿Qué errores encontré?** No hay un elemento `<form>` en la vista de contacto; solo hay enlaces que abren el correo, WhatsApp o el teléfono, por lo que no se pudo probar envío ni validación.
- **¿Cómo los solucioné?** Aún no se implementó un formulario real. La solución propuesta consiste en agregar un `<form>` con campos (nombre, correo, mensaje) y validaciones vía HTML5/JS antes de enviar.

## Preguntas respondidas
- **¿Por qué es importante la estructura semántica?** Porque etiquetas como `header`, `main`, `section` y `footer` aclaran el propósito de cada bloque, permiten a buscadores y a lectores de pantalla entender el flujo del contenido y mantienen consistencia con las reglas de accesibilidad.
- **¿Cómo afecta la jerarquía a la accesibilidad?** Una jerarquía de encabezados coherente (de `h1` a `h3` en el proyecto) ayuda a usuarios de lectores de pantalla a navegar y saber dónde están; una jerarquía floja complica la comprensión del contenido.
- **¿Qué mejoraría si el proyecto creciera a nivel municipal?** Añadiría componentes para múltiples municipios (filtros o mapa interactivo), un sistema de noticias/agenda municipal, registros de productores (tal vez con base de datos) y módulos multilingües y de accesibilidad reforzada (modo alto contraste y lector de texto).
