import type {
  AlternativeProduct,
  Category,
  Comparison,
  OriginalProduct,
  Store,
} from "@/types";
import type { AppIconName } from "@/components/common/AppIcon";

/**
 * DEMO DATA ONLY.
 * Alternative brands are fictional ("Marca A" ... "Marca E") on purpose.
 * Original products are referenced by name only, as the craving the user has.
 * No image here is a real product photo: every image is a marked demo placeholder.
 * Replace this module with the Wix CMS / API service implementation.
 */

export const categories: Category[] = [
  { id: "cat-galletas", slug: "galletas", name: "Galletas", icon: "cookie" },
  { id: "cat-chocolate", slug: "chocolate", name: "Chocolate", icon: "candy" },
  { id: "cat-helados", slug: "helados", name: "Helados", icon: "ice-cream" },
  { id: "cat-bolleria", slug: "bolleria", name: "Bollería", icon: "donut" },
];

const storeCatalog: Record<string, { name: string; url: string }> = {
  carrefour: { name: "Carrefour", url: "https://www.carrefour.es/" },
  mercadona: { name: "Mercadona", url: "https://www.mercadona.es/" },
  alcampo: { name: "Alcampo", url: "https://www.compraonline.alcampo.es/" },
  lidl: { name: "Lidl", url: "https://www.lidl.es/" },
  amazon: { name: "Amazon", url: "https://www.amazon.es/" },
  especializadas: { name: "Tiendas especializadas", url: "https://www.celiacos.org/" },
};

function makeStores(
  entries: Array<[keyof typeof storeCatalog, Store["availability"]]>,
): Store[] {
  return entries.map(([key, availability]) => {
    const store = storeCatalog[key] ?? { name: key, url: "#" };
    return {
      id: key,
      name: store.name,
      productUrl: store.url,
      availability,
      lastChecked: "2026-08-20",
    };
  });
}

export const originalProducts: OriginalProduct[] = [
  {
    id: "orig-oreo",
    slug: "oreo",
    name: "Oreo",
    brandNote: "Galleta de cacao con crema",
    categoryId: "cat-galletas",
    description:
      "La galleta de cacao con relleno de crema dulce. El antojo clásico: crujiente por fuera, cremoso por dentro.",
    icon: "cookie",
    image: { label: "Oreo · imagen demo", alt: "Placeholder de galleta de cacao con crema" },
    seoTitle: "Alternativas a Oreo sin gluten y sin lactosa",
    seoDescription:
      "Las 5 alternativas más parecidas a Oreo, comparadas por sabor, textura, galleta y crema. Encuentra la que más se parece al original.",
  },
  {
    id: "orig-kitkat",
    slug: "kitkat",
    name: "KitKat",
    brandNote: "Barrita de barquillo con chocolate",
    categoryId: "cat-chocolate",
    description:
      "Barquillo crujiente en capas cubierto de chocolate con leche. El snack que se parte en dedos.",
    icon: "candy",
    image: { label: "KitKat · imagen demo", alt: "Placeholder de barrita de barquillo con chocolate" },
    seoTitle: "Alternativas a KitKat sin lactosa y sin gluten",
    seoDescription:
      "Comparamos las 5 barritas de barquillo con chocolate más parecidas a KitKat según sabor, textura y crujiente.",
  },
  {
    id: "orig-magnum",
    slug: "magnum",
    name: "Magnum",
    brandNote: "Helado de palo con cobertura de chocolate",
    categoryId: "cat-helados",
    description:
      "Helado cremoso en palo con una cobertura gruesa de chocolate que cruje al morder.",
    icon: "ice-cream",
    image: { label: "Magnum · imagen demo", alt: "Placeholder de helado de palo con cobertura de chocolate" },
    seoTitle: "Productos parecidos a Magnum sin lactosa",
    seoDescription:
      "Helados de palo con cobertura de chocolate parecidos a Magnum, ordenados por índice de similitud.",
  },
  {
    id: "orig-donuts",
    slug: "donuts",
    name: "Donuts",
    brandNote: "Rosquilla glaseada esponjosa",
    categoryId: "cat-bolleria",
    description:
      "Rosquilla esponjosa con glaseado brillante. Dulce, tierna y para comer de dos bocados.",
    icon: "donut",
    image: { label: "Donut · imagen demo", alt: "Placeholder de rosquilla glaseada" },
    seoTitle: "Alternativas a Donuts sin gluten",
    seoDescription:
      "Las rosquillas glaseadas más parecidas a Donuts, comparadas por esponjosidad, glaseado y sabor.",
  },
];

interface Seed {
  original: string;
  slug: string;
  name: string;
  brand: string;
  scores: [number, number, number, number];
  overall: number;
  gluten: boolean;
  lactose: boolean;
  celiac: boolean;
  verification: AlternativeProduct["verificationStatus"];
  description: string;
  explanation: string;
  highlights: string[];
  reviews: number;
  reviewScores: [number, number, number];
  allergens: string[];
  stores: Array<[keyof typeof storeCatalog, Store["availability"]]>;
  criteria: Array<[string, string, AppIconName, number]>;
}

const seeds: Seed[] = [
  // ---------------------------------------------------------------- OREO
  {
    original: "orig-oreo",
    slug: "galleta-cacao-crema-marca-a",
    name: "Galleta de cacao con crema",
    brand: "Marca A",
    scores: [9.2, 9.0, 9.4, 9.1],
    overall: 92,
    gluten: true,
    lactose: true,
    celiac: true,
    verification: "verificado",
    description:
      "Galleta oscura de cacao con relleno de crema dulce. La proporción entre galleta y crema es prácticamente la del original.",
    explanation:
      "La crema es muy similar en sabor, mientras que la textura de la galleta es ligeramente más crujiente.",
    highlights: [
      "El sabor recuerda mucho al original.",
      "La textura es algo más crujiente.",
      "Buena opción para quitarse el antojo.",
    ],
    reviews: 127,
    reviewScores: [4.6, 4.4, 4.7],
    allergens: ["Soja", "Puede contener trazas de frutos secos"],
    stores: [
      ["carrefour", "disponible"],
      ["alcampo", "disponible"],
      ["amazon", "disponible"],
      ["especializadas", "disponible"],
      ["mercadona", "no-disponible"],
    ],
    criteria: [
      ["cookie", "Galleta", "cookie", 90],
      ["cream", "Crema", "milk", 95],
      ["taste", "Sabor", "taste", 92],
      ["texture", "Textura", "texture", 88],
    ],
  },
  {
    original: "orig-oreo",
    slug: "sandwich-cacao-marca-b",
    name: "Sándwich de cacao relleno",
    brand: "Marca B",
    scores: [8.9, 8.7, 9.0, 8.8],
    overall: 89,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description:
      "Dos galletas de cacao con un relleno cremoso algo más dulce que el original.",
    explanation:
      "El perfil de cacao es muy fiel; el relleno resulta un poco más dulce y menos firme.",
    highlights: [
      "Muy parecida de aspecto y aroma.",
      "El relleno resulta más dulce.",
      "Se moja bien en leche vegetal.",
    ],
    reviews: 94,
    reviewScores: [4.5, 4.3, 4.5],
    allergens: ["Soja"],
    stores: [
      ["carrefour", "disponible"],
      ["lidl", "ocasional"],
      ["amazon", "disponible"],
    ],
    criteria: [
      ["cookie", "Galleta", "cookie", 88],
      ["cream", "Crema", "milk", 90],
      ["taste", "Sabor", "taste", 89],
      ["texture", "Textura", "texture", 86],
    ],
  },
  {
    original: "orig-oreo",
    slug: "galleta-negra-rellena-marca-c",
    name: "Galleta negra rellena",
    brand: "Marca C",
    scores: [8.6, 8.5, 8.6, 8.4],
    overall: 86,
    gluten: true,
    lactose: false,
    celiac: true,
    verification: "verificado",
    description:
      "Versión con harina de arroz y maíz, relleno vegetal. Color oscuro intenso y bocado firme.",
    explanation:
      "El sabor a cacao es correcto, pero la galleta se deshace antes en boca que la original.",
    highlights: [
      "Buen sabor a cacao.",
      "Se deshace antes en boca.",
      "Opción sólida para celiacos.",
    ],
    reviews: 61,
    reviewScores: [4.3, 4.1, 4.3],
    allergens: ["Puede contener trazas de soja"],
    stores: [
      ["especializadas", "disponible"],
      ["amazon", "disponible"],
      ["carrefour", "ocasional"],
    ],
    criteria: [
      ["cookie", "Galleta", "cookie", 84],
      ["cream", "Crema", "milk", 88],
      ["taste", "Sabor", "taste", 86],
      ["texture", "Textura", "texture", 83],
    ],
  },
  {
    original: "orig-oreo",
    slug: "mini-galletas-cacao-marca-d",
    name: "Mini galletas de cacao",
    brand: "Marca D",
    scores: [8.2, 8.3, 8.2, 7.9],
    overall: 82,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description:
      "Formato mini para picar. Mismo concepto de galleta y crema en tamaño reducido.",
    explanation:
      "El formato pequeño cambia la proporción de crema por bocado, así que el recuerdo del original es menor.",
    highlights: [
      "Formato cómodo para llevar.",
      "Menos crema por bocado.",
      "Cumple para el antojo puntual.",
    ],
    reviews: 48,
    reviewScores: [4.1, 4.0, 4.0],
    allergens: ["Soja"],
    stores: [
      ["lidl", "disponible"],
      ["amazon", "ocasional"],
    ],
    criteria: [
      ["cookie", "Galleta", "cookie", 82],
      ["cream", "Crema", "milk", 80],
      ["taste", "Sabor", "taste", 84],
      ["texture", "Textura", "texture", 79],
    ],
  },
  {
    original: "orig-oreo",
    slug: "galleta-cacao-artesana-marca-e",
    name: "Galleta de cacao artesana",
    brand: "Marca E",
    scores: [7.9, 7.6, 7.8, 7.7],
    overall: 78,
    gluten: true,
    lactose: false,
    celiac: false,
    verification: "no-disponible",
    description:
      "Elaboración artesana con cacao puro y relleno de crema vegetal. Menos dulce que el original.",
    explanation:
      "El cacao es más amargo y la galleta más gruesa, así que el parecido baja aunque la calidad es alta.",
    highlights: [
      "Cacao más intenso y menos dulce.",
      "Galleta más gruesa.",
      "Gusta a quien busca menos azúcar.",
    ],
    reviews: 33,
    reviewScores: [4.0, 3.9, 3.8],
    allergens: ["Puede contener trazas de frutos secos"],
    stores: [
      ["especializadas", "disponible"],
      ["amazon", "desconocida"],
    ],
    criteria: [
      ["cookie", "Galleta", "cookie", 76],
      ["cream", "Crema", "milk", 78],
      ["taste", "Sabor", "taste", 80],
      ["texture", "Textura", "texture", 75],
    ],
  },

  // -------------------------------------------------------------- KITKAT
  {
    original: "orig-kitkat",
    slug: "barrita-barquillo-marca-a",
    name: "Barrita de barquillo con chocolate",
    brand: "Marca A",
    scores: [9.1, 9.3, 9.2, 8.9],
    overall: 91,
    gluten: true,
    lactose: true,
    celiac: true,
    verification: "verificado",
    description:
      "Cuatro dedos de barquillo en capas con cobertura de chocolate con leche vegetal.",
    explanation:
      "El crujiente del barquillo es casi idéntico; la cobertura funde un poco más rápido.",
    highlights: [
      "El crujiente clava el original.",
      "La cobertura funde antes.",
      "Muy buena para el antojo de media tarde.",
    ],
    reviews: 112,
    reviewScores: [4.6, 4.5, 4.6],
    allergens: ["Soja", "Puede contener trazas de frutos secos"],
    stores: [
      ["carrefour", "disponible"],
      ["amazon", "disponible"],
      ["especializadas", "disponible"],
    ],
    criteria: [
      ["wafer", "Barquillo", "wafer", 93],
      ["coating", "Cobertura", "candy", 90],
      ["taste", "Sabor", "taste", 91],
      ["texture", "Textura", "texture", 89],
    ],
  },
  {
    original: "orig-kitkat",
    slug: "wafer-cubierto-marca-b",
    name: "Wafer cubierto de chocolate",
    brand: "Marca B",
    scores: [8.8, 8.6, 8.7, 8.5],
    overall: 87,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description: "Barquillo en dos dedos con capa generosa de chocolate.",
    explanation: "La proporción chocolate/barquillo es mayor, lo que lo hace más dulce.",
    highlights: ["Más chocolate por bocado.", "Resulta más dulce.", "Buen crujiente."],
    reviews: 76,
    reviewScores: [4.4, 4.3, 4.4],
    allergens: ["Soja"],
    stores: [
      ["lidl", "disponible"],
      ["alcampo", "ocasional"],
    ],
    criteria: [
      ["wafer", "Barquillo", "wafer", 86],
      ["coating", "Cobertura", "candy", 89],
      ["taste", "Sabor", "taste", 88],
      ["texture", "Textura", "texture", 85],
    ],
  },
  {
    original: "orig-kitkat",
    slug: "barquillo-sin-gluten-marca-c",
    name: "Barquillo con cobertura sin gluten",
    brand: "Marca C",
    scores: [8.4, 8.2, 8.4, 8.1],
    overall: 84,
    gluten: true,
    lactose: false,
    celiac: true,
    verification: "verificado",
    description: "Barquillo de maíz y arroz con cobertura de chocolate negro.",
    explanation: "El chocolate negro cambia el perfil dulce, aunque el formato es muy fiel.",
    highlights: ["Formato muy fiel.", "Chocolate más intenso.", "Apta para dieta sin gluten."],
    reviews: 54,
    reviewScores: [4.2, 4.1, 4.2],
    allergens: ["Puede contener trazas de soja"],
    stores: [
      ["especializadas", "disponible"],
      ["amazon", "disponible"],
    ],
    criteria: [
      ["wafer", "Barquillo", "wafer", 85],
      ["coating", "Cobertura", "candy", 82],
      ["taste", "Sabor", "taste", 84],
      ["texture", "Textura", "texture", 84],
    ],
  },
  {
    original: "orig-kitkat",
    slug: "barrita-crujiente-marca-d",
    name: "Barrita crujiente de cacao",
    brand: "Marca D",
    scores: [8.0, 7.9, 8.0, 7.8],
    overall: 80,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description: "Barrita de arroz inflado y barquillo con cobertura de cacao.",
    explanation: "El arroz inflado añade un crujiente distinto al del barquillo puro.",
    highlights: ["Crujiente diferente.", "Menos capas de barquillo.", "Correcta para el antojo."],
    reviews: 41,
    reviewScores: [4.0, 3.9, 3.9],
    allergens: ["Soja"],
    stores: [
      ["carrefour", "ocasional"],
      ["amazon", "disponible"],
    ],
    criteria: [
      ["wafer", "Barquillo", "wafer", 78],
      ["coating", "Cobertura", "candy", 82],
      ["taste", "Sabor", "taste", 80],
      ["texture", "Textura", "texture", 79],
    ],
  },
  {
    original: "orig-kitkat",
    slug: "barquillo-artesano-marca-e",
    name: "Barquillo artesano bañado",
    brand: "Marca E",
    scores: [7.6, 7.5, 7.5, 7.4],
    overall: 76,
    gluten: true,
    lactose: false,
    celiac: false,
    verification: "no-disponible",
    description: "Barquillo grueso bañado a mano en chocolate.",
    explanation: "El bocado es más contundente y menos aireado que el original.",
    highlights: ["Bocado más contundente.", "Chocolate de buena calidad.", "Formato irregular."],
    reviews: 27,
    reviewScores: [3.9, 3.8, 3.7],
    allergens: ["Puede contener trazas de frutos secos"],
    stores: [["especializadas", "disponible"]],
    criteria: [
      ["wafer", "Barquillo", "wafer", 74],
      ["coating", "Cobertura", "candy", 80],
      ["taste", "Sabor", "taste", 76],
      ["texture", "Textura", "texture", 73],
    ],
  },

  // -------------------------------------------------------------- MAGNUM
  {
    original: "orig-magnum",
    slug: "helado-palo-cobertura-marca-a",
    name: "Helado de palo con cobertura",
    brand: "Marca A",
    scores: [9.3, 9.1, 9.3, 9.0],
    overall: 93,
    gluten: true,
    lactose: true,
    celiac: true,
    verification: "verificado",
    description: "Helado cremoso de base vegetal con cobertura gruesa de chocolate.",
    explanation: "La cobertura cruje igual de bien; el helado interior es ligeramente más ligero.",
    highlights: ["La cobertura cruje igual.", "Interior algo más ligero.", "Muy buena sensación cremosa."],
    reviews: 143,
    reviewScores: [4.7, 4.5, 4.7],
    allergens: ["Soja", "Frutos secos"],
    stores: [
      ["carrefour", "disponible"],
      ["alcampo", "disponible"],
      ["especializadas", "ocasional"],
    ],
    criteria: [
      ["coating", "Cobertura", "candy", 94],
      ["cream", "Cremosidad", "milk", 91],
      ["taste", "Sabor", "taste", 93],
      ["texture", "Textura", "texture", 90],
    ],
  },
  {
    original: "orig-magnum",
    slug: "bombon-helado-marca-b",
    name: "Bombón helado clásico",
    brand: "Marca B",
    scores: [8.9, 8.6, 8.8, 8.5],
    overall: 88,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description: "Helado de vainilla vegetal con baño de chocolate.",
    explanation: "El baño es más fino, por lo que el crujido inicial es menos marcado.",
    highlights: ["Baño más fino.", "Vainilla bien lograda.", "Buena relación calidad-antojo."],
    reviews: 88,
    reviewScores: [4.4, 4.2, 4.4],
    allergens: ["Soja"],
    stores: [
      ["lidl", "disponible"],
      ["mercadona", "ocasional"],
    ],
    criteria: [
      ["coating", "Cobertura", "candy", 85],
      ["cream", "Cremosidad", "milk", 89],
      ["taste", "Sabor", "taste", 88],
      ["texture", "Textura", "texture", 86],
    ],
  },
  {
    original: "orig-magnum",
    slug: "helado-coco-cacao-marca-c",
    name: "Helado de coco con cacao",
    brand: "Marca C",
    scores: [8.5, 8.4, 8.4, 8.2],
    overall: 85,
    gluten: true,
    lactose: true,
    celiac: true,
    verification: "verificado",
    description: "Base de coco con cobertura de cacao puro.",
    explanation: "El coco aporta un matiz propio que se aleja del perfil de vainilla del original.",
    highlights: ["Matiz de coco perceptible.", "Cobertura muy crujiente.", "Textura muy cremosa."],
    reviews: 67,
    reviewScores: [4.3, 4.3, 4.1],
    allergens: ["Coco"],
    stores: [
      ["especializadas", "disponible"],
      ["carrefour", "ocasional"],
    ],
    criteria: [
      ["coating", "Cobertura", "candy", 88],
      ["cream", "Cremosidad", "milk", 86],
      ["taste", "Sabor", "taste", 83],
      ["texture", "Textura", "texture", 85],
    ],
  },
  {
    original: "orig-magnum",
    slug: "polo-cremoso-marca-d",
    name: "Polo cremoso bañado",
    brand: "Marca D",
    scores: [8.1, 8.0, 8.1, 7.9],
    overall: 81,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description: "Polo de textura cremosa con baño ligero de cacao.",
    explanation: "Es más ligero y menos graso, así que la sensación en boca cambia.",
    highlights: ["Más ligero.", "Menos graso.", "Baño delgado."],
    reviews: 39,
    reviewScores: [4.0, 3.9, 3.9],
    allergens: ["Soja"],
    stores: [["alcampo", "ocasional"]],
    criteria: [
      ["coating", "Cobertura", "candy", 78],
      ["cream", "Cremosidad", "milk", 82],
      ["taste", "Sabor", "taste", 82],
      ["texture", "Textura", "texture", 80],
    ],
  },
  {
    original: "orig-magnum",
    slug: "helado-artesano-marca-e",
    name: "Helado artesano bañado",
    brand: "Marca E",
    scores: [7.8, 7.7, 7.7, 7.6],
    overall: 77,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-disponible",
    description: "Helado artesano de almendra con baño de chocolate negro.",
    explanation: "El sabor a almendra domina y el chocolate negro rebaja el dulzor.",
    highlights: ["Almendra muy presente.", "Chocolate poco dulce.", "Producto de temporada."],
    reviews: 22,
    reviewScores: [3.9, 3.8, 3.7],
    allergens: ["Frutos secos"],
    stores: [["especializadas", "desconocida"]],
    criteria: [
      ["coating", "Cobertura", "candy", 76],
      ["cream", "Cremosidad", "milk", 79],
      ["taste", "Sabor", "taste", 76],
      ["texture", "Textura", "texture", 77],
    ],
  },

  // -------------------------------------------------------------- DONUTS
  {
    original: "orig-donuts",
    slug: "rosquilla-glaseada-marca-a",
    name: "Rosquilla glaseada esponjosa",
    brand: "Marca A",
    scores: [9.0, 9.2, 9.0, 8.8],
    overall: 90,
    gluten: true,
    lactose: true,
    celiac: true,
    verification: "verificado",
    description: "Rosquilla tierna con glaseado brillante y miga esponjosa.",
    explanation: "La miga es prácticamente idéntica; el glaseado es algo menos dulce.",
    highlights: ["Miga muy esponjosa.", "Glaseado menos dulce.", "Muy buena recién abierta."],
    reviews: 104,
    reviewScores: [4.5, 4.6, 4.5],
    allergens: ["Soja"],
    stores: [
      ["carrefour", "disponible"],
      ["amazon", "disponible"],
      ["especializadas", "disponible"],
    ],
    criteria: [
      ["crumb", "Miga", "bread", 92],
      ["glaze", "Glaseado", "glaze", 88],
      ["taste", "Sabor", "taste", 90],
      ["texture", "Textura", "texture", 89],
    ],
  },
  {
    original: "orig-donuts",
    slug: "donut-clasico-marca-b",
    name: "Rosquilla clásica glaseada",
    brand: "Marca B",
    scores: [8.7, 8.5, 8.6, 8.4],
    overall: 86,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description: "Rosquilla de formato estándar con glaseado blanco.",
    explanation: "Ligeramente más densa que el original y con glaseado más grueso.",
    highlights: ["Algo más densa.", "Glaseado grueso.", "Buen sabor general."],
    reviews: 73,
    reviewScores: [4.3, 4.2, 4.3],
    allergens: ["Soja"],
    stores: [
      ["lidl", "disponible"],
      ["mercadona", "ocasional"],
    ],
    criteria: [
      ["crumb", "Miga", "bread", 84],
      ["glaze", "Glaseado", "glaze", 88],
      ["taste", "Sabor", "taste", 87],
      ["texture", "Textura", "texture", 84],
    ],
  },
  {
    original: "orig-donuts",
    slug: "rosquilla-sin-gluten-marca-c",
    name: "Rosquilla sin gluten glaseada",
    brand: "Marca C",
    scores: [8.3, 8.1, 8.3, 8.0],
    overall: 83,
    gluten: true,
    lactose: false,
    celiac: true,
    verification: "verificado",
    description: "Rosquilla de mezcla de harinas sin gluten con glaseado vegetal.",
    explanation: "La miga es más compacta, aunque el glaseado recuerda mucho al original.",
    highlights: ["Miga más compacta.", "Glaseado muy fiel.", "Mejor tras unos segundos de horno."],
    reviews: 58,
    reviewScores: [4.2, 4.0, 4.2],
    allergens: ["Huevo"],
    stores: [
      ["especializadas", "disponible"],
      ["amazon", "disponible"],
    ],
    criteria: [
      ["crumb", "Miga", "bread", 80],
      ["glaze", "Glaseado", "glaze", 87],
      ["taste", "Sabor", "taste", 84],
      ["texture", "Textura", "texture", 80],
    ],
  },
  {
    original: "orig-donuts",
    slug: "berlina-glaseada-marca-d",
    name: "Berlina glaseada",
    brand: "Marca D",
    scores: [7.9, 7.8, 7.9, 7.7],
    overall: 79,
    gluten: true,
    lactose: true,
    celiac: false,
    verification: "no-verificado",
    description: "Bollo redondo sin agujero con glaseado ligero.",
    explanation: "El formato sin agujero cambia la proporción de glaseado por bocado.",
    highlights: ["Formato distinto.", "Menos glaseado por bocado.", "Miga tierna."],
    reviews: 35,
    reviewScores: [3.9, 3.9, 3.8],
    allergens: ["Soja", "Huevo"],
    stores: [["alcampo", "ocasional"]],
    criteria: [
      ["crumb", "Miga", "bread", 82],
      ["glaze", "Glaseado", "glaze", 74],
      ["taste", "Sabor", "taste", 80],
      ["texture", "Textura", "texture", 79],
    ],
  },
  {
    original: "orig-donuts",
    slug: "rosquilla-artesana-marca-e",
    name: "Rosquilla artesana al horno",
    brand: "Marca E",
    scores: [7.5, 7.4, 7.4, 7.3],
    overall: 75,
    gluten: true,
    lactose: false,
    celiac: false,
    verification: "no-disponible",
    description: "Rosquilla horneada en lugar de frita, con glaseado fino de azúcar.",
    explanation: "Al estar horneada pierde la untuosidad característica del original frito.",
    highlights: ["Horneada, no frita.", "Menos untuosa.", "Opción más ligera."],
    reviews: 19,
    reviewScores: [3.8, 3.7, 3.6],
    allergens: ["Huevo"],
    stores: [["especializadas", "desconocida"]],
    criteria: [
      ["crumb", "Miga", "bread", 74],
      ["glaze", "Glaseado", "glaze", 72],
      ["taste", "Sabor", "taste", 78],
      ["texture", "Textura", "texture", 73],
    ],
  },
];

const originalById = new Map(originalProducts.map((o) => [o.id, o]));

export const alternativeProducts: AlternativeProduct[] = seeds.map((seed, index) => {
  const original = originalById.get(seed.original)!;
  return {
    id: `alt-${index + 1}`,
    slug: seed.slug,
    name: seed.name,
    brand: seed.brand,
    categoryId: original.categoryId,
    description: seed.description,
    packageImage: {
      label: "Envase · imagen demo",
      alt: `Placeholder del envase cerrado de ${seed.name} de ${seed.brand}`,
    },
    openProductImage: {
      label: "Producto abierto · imagen demo",
      alt: `Placeholder del producto abierto de ${seed.name} de ${seed.brand}`,
    },
    glutenFree: seed.gluten,
    lactoseFree: seed.lactose,
    celiacSuitable: seed.celiac,
    verificationStatus: seed.verification,
    tasteScore: seed.scores[0],
    textureScore: seed.scores[1],
    similarityScore: seed.scores[2],
    fillingScore: seed.scores[3],
    overallSimilarity: seed.overall,
    originalProductId: seed.original,
    reviewSummary: {
      reviewCount: seed.reviews,
      highlights: seed.highlights,
      tasteReviewScore: seed.reviewScores[0],
      textureReviewScore: seed.reviewScores[1],
      similarityReviewScore: seed.reviewScores[2],
      source: "Resumen basado en opiniones de compradores.",
    },
    stores: makeStores(seed.stores),
    allergens: seed.allergens,
    source: "Datos demo de Como la Original",
    ...(seed.verification === "verificado" ? { lastVerified: "2026-08-14" } : {}),
    seoTitle: `${seed.name} de ${seed.brand} · ${seed.overall}% parecido a ${original.name}`,
    seoDescription: `${seed.description} Comparada con ${original.name} por sabor, textura y parecido al original.`,
  };
});

export const comparisons: Comparison[] = seeds.map((seed, index) => ({
  originalProductId: seed.original,
  alternativeProductId: `alt-${index + 1}`,
  criteria: seed.criteria.map(([key, label, icon, value]) => ({ key, label, icon, value })),
  overallSimilarity: seed.overall,
  explanation: seed.explanation,
}));

export const popularSearches = ["Oreo", "KitKat", "Magnum", "Donuts", "Galletas", "Chocolate"];
