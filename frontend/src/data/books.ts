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
    title: "TÍTULO DEL LIBRO 1",
    subtitle: "",
    coverImage: "/images/books/libro-1-cover.jpg",
    description: "Descripción breve del libro...",
    amazonUrl: "https://a.co/d/0iKdGMAM",
    price: "$XX.XX",
    publishedYear: "2026",
  },
  {
    id: "libro-2",
    title: "TÍTULO DEL LIBRO 2",
    subtitle: "",
    coverImage: "/images/books/libro-2-cover.jpg",
    description: "Descripción breve del libro...",
    amazonUrl: "https://a.co/d/0h9SF4sb",
    price: "$XX.XX",
    publishedYear: "2026",
  },
];
