export type PhotoCategory = "fotografia-comercial" | "fotografia-producto" | "retratos";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  caption?: string;
  location?: string;
  year?: string;
}

export const photoCategories: { value: PhotoCategory; label: string }[] = [
  { value: "fotografia-comercial", label: "Fotografía Comercial" },
  { value: "fotografia-producto", label: "  Fotografia Producto" },
  { value: "retratos", label: "Retratos" },
];

export const photos: Photo[] = [
  // ─── Estudio ───
  {
    id: "foto-estudio-1",
    src: "/images/photography/estudio/estudio-01.svg",
    alt: "Fotografia Comercial - Sombra & Forma I",
    category: "fotografia-comercial",
    caption: "Sombra & Forma I — Exploración de claroscuro e iluminación dramática.",
    year: "2025",
  },
  {
    id: "foto-estudio-2",
    src: "/images/photography/estudio/estudio-02.svg",
    alt: "Fotografia Comercial - Geometría Textil",
    category: "fotografia-comercial",
    caption: "Geometría Textil — Moda editorial y texturas de alta costura.",
    year: "2025",
  },
  {
    id: "foto-estudio-3",
    src: "/images/photography/estudio/estudio-03.svg",
    alt: "Fotografia Comercial - Claroscuro Editorial",
    category: "fotografia-comercial",
    caption: "Claroscuro Editorial — Contrastes profundos en composición horizontal.",
    year: "2024",
  },
  {
    id: "foto-estudio-4",
    src: "/images/photography/estudio/estudio-04.svg",
    alt: "Fotografia Comercial - Texturas en Silencio",
    category: "fotografia-comercial",
    caption: "Texturas en Silencio — Estudio de siluetas y presencia.",
    year: "2025",
  },

  // ─── Aire Libre ───
  {
    id: "foto-aire-1",
    src: "/images/photography/aire-libre/aire-libre-01.svg",
    alt: "Fotografia Producto - Luz Natural & Viento",
    category: "fotografia-producto",
    caption: "Luz Natural & Viento — Captura de movimiento en exteriores.",
    year: "2025",
  },
  {
    id: "foto-aire-2",
    src: "/images/photography/aire-libre/aire-libre-02.svg",
    alt: "Fotografia producto - Horizontes Andinos",
    category: "fotografia-producto",
    caption: "Horizontes Andinos — Paisajes y composiciones panorámicas.",
    year: "2024",
  },
  {
    id: "foto-aire-3",
    src: "/images/photography/aire-libre/aire-libre-03.svg",
    alt: "Fotografia Producto - Atardecer Dorado",
    category: "fotografia-producto",
    caption: "Atardecer Dorado — La hora mágica y la calidez natural.",
    year: "2025",
  },
  {
    id: "foto-aire-4",
    src: "/images/photography/aire-libre/aire-libre-04.svg",
    alt: "Fotografia Producto - Espacios Abiertos",
    category: "fotografia-producto",
    caption: "Espacios Abiertos — Diálogo entre la figura humana y el entorno.",
    year: "2024",
  },

  // ─── Retratos ───
  {
    id: "foto-retratos-1",
    src: "/images/photography/retratos/retratos-01.svg",
    alt: "Retrato - Mirada Álmica I",
    category: "retratos",
    caption: "Mirada Álmica I — Retrato íntimo en blanco y negro.",
    year: "2025",
  },
  {
    id: "foto-retratos-2",
    src: "/images/photography/retratos/retratos-02.svg",
    alt: "Retrato - Esencia & Carácter",
    category: "retratos",
    caption: "Esencia & Carácter — Revelando la vulnerabilidad humana.",
    year: "2024",
  },
  {
    id: "foto-retratos-3",
    src: "/images/photography/retratos/retratos-03.svg",
    alt: "Retrato - Vulnerabilidad",
    category: "retratos",
    caption: "Vulnerabilidad — La fuerza del rostro sin artificios.",
    year: "2025",
  },
  {
    id: "foto-retratos-4",
    src: "/images/photography/retratos/retratos-04.svg",
    alt: "Retrato - Identidad Revelada",
    category: "retratos",
    caption: "Identidad Revelada — Retrato editorial de gran escala.",
    year: "2025",
  },
];
