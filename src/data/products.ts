
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  filters: string[];
  createdAt: string;
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Cabelo Natural Liso Loiro 60cm",
    price: 299.90,
    originalPrice: 399.90,
    image: "/placeholder.svg",
    category: "Cabelos Naturais",
    rating: 4.9,
    reviews: 125,
    discount: 25,
    filters: ["longos", "loiros", "lisos"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Mega Hair Cacheado Castanho 50cm",
    price: 199.90,
    originalPrice: 249.90,
    image: "/placeholder.svg",
    category: "Mega Hair",
    rating: 4.8,
    reviews: 89,
    discount: 20,
    filters: ["longos", "cacheados", "castanhos"],
    createdAt: "2024-02-10"
  },
  {
    id: 3,
    name: "Peruca Sintética Ondulada Loira 40cm",
    price: 149.90,
    originalPrice: 199.90,
    image: "/placeholder.svg",
    category: "Perucas",
    rating: 4.7,
    reviews: 67,
    discount: 25,
    filters: ["longos", "loiros", "ondulados"],
    createdAt: "2024-03-05"
  },
  {
    id: 4,
    name: "Cabelo Sintético Crespo Preto 30cm",
    price: 89.90,
    originalPrice: 119.90,
    image: "/placeholder.svg",
    category: "Cabelos Sintéticos",
    rating: 4.6,
    reviews: 156,
    discount: 25,
    filters: ["curtos", "crespos", "pretos"],
    createdAt: "2024-01-20"
  },
  {
    id: 5,
    name: "Cabelo Natural Cacheado Ruivo 55cm",
    price: 349.90,
    originalPrice: 429.90,
    image: "/placeholder.svg",
    category: "Cabelos Naturais",
    rating: 4.8,
    reviews: 92,
    discount: 19,
    filters: ["longos", "cacheados", "ruivos"],
    createdAt: "2024-02-28"
  },
  {
    id: 6,
    name: "Mega Hair Liso Preto 25cm",
    price: 129.90,
    originalPrice: 169.90,
    image: "/placeholder.svg",
    category: "Mega Hair",
    rating: 4.5,
    reviews: 143,
    discount: 24,
    filters: ["curtos", "lisos", "pretos"],
    createdAt: "2024-03-15"
  },
  {
    id: 7,
    name: "Peruca Natural Ondulada Castanha 45cm",
    price: 279.90,
    originalPrice: 349.90,
    image: "/placeholder.svg",
    category: "Perucas",
    rating: 4.9,
    reviews: 78,
    discount: 20,
    filters: ["longos", "ondulados", "castanhos"],
    createdAt: "2024-01-30"
  },
  {
    id: 8,
    name: "Cabelo Sintético Liso Loiro 35cm",
    price: 99.90,
    originalPrice: 129.90,
    image: "/placeholder.svg",
    category: "Cabelos Sintéticos",
    rating: 4.4,
    reviews: 198,
    discount: 23,
    filters: ["curtos", "lisos", "loiros"],
    createdAt: "2024-03-20"
  }
];

export const PRODUCTS_PER_PAGE = 6;
