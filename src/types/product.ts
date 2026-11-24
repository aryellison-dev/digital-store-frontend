export interface Product {
  id: string;
  name: string;
  category: string;
  department?: string;
  brand: string;
  gender: 'Masculino' | 'Feminino' | 'Unissex';
  condition: 'Novo' | 'Usado';
  image: string;
  gallery: string[];
  price: number;
  priceDiscount?: number;
  reference: string;
  stars: number;
  rating: number;
  description: string;
  sizes: string[];
  colors: string[];
}
