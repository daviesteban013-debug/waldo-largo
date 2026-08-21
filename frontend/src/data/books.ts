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
    description: "Descripción breve del libro...",
    amazonUrl: "https://a.co/d/0iKdGMAM",
    price: "$18.50",
    publishedYear: "2026",
  },
  {
    id: "libro-2",
    title: "¿EN SERIO?",
    subtitle: "",
    coverImage: "/images/books/libro-2-cover.jpg",
    description: "Descripción breve del libro...",
    amazonUrl: "https://a.co/d/0h9SF4sb",
    price: "$15.50",
    publishedYear: "2026",
  },
  {
    id: "libro-3",
    title: "ALIRIO",
    subtitle: "",
    coverImage: "/images/books/libro-3-cover.jpg",
    description: "El Principito es un libro corto pero profundo que explora temas como el amor, la amistad, la pérdida y el sentido de la vida.",
    amazonUrl: "https://a.co/d/0h9SF4sb",
    price: "$25.00",
    publishedYear: "2026",
  }

];
