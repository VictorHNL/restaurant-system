import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { errorMessage } from "../services/api";
import type { Product } from "../types/Product";
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    getProducts().then(data => { if (active) setProducts(data); })
      .catch(e => { if (active) setError(errorMessage(e)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return { products, loading, error };
}
