import { getStoredCart } from "./fakeDb";

export const getCartData = async () => {
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  const storedCart = getStoredCart();
  const cart = [];

  for (const id in storedCart) {
    const addedProduct = products.find((product) => product.id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      cart.push(addedProduct);
    }
  }
  return cart;
};
