const PRODUCTS_API = "https://dummyjson.com/products";

let cachedCatalog = null;
let inFlightRequest = null;

export async function getProducts() {
  if (cachedCatalog) {
    return cachedCatalog;
  }

  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = fetch(PRODUCTS_API)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    })
    .then((data) => {
      cachedCatalog = data;
      return data;
    })
    .finally(() => {
      inFlightRequest = null;
    });

  return inFlightRequest;
}
