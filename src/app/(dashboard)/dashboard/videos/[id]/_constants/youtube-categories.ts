export const YOUTUBE_VIDEO_CATEGORIES = [
  { id: "1", label: "Cine y Animación" },
  { id: "2", label: "Autos y Vehículos" },
  { id: "10", label: "Música" },
  { id: "15", label: "Mascotas y Animales" },
  { id: "17", label: "Deportes" },
  { id: "19", label: "Viajes y Eventos" },
  { id: "20", label: "Videojuegos" },
  { id: "22", label: "Personas y Blogs" },
  { id: "23", label: "Comedia" },
  { id: "24", label: "Entretenimiento" },
  { id: "25", label: "Noticias y Política" },
  { id: "26", label: "Instructivos y Estilo" },
  { id: "27", label: "Educación" },
  { id: "28", label: "Ciencia y Tecnología" },
] as const;

export const VIDEO_LANGUAGES = [
  { value: "es", label: "Español (Latinoamérica)" },
  { value: "es-ES", label: "Español (España)" },
  { value: "en", label: "Inglés (Estados Unidos)" },
  { value: "pt", label: "Portugués" },
] as const;

export const SUBTITLE_CERTIFICATIONS = [
  { value: "none", label: "Ninguna" },
  {
    value: "never_aired",
    label: "Este contenido nunca se ha emitido en televisión en EE. UU.",
  },
  {
    value: "aired_without_subtitles",
    label: "Este contenido solo se ha emitido en televisión en EE. UU. sin subtítulos.",
  },
] as const;
