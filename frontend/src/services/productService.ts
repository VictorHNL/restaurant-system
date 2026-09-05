import { productsApi } from "./api";
import type { Product } from "../types/Product";
import burgers from "../assets/cat-burgers.jpg";
import pizzas from "../assets/cat-pizzas.jpg";
import portions from "../assets/cat-porcoes.jpg";
import drinks from "../assets/cat-bebidas.jpg";
import desserts from "../assets/cat-sobremesa.jpg";
const images: Record<string, string> = { "Hambúrgueres": burgers, Pizzas: pizzas, "Porções": portions, Bebidas: drinks, Sobremesas: desserts };
export async function getProducts(): Promise<Product[]> {
  const { data } = await productsApi.get<Omit<Product, "image">[]>("/products/");
  return data.map(p => ({ ...p, image: images[p.category] || burgers }));
}
