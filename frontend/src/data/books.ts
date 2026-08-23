export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  description: string;
  amazonUrl: string;
  price?: string;
  publishedYear?: string;
}

export const books: Book[] = [
  {
    id: "libro-1",
    title: "DIVINO ABISMO",
    subtitle: "",
    coverImage: "/images/books/libro-1-cover.jpg",
    description: "¿Y si el caos que te hace sufrir esconde una fuerza transformadora? Divino Abismo es una guía práctica para convertir los momentos más oscuros en oportunidades de crecimiento y despertar espiritual. A través de pasos sencillos, aprenderás a dejar de ser víctima de las circunstancias para tomar el control de tu vida.",
    amazonUrl: "https://a.co/d/0iKdGMAM",
    price: "$18.50",
    publishedYear: "2026",
  },
  {
    id: "libro-2",
    title: "¿EN SERIO?",
    subtitle: "",
    coverImage: "/images/books/libro-2-cover.jpg",
    description: "¿EN SERIO? Una guía incómoda para despertar. Advertencia: Este libro no busca motivarte ni hacerte sentir especial. Busca despertarte. Si estás cansado de vivir en piloto automático, de cambiar de pareja o trabajo pero seguir sintiendo que algo no encaja, prepárate: este libro te va a incomodar. ¿EN SERIO? expone una verdad brutal: no estás viviendo tu vida, estás ejecutando un personaje programado por creencias ajenas. Hasta que no cuestiones ese mapa, seguirás repitiendo tu destino aunque cambies de escenario. En este libro encontrarás un espejo directo con narrativa sin filtros y cero misticismo vacío. Aprenderás a reconocer tus patrones, dejar el rol de víctima y cortar el ciclo kármico. Lograrás una reprogramación real transformando tu mente desde el alma para retomar el control de tu día a día, apoyado en sabiduría práctica para que mires hacia adentro. Leerlo es opcional. Despertar también.",
    amazonUrl: "https://a.co/d/0h9SF4sb",
    price: "$15.50",
    publishedYear: "2026",
  },
  {
    id: "libro-3",
    title: "ALIRIO",
    subtitle: "",
    coverImage: "/images/books/libro-3-cover.jpg",
    description: "Alirio. ¿Y si la riqueza no fuera una bendición sino la prueba más peligrosa del alma? Alirio nació con las manos vacías y el destino marcado por la pobreza. Un hombre común, endurecido por el trabajo, acostumbrado a sobrevivir, hasta que un hallazgo imposible lo cambia todo: una guaca de oro escondida bajo la tierra, esperando ser reclamada. Pero el oro no llega para salvarlo, llega para medirlo. A medida que la riqueza entra en su vida, también lo hacen las voces del pasado, las heridas invisibles, el deseo de poder, el miedo a perderlo todo y una verdad que lo confronta sin piedad: no es el oro lo que corrompe, es lo que revela. En un viaje profundo entre lo espiritual y lo humano, Alirio será enfrentado por espejos que no mienten, símbolos que despiertan su conciencia y personajes que parecen conocer su alma mejor que él mismo. Cada decisión lo acerca a una revelación inevitable: lo valioso no es lo que brilla, sino lo que decides reflejar. Entre pactos silenciosos, pruebas invisibles y un amor que solo puede existir en libertad, Alirio descubrirá que la verdadera riqueza no se posee, se sostiene. Y que todo lo que no se comparte termina devorando.",
    amazonUrl: "https://a.co/d/0a3S2InZ",
    price: "$25.00",
    publishedYear: "2026",
  }

];
