import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, getStoredCart, clearDb } from "../../utilities/fakeDb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import Button from "react-bootstrap/Button";
import "./Shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getStoredCart();
    let savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product.id === selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  const clearCart = () => {
    setCart([]);
    clearDb();
  };

  return (
    <div className="row m-0">
      <div className="col-lg-9 p-5">
        <div className="row g-4">
          {products.map((product) => (
            <Product
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
      </div>
      <div className="col-lg-3 bg-custom">
        <Cart cart={cart}>
          <Button
            onClick={clearCart}
            variant="danger"
            className="w-100 mb-3 py-2"
          >
            Clear Cart <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </Button>
          <Link to="/orders">
            <Button variant="warning" className="w-100 mb-3 py-2">
              Review Order{" "}
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </Button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
