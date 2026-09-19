# Rediseño del navbar flotante

## Objetivo
Sustituir únicamente la presentación del header actual por un navbar de cristal cálido, manteniendo intactos el hero, las rutas, los enlaces, favoritos, tema e idioma.

## Implementación
- Convertir el navbar de escritorio en una cápsula fija y centrada, con ancho y altura estables, transparencia variable según el scroll, blur, borde suave y sombra ligera.
- Mantener logo a la izquierda, navegación al centro y controles compactos a la derecha; Inicio conservará la cápsula rosa cuando esté activo.
- Unificar tablet y móvil desde el mismo breakpoint: logo reducido, favoritos, tema, selector de idioma compacto y hamburguesa, sin enlaces visibles en la barra.
- Sustituir el desplegable actual por un panel lateral derecho translúcido con overlay, cierre suave, foco accesible, enlaces existentes, favoritos, tema, idioma y CTA hacia la búsqueda del inicio.
- Conservar las animaciones de favoritos y el comportamiento del navbar al hacer scroll, respetando `prefers-reduced-motion`.

## Detalles técnicos
- Reutilizar los tokens de color y sombras existentes; añadir solo tokens semánticos de cristal si hacen falta.
- Reutilizar los controles de preferencias actuales, añadiendo una variante compacta para la cápsula y otra completa para el panel.
- Usar el componente de botón existente para controles interactivos.
- Desktop desde `lg`; tablet y móvil compartirán el mismo patrón por debajo de `lg`.

## Verificación
- Comprobar escritorio, tablet y móvil, incluyendo apertura/cierre del panel, navegación, cambio de idioma, modo oscuro, favoritos, scroll y ausencia de solapamientos o desbordamiento horizontal.
