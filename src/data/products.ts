import type { Product } from '../types/product';
// Assets locais fornecidos no repositório oficial. Não exige conexão com GitHub.
const base = '/assets';
export const asset = (name: string) => `${base}/${name}`;
const names = [
  ['Tênis Nike Revolution 6 Next Nature', 'Nike', 'Masculino', 249.9, 199.9],
  ['Tênis K-Swiss V8 — Masculino', 'K-Swiss', 'Masculino', 329.9, 249.9],
  ['Tênis Adidas Daily 3.0', 'Adidas', 'Unissex', 299.9, 229.9],
  ['Tênis Puma Wired Run', 'Puma', 'Masculino', 279.9, 189.9],
  ['Tênis Nike Court Vision Low', 'Nike', 'Unissex', 419.9, 329.9],
  ['Tênis Adidas Grand Court', 'Adidas', 'Feminino', 349.9, 279.9],
  ['Tênis K-Swiss Classic', 'K-Swiss', 'Unissex', 299.9, 219.9],
  ['Tênis Puma Smash V2', 'Puma', 'Feminino', 289.9, 239.9],
  ['Tênis Nike Downshifter', 'Nike', 'Masculino', 359.9, 289.9],
  ['Tênis Adidas Runfalcon', 'Adidas', 'Masculino', 319.9, 249.9],
  ['Tênis Puma Carina', 'Puma', 'Feminino', 369.9, 299.9],
  ['Tênis K-Swiss Court', 'K-Swiss', 'Unissex', 309.9, 259.9],
] as const;
export const products: Product[] = names.map(([name, brand, gender, price, priceDiscount], index) => ({
  id: String(index + 1),name,brand,gender,price,priceDiscount,category:'Tênis',department:['Esporte e lazer','Casual','Corrida','Utilitário'][index % 4],condition:'Novo',
  image: asset(`product-thumb-${(index % 5)+1}.jpeg`),
  gallery: [1,2,3,4,5].map(n => asset(`produc-image-${n}.jpeg`)),
  reference:`REF-${String(index+1).padStart(4,'0')}`,stars:4.7,rating:90+index*17,
  description:'Conforto, estilo e qualidade para acompanhar sua rotina. Design versátil, ótimo acabamento e ajuste confortável para usar no dia a dia.',
  sizes:['39','40','41','42','43'],colors:['#1F1F1F','#E2E3FF','#C92071','#F0E5CE']
}));
export const getProduct = (id: string) => products.find(item => item.id === id);
