import { useState } from "react";
import "./App.css";

const foodItems = [
  { id: 1, name: "Pizza", category: "Pizza", price: 200, emoji: "🍕" },
  { id: 2, name: "Burger", category: "Burger", price: 150, emoji: "🍔" },
  { id: 3, name: "Pasta", category: "Pasta", price: 180, emoji: "🍝" },
  { id: 4, name: "Fries", category: "Snacks", price: 100, emoji: "🍟" },
  { id: 5, name: "Cold Drink", category: "Drinks", price: 80, emoji: "🥤" }
];

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);

  const filtered = category === "All"
    ? foodItems
    : foodItems.filter(item => item.category === category);

  const addToCart = item => {
    const found = cart.find(x => x.id === item.id);

    if (found) {
      setCart(cart.map(x =>
        x.id === item.id
          ? { ...x, quantity: x.quantity + 1 }
          : x
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const changeQuantity = (id, amount) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + amount }
        : item
    ).filter(item => item.quantity > 0));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const order = () => {
    if (cart.length > 0) {
      setOrdered(true);
      setCart([]);
    }
  };

  return (
    <div className="app">
      <h1>🍴 Food Delivery System</h1>

      <div className="categories">
        {["All", "Pizza", "Burger", "Pasta", "Snacks", "Drinks"].map(c => (
          <button key={c} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div className="foods">
        {filtered.map(item => (
          <div className="food" key={item.id}>
            <h2>{item.emoji} <span>{item.name}</span></h2>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 Cart</h2>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map(item => (
          <div className="cartItem" key={item.id}>
            <span>{item.emoji} {item.name}</span>
            <div>
              <button onClick={() => changeQuantity(item.id, -1)}>−</button>
              <b>{item.quantity}</b>
              <button onClick={() => changeQuantity(item.id, 1)}>+</button>
            </div>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
        <button onClick={order}>Place Order</button>
      </div>

      {ordered && (
        <div className="popup">
          <div className="popupBox">
            <h2>🎉 Order Successful!</h2>
            <p>Your food order has been placed successfully.</p>
            <button onClick={() => setOrdered(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;