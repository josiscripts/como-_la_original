/**
 * Minimal translation layer for brand copy.
 * Locale is detected from the document language and defaults to Spanish.
 */
import { useCallback } from "react";
import { usePreferences } from "@/lib/preferences";

export type Locale = "es" | "ca" | "en";

type Dictionary = {
  heroBrandTitleLine1: string;
  heroBrandTitleLine2: string;
};

type TranslationTable = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = {
  es: { heroBrandTitleLine1: "COMO EL", heroBrandTitleLine2: "ORIGINAL" },
  ca: { heroBrandTitleLine1: "COM L'", heroBrandTitleLine2: "ORIGINAL" },
  en: { heroBrandTitleLine1: "JUST LIKE THE", heroBrandTitleLine2: "ORIGINAL" },
};

const ca: TranslationTable = {
  "Inicio": "Inici", "Cómo funciona": "Com funciona", "Mis antojos": "Els meus desitjos", "Sobre nosotros": "Sobre nosaltres",
  "Mis favoritos": "Els meus favorits", "Encontrar mi antojo": "Trobar el meu desig", "Contacto": "Contacte", "Idioma": "Idioma",
  "Modo claro": "Mode clar", "Modo oscuro": "Mode fosc", "Cambiar a modo claro": "Canviar al mode clar", "Cambiar a modo oscuro": "Canviar al mode fosc",
  "Tu antojo, comparado": "El teu desig, comparat", "Dinos tu capricho y encontramos una alternativa que puedas disfrutar.": "Digues-nos què et ve de gust i trobarem una alternativa que puguis gaudir.",
  "Busca tu antojo y descubre la alternativa": "Cerca el teu desig i descobreix l'alternativa", "¿Qué se te antoja?": "Què et ve de gust?", "¿Qué necesitas?": "Què necessites?", "Ver todo": "Veure-ho tot", "Sin gluten ni lactosa": "Sense gluten ni lactosa",
  "Tengo antojo de Oreo...": "Em ve de gust una Oreo...", "Tengo antojo de KitKat...": "Em ve de gust un KitKat...", "Tengo antojo de donuts...": "Em venen de gust donuts...", "Tengo antojo de chocolate...": "Em ve de gust xocolata...",
  "¿Tienes alguna restricción?": "Tens alguna restricció?", "Solo mostraremos alternativas que podamos verificar.": "Només mostrarem alternatives que puguem verificar.",
  "Buscar": "Cercar", "Busca un producto original": "Cerca un product original", "Producto original": "Producte original", "Ver alternativas": "Veure alternatives", "Categoría": "Categoria",
  "Así funciona": "Així funciona", "Dinos tu antojo": "Digues-nos què et ve de gust", "Escribe el producto que te apetece de verdad.": "Escriu el producte que realment et ve de gust.",
  "Elige tu necesidad": "Tria la teva necessitat", "Sin gluten, sin lactosa o ambas.": "Sense gluten, sense lactosa o totes dues.", "Compara y decide": "Compara i decideix", "Ranking con el parecido a tu original.": "Rànquing segons la semblança amb l'original.",
  "Ejemplo de comparación": "Exemple de comparació", "Ver la comparativa": "Veure la comparativa", "Explora por categoría": "Explora per categoria", "Ver alternativas parecidas": "Veure alternatives semblants",
  "Antojos con alternativa": "Desitjos amb alternativa", "¿No encuentras tu antojo?": "No trobes el teu desig?", "Cuéntanoslo y lo añadimos al catálogo de comparaciones.": "Explica'ns-ho i ho afegirem al catàleg de comparacions.", "Sugerir un producto": "Suggerir un producte",
  "Sin gluten": "Sense gluten", "Sin lactosa": "Sense lactosa", "Sin gluten + Sin lactosa": "Sense gluten + Sense lactosa", "Ambas": "Totes dues", "Necesidades alimentarias": "Necessitats alimentàries",
  "Descubre": "Descobreix", "Buscar un antojo": "Cercar un desig", "Nuestro método": "El nostre mètode", "Quiénes somos": "Qui som", "Información": "Informació",
  "Aviso legal": "Avís legal", "Política de privacidad": "Política de privacitat", "Política de cookies": "Política de galetes", "Condiciones de uso": "Condicions d'ús", "Uso de IA": "Ús de la IA", "Transparencia / afiliación": "Transparència / afiliació", "Privacidad": "Privacitat",
  "Tu antojo, comparado.": "El teu desig, comparat.", "Encuentra alternativas que se parecen a lo que buscas y descubre por qué.": "Troba alternatives semblants al que busques i descobreix per què.",
  "© 2026 Como la Original. Todos los derechos reservados. Como la Original no vende productos: comparamos alternativas y te enviamos a la tienda.": "© 2026 Como la Original. Tots els drets reservats. Como la Original no ven productes: comparem alternatives i t'enviem a la botiga.",
  "Guardadas en este navegador. Si borras los datos del sitio, la lista desaparece.": "Desats en aquest navegador. Si esborres les dades del lloc, la llista desapareix.",
  "Todavía no has guardado ningún antojo": "Encara no has desat cap desig", "Busca un producto y pulsa el corazón para tenerlo siempre a mano.": "Cerca un producte i prem el cor per tenir-lo sempre a mà.", "Ver ficha": "Veure fitxa",
  "Resultados": "Resultats", "Todavía no tenemos una alternativa para este antojo": "Encara no tenim una alternativa per a aquest desig", "Estamos ampliando el catálogo cada semana. Cuéntanos qué buscabas y lo añadimos.": "Ampliem el catàleg cada setmana. Explica'ns què buscaves i ho afegirem.",
  "Sugerir este producto": "Suggerir aquest producte", "Probar otro antojo": "Provar un altre desig", "Alternativas para tu antojo": "Alternatives per al teu desig", "Cómo calculamos el parecido": "Com calculem la semblança",
  "La alternativa más parecida al original": "L'alternativa més semblant a l'original", "parecido": "semblança", "Sabor": "Sabor", "Textura": "Textura", "Parecido al original": "Semblança amb l'original", "Crema / relleno": "Crema / farciment", "Ver ficha completa": "Veure la fitxa completa",
  "Guardar en mis favoritos": "Desar als meus favorits", "Guardado en mis antojos": "Desat als meus desitjos", "Guardar": "Desar", "Guardado": "Desat",
  "¿Cómo encontramos alternativas tan parecidas?": "Com trobem alternatives tan semblants?", "No hay magia: hay método. Comparamos cada alternativa con el original criterio a criterio y te enseñamos el resultado completo, no solo el titular.": "No hi ha màgia: hi ha mètode. Comparem cada alternativa amb l'original criteri per criteri i t'ensenyem el resultat complet.",
  "Qué puedes esperar (y qué no)": "Què pots esperar (i què no)", "Buscar mi antojo": "Cercar el meu desig",
  "Cuéntanos tu antojo": "Explica'ns el teu desig", "Nombre": "Nom", "Motivo": "Motiu", "Mensaje": "Missatge", "Enviar mensaje": "Enviar missatge", "Escribir otro mensaje": "Escriure un altre missatge", "¡Mensaje recibido!": "Missatge rebut!",
  "He leído y acepto la política de privacidad.": "He llegit i accepto la política de privacitat.",
  "Transparentes": "Transparents", "Cercanos": "Propers", "Prudentes": "Prudents", "Encontrar mi alternativa": "Trobar la meva alternativa",
  "Puntuaciones detalladas": "Puntuacions detallades", "Comparativa con el original": "Comparativa amb l'original", "Qué dice la gente": "Què diu la gent", "Dónde encontrarlo": "On trobar-lo", "Información alimentaria": "Informació alimentària", "Otras alternativas parecidas": "Altres alternatives semblants", "Ver todas las alternativas": "Veure totes les alternatives",
  "¿Dónde encontrarlo?": "On trobar-lo?", "Ver dónde comprar": "Veure on comprar", "Disponible": "Disponible", "Disponibilidad ocasional": "Disponibilitat ocasional", "No disponible": "No disponible", "Disponibilidad por confirmar": "Disponibilitat per confirmar",
  "Verificado": "Verificat", "No verificado": "No verificat", "Apto para celiacos": "Apte per a celíacs", "Alérgenos indicados:": "Al·lèrgens indicats:", "Alérgenos declarados:": "Al·lèrgens declarats:", "Sin datos disponibles": "Sense dades disponibles",
  "Aviso de cookies": "Avís de galetes", "Más información": "Més informació", "Aceptar todas": "Acceptar-les totes", "Rechazar no necesarias": "Rebutjar les no necessàries", "Configurar cookies": "Configurar galetes", "Guardar preferencias": "Desar preferències", "Necesarias": "Necessàries", "Siempre activas": "Sempre actives", "Analíticas": "Analítiques",
  "Utilizamos cookies para mejorar tu experiencia, analizar el uso de la web y ofrecer determinadas funcionalidades.": "Utilitzem galetes per millorar la teva experiència, analitzar l'ús del web i oferir determinades funcionalitats.", "Imprescindibles para que la web funcione: navegación, seguridad y tus antojos guardados.": "Imprescindibles perquè el web funcioni: navegació, seguretat i els teus desitjos desats.", "Nos ayudan a entender qué antojos se buscan más para mejorar las comparaciones.": "Ens ajuden a entendre quins desitjos es busquen més per millorar les comparacions.", "Desactivadas por defecto. No las activamos sin tu consentimiento explícito.": "Desactivades per defecte. No les activem sense el teu consentiment explícit.",
  "Términos y condiciones": "Termes i condicions", "Servicio ofrecido": "Servei ofert", "Uso de la información": "Ús de la informació", "Propiedad intelectual": "Propietat intel·lectual", "Modificaciones": "Modificacions", "Datos que tratamos": "Dades que tractem", "Tus antojos guardados": "Els teus desitjos desats", "Finalidad y base legal": "Finalitat i base legal", "Derechos": "Drets", "Cookies necesarias": "Galetes necessàries", "Cookies analíticas": "Galetes analítiques", "Cookies de marketing": "Galetes de màrqueting", "Cómo gestionarlas": "Com gestionar-les",
};

const en: TranslationTable = {
  "Inicio": "Home", "Cómo funciona": "How it works", "Mis antojos": "My cravings", "Sobre nosotros": "About us", "Mis favoritos": "My favourites", "Encontrar mi antojo": "Find my craving", "Contacto": "Contact", "Idioma": "Language",
  "Modo claro": "Light mode", "Modo oscuro": "Dark mode", "Cambiar a modo claro": "Switch to light mode", "Cambiar a modo oscuro": "Switch to dark mode",
  "Tu antojo, comparado": "Your craving, compared", "Dinos tu capricho y encontramos una alternativa que puedas disfrutar.": "Tell us what you're craving and we'll find an alternative you can enjoy.",
  "Busca tu antojo y descubre la alternativa": "Search your craving and discover the alternative", "¿Qué se te antoja?": "What are you craving?", "¿Qué necesitas?": "What do you need?", "Ver todo": "View all", "Sin gluten ni lactosa": "Gluten-free and lactose-free",
  "Tengo antojo de Oreo...": "I'm craving Oreos...", "Tengo antojo de KitKat...": "I'm craving KitKat...", "Tengo antojo de donuts...": "I'm craving doughnuts...", "Tengo antojo de chocolate...": "I'm craving chocolate...",
  "¿Tienes alguna restricción?": "Any dietary requirements?", "Solo mostraremos alternativas que podamos verificar.": "We'll only show alternatives we can verify.",
  "Buscar": "Search", "Busca un producto original": "Search for an original product", "Producto original": "Original product", "Ver alternativas": "View alternatives", "Categoría": "Category",
  "Así funciona": "How it works", "Dinos tu antojo": "Tell us your craving", "Escribe el producto que te apetece de verdad.": "Enter the product you truly want.", "Elige tu necesidad": "Choose your requirement", "Sin gluten, sin lactosa o ambas.": "Gluten-free, lactose-free, or both.", "Compara y decide": "Compare and choose", "Ranking con el parecido a tu original.": "A ranking based on similarity to the original.",
  "Ejemplo de comparación": "Comparison example", "Ver la comparativa": "View comparison", "Explora por categoría": "Explore by category", "Ver alternativas parecidas": "View similar alternatives", "Antojos con alternativa": "Cravings with alternatives", "¿No encuentras tu antojo?": "Can't find your craving?", "Cuéntanoslo y lo añadimos al catálogo de comparaciones.": "Tell us and we'll add it to our comparison catalogue.", "Sugerir un producto": "Suggest a product",
  "Sin gluten": "Gluten-free", "Sin lactosa": "Lactose-free", "Sin gluten + Sin lactosa": "Gluten-free + Lactose-free", "Ambas": "Both", "Necesidades alimentarias": "Dietary requirements",
  "Descubre": "Discover", "Buscar un antojo": "Search a craving", "Nuestro método": "Our method", "Quiénes somos": "Who we are", "Información": "Information", "Aviso legal": "Legal notice", "Política de privacidad": "Privacy policy", "Política de cookies": "Cookie policy", "Condiciones de uso": "Terms of use", "Uso de IA": "AI use", "Transparencia / afiliación": "Transparency / affiliation", "Privacidad": "Privacy",
  "Tu antojo, comparado.": "Your craving, compared.", "Encuentra alternativas que se parecen a lo que buscas y descubre por qué.": "Find alternatives similar to what you want and discover why.", "© 2026 Como la Original. Todos los derechos reservados. Como la Original no vende productos: comparamos alternativas y te enviamos a la tienda.": "© 2026 Como la Original. All rights reserved. Como la Original does not sell products: we compare alternatives and send you to the retailer.",
  "Guardadas en este navegador. Si borras los datos del sitio, la lista desaparece.": "Saved in this browser. If you clear site data, the list disappears.", "Todavía no has guardado ningún antojo": "You haven't saved any cravings yet", "Busca un producto y pulsa el corazón para tenerlo siempre a mano.": "Find a product and tap the heart to keep it close at hand.", "Ver ficha": "View details",
  "Resultados": "Results", "Todavía no tenemos una alternativa para este antojo": "We don't have an alternative for this craving yet", "Estamos ampliando el catálogo cada semana. Cuéntanos qué buscabas y lo añadimos.": "We're expanding the catalogue every week. Tell us what you were looking for and we'll add it.", "Sugerir este producto": "Suggest this product", "Probar otro antojo": "Try another craving", "Alternativas para tu antojo": "Alternatives for your craving", "Cómo calculamos el parecido": "How we calculate similarity",
  "La alternativa más parecida al original": "The closest alternative to the original", "parecido": "similarity", "Sabor": "Taste", "Textura": "Texture", "Parecido al original": "Similarity to the original", "Crema / relleno": "Cream / filling", "Ver ficha completa": "View full details", "Guardar en mis favoritos": "Save to favourites", "Guardado en mis antojos": "Saved to my cravings", "Guardar": "Save", "Guardado": "Saved",
  "¿Cómo encontramos alternativas tan parecidas?": "How do we find such similar alternatives?", "No hay magia: hay método. Comparamos cada alternativa con el original criterio a criterio y te enseñamos el resultado completo, no solo el titular.": "There's no magic: there's a method. We compare each alternative with the original criterion by criterion and show you the full result.", "Qué puedes esperar (y qué no)": "What you can expect (and what you can't)", "Buscar mi antojo": "Search my craving",
  "Cuéntanos tu antojo": "Tell us your craving", "Nombre": "Name", "Motivo": "Reason", "Mensaje": "Message", "Enviar mensaje": "Send message", "Escribir otro mensaje": "Write another message", "¡Mensaje recibido!": "Message received!", "He leído y acepto la política de privacidad.": "I have read and accept the privacy policy.",
  "Transparentes": "Transparent", "Cercanos": "Approachable", "Prudentes": "Careful", "Encontrar mi alternativa": "Find my alternative",
  "Puntuaciones detalladas": "Detailed scores", "Comparativa con el original": "Comparison with the original", "Qué dice la gente": "What people say", "Dónde encontrarlo": "Where to find it", "Información alimentaria": "Food information", "Otras alternativas parecidas": "Other similar alternatives", "Ver todas las alternativas": "View all alternatives", "¿Dónde encontrarlo?": "Where to find it?", "Ver dónde comprar": "See where to buy", "Disponible": "Available", "Disponibilidad ocasional": "Occasionally available", "No disponible": "Unavailable", "Disponibilidad por confirmar": "Availability to be confirmed",
  "Verificado": "Verified", "No verificado": "Not verified", "Apto para celiacos": "Suitable for coeliacs", "Alérgenos indicados:": "Listed allergens:", "Alérgenos declarados:": "Declared allergens:", "Sin datos disponibles": "No data available",
  "Aviso de cookies": "Cookie notice", "Más información": "More information", "Aceptar todas": "Accept all", "Rechazar no necesarias": "Reject non-essential", "Configurar cookies": "Cookie settings", "Guardar preferencias": "Save preferences", "Necesarias": "Essential", "Siempre activas": "Always active", "Analíticas": "Analytics",
  "Utilizamos cookies para mejorar tu experiencia, analizar el uso de la web y ofrecer determinadas funcionalidades.": "We use cookies to improve your experience, analyse website use and provide certain features.", "Imprescindibles para que la web funcione: navegación, seguridad y tus antojos guardados.": "Essential for the website to work: navigation, security and your saved cravings.", "Nos ayudan a entender qué antojos se buscan más para mejorar las comparaciones.": "They help us understand which cravings are searched most so we can improve comparisons.", "Desactivadas por defecto. No las activamos sin tu consentimiento explícito.": "Disabled by default. We do not enable them without your explicit consent.",
  "Términos y condiciones": "Terms and conditions", "Servicio ofrecido": "Service provided", "Uso de la información": "Use of information", "Propiedad intelectual": "Intellectual property", "Modificaciones": "Changes", "Datos que tratamos": "Data we process", "Tus antojos guardados": "Your saved cravings", "Finalidad y base legal": "Purpose and legal basis", "Derechos": "Rights", "Cookies necesarias": "Essential cookies", "Cookies analíticas": "Analytics cookies", "Cookies de marketing": "Marketing cookies", "Cómo gestionarlas": "How to manage them",
};

const tables: Record<Locale, TranslationTable> = { es: {}, ca, en };
const sourceText = new WeakMap<Node, string>();
const sourceAttributes = new WeakMap<HTMLElement, Partial<Record<"aria-label" | "title" | "placeholder", string>>>();

export function translateText(text: string, locale: Locale): string {
  if (locale === "es") return text;
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  const core = text.trim().replace(/\s+/g, " ");
  const exact = tables[locale][core];
  if (exact) return `${leading}${exact}${trailing}`;
  return text;
}

export function useDocumentTranslation(locale: Locale) {
  return useCallback(() => {
    const root = document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const element = node.parentElement;
      if (element && !["SCRIPT", "STYLE"].includes(element.tagName)) {
        const existing = sourceText.get(node);
        const currentValue = node.textContent ?? "";
        const isKnownRendering = existing
          ? currentValue === existing || (["es", "ca", "en"] as Locale[]).some((candidate) => currentValue === translateText(existing, candidate))
          : false;
        const source = existing && isKnownRendering ? existing : currentValue;
        if (!existing && source.trim()) sourceText.set(node, source);
        if (existing && source !== existing) sourceText.set(node, source);
        const translated = translateText(source, locale);
        if (node.textContent !== translated) node.textContent = translated;
      }
      node = walker.nextNode();
    }
    document.querySelectorAll<HTMLElement>("[aria-label],[title],[placeholder]").forEach((element) => {
      (["aria-label", "title", "placeholder"] as const).forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        const saved = sourceAttributes.get(element) ?? {};
        const source = saved[attribute] ?? value;
        saved[attribute] = source;
        sourceAttributes.set(element, saved);
        element.setAttribute(attribute, translateText(source, locale));
      });
    });
  }, [locale]);
}

export const defaultLocale: Locale = "es";

export function resolveLocale(value?: string | null): Locale {
  const tag = (value ?? "").toLowerCase().slice(0, 2);
  if (tag === "ca" || tag === "en" || tag === "es") return tag;
  return defaultLocale;
}

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

/**
 * Reactive locale hook. Subscribes to the shared preferences store
 * (src/lib/preferences.ts) so components re-render when the user
 * switches language from the navbar.
 */
export function useLocale(): Locale {
  return usePreferences().locale;
}

export function useTranslations(): Dictionary {
  return getDictionary(useLocale());
}
