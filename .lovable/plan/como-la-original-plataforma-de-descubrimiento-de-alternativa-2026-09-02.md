# Como la Original — plataforma de descubrimiento de alternativas

Plataforma visual de búsqueda y comparación de alternativas alimentarias. Sin carrito, sin checkout, sin pagos.

## Decisiones ya cerradas
- Logo: logotipo tipográfico provisional (componente `Logo`, sustituible por un archivo después).
- Favoritos: solo en el navegador (localStorage), sin cuentas ni backend.
- Imágenes: placeholders ilustrados con etiqueta visible "IMAGEN DEMO". Nunca se presentan como fotografías reales.
- Datos: marcas alternativas ficticias (Marca A–E). "Oreo", "KitKat", etc. solo como nombre del producto original de referencia.

## Sistema de diseño
- Paleta en `src/styles.css` como tokens semánticos en oklch: chocolate `#3A2E2A` (foreground), naranja `#FF8A00` (primary/CTA/similitud), malva `#A77C8F` (secundario/favoritos), rosa `#F7D7E2` (fondos suaves), crema `#FFF2E6` (fondo principal), beige `#E9D7C2` (separadores).
- Tipografía: display redondeada y gruesa para títulos (Baloo 2), sans limpia para cuerpo (Nunito Sans), cargadas con `<link>` en `__root.tsx`.
- Esquinas muy redondeadas, sombras muy suaves, mucho aire, microinteracciones cortas (hover, entrada progresiva de resultados, animación del porcentaje, latido al guardar favorito).
- Detalles gráficos de marca en SVG: corazones, estrellas, destellos, curvas orgánicas — usados con moderación.

## Rutas
`/` · `/resultados` · `/producto/$slug` · `/original/$slug` · `/mis-antojos` · `/como-funciona` · `/sobre-nosotros` · `/contacto` · `/privacidad` · `/cookies` · `/terminos` · `/aviso-legal`

Cada ruta con su propio `head()`: título, meta description, Open Graph y Twitter card únicos, canonical en las hojas. `robots.txt` y `sitemap` preparados.

## Home
Header sticky compacto al hacer scroll → Hero "¿Qué se te antoja hoy?" con buscador protagonista y sugerencias en vivo → chips de ejemplos populares → selector "¿Qué necesitas?" (Sin gluten / Sin lactosa / Ambas) con nota de verificación → CTA "ENCONTRAR MI ALTERNATIVA" → "¿Cómo funciona?" en 3 pasos → "No solo te decimos cuál. Te contamos por qué." con tarjeta de comparación → "Los antojos más buscados" → CTA final → Footer completo (Descubre / Sobre nosotros / Legal).

## Resultados y ranking
- `/resultados` con búsqueda y filtros editables en la propia página (estado en la URL: `?q=&dieta=`).
- Exactamente 5 alternativas, ranking protagonista 🥇🥈🥉4️⃣5️⃣, la primera con la etiqueta "LA ALTERNATIVA MÁS PARECIDA AL ORIGINAL".
- Tarjeta: placeholder envase + placeholder producto abierto, marca, nombre, categoría, círculo de progreso con el % de parecido, valoraciones (sabor, textura, parecido, relleno), botón de favorito.
- Estados explícitos: cargando ("Buscando alternativas…"), sin resultados, error, vacío, sin verificar.

## Página de producto y de original
- `/producto/$slug`: breadcrumb, hero del producto, valoraciones, "¿Por qué se parece tanto?" con barras comparativas y explicación, "💬 ¿Qué dice la gente?" (nº de opiniones analizadas + resumen, nunca opiniones literales), información alimentaria con badges en tres estados (verificado / no verificado / no disponible) y alérgenos, "📍 ¿Dónde encontrarlo?" con enlaces externos a tiendas y su disponibilidad, productos similares, CTA "¿No te convence?".
- `/original/$slug`: producto original de referencia + las 5 alternativas, pensada para SEO ("Alternativas a Oreo sin gluten").

## Páginas restantes
`/mis-antojos` (favoritos desde localStorage, con estado vacío y CTA), `/como-funciona` (6 pasos del método, sin afirmar uso de IA), `/sobre-nosotros`, `/contacto` (formulario de contacto + proponer producto, validación en cliente, sin envío real), y las cuatro páginas legales con contenido base editable.

## Cookies
Banner con "Aceptar todas" / "Configurar cookies" / "Rechazar no necesarias" y panel de preferencias por categorías. Sin cookies de marketing activadas por defecto; preferencia guardada en localStorage.

## Arquitectura (detalle técnico)
- `src/types/` — `OriginalProduct`, `AlternativeProduct`, `Category`, `Comparison`, `ReviewSummary`, `Store`, `Favorite`, `User` con todos los campos del brief.
- `src/data/` — datos mock tipados, únicos, sin datos incrustados en componentes.
- `src/services/` — `productService`, `searchService`, `favoritesService`: interfaz asíncrona pensada para sustituirse por Wix CMS/API sin tocar la UI.
- `src/components/` — Header, Footer, Logo, SearchBar, SearchSuggestion, DietaryFilter, RankingHeader, ProductCard, SimilarityScore, ScoreBreakdown, ComparisonChart, ReviewSummary, DietaryBadges, StoreList, FavoriteButton, EmptyState, LoadingState, Breadcrumb, CookieBanner, CookiePreferences, DemoImage.
- Accesibilidad: contraste comprobado, focus visible, navegación por teclado, alt text, labels, objetivos táctiles ≥44px, jerarquía de headings, estados no dependientes solo del color.

## Orden de trabajo
1. Tokens de diseño, tipografías, tipos, datos mock y servicios.
2. Componentes base + Header/Footer/CookieBanner en `__root.tsx`.
3. Home completa.
4. Resultados y ranking.
5. Producto y original.
6. Mis antojos, cómo funciona, sobre nosotros, contacto.
7. Páginas legales, SEO por ruta, sitemap/robots, repaso responsive y de accesibilidad.
