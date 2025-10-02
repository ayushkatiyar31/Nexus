import React, { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  // Handle Enter key press
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      alert(`You searched for: ${query}`); // replace alert with your search function
    }
  }

  return (
    <div className="heading">
      {/* Logo */}
      <img
        className="images"
        src="https://images.indianexpress.com/2021/01/myntra.png"
        height="80px"
        width="80px"
        alt="logo"
      />

      {/* Navigation Options */}
      <div className="option">
        <button className="but">Men</button>
        <button className="but">Women</button>
        <button className="but">Kids</button>
        <button className="but">Home & Living</button>
        <button className="but">Beauty</button>
        <button className="but">Studio</button>
      </div>

      {/* Search Bar */}
      <input
        className="searchbar"
        placeholder="Search for products, brands and more"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Profile Section */}
      <div className="Profile">
        <button className="pro">Profile</button>
        <button className="pro">Wishlist</button>
        <button className="pro">Bag</button>
      </div>
    </div>
  );
}
