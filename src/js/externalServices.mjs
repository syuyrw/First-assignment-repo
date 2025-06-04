const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  const products = data.Result;
  
  // Check if products is an array, if not, return the object directly

  console.log("Found products:", products);
  return products;
  

}

export async function checkout(orderData) {
  const url = `${baseURL}checkout`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error("Checkout failed");
  return await response.json();
}
