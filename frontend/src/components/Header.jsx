import React, { useState } from "react";

import { Link } from "react-router-dom";

function Header  ({cart}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

  return (
    
    <header style={styles.header}>
      <style>{`
		  .nav { transition: transform 250ms ease, opacity 250ms ease; }
		  .nav.closed { transform: translateY(-120%); opacity: 0; }
		  .nav.open { transform: translateY(0); opacity: 1; }

		  .navList { list-style: none; display: flex; gap: 20px; margin: 0; padding: 0; align-items: center; }
		  .navLink { position: relative; text-decoration: none; font-size: 16px; color: #333; font-weight: 600; }
		  .navLink::after { content: ""; position: absolute; left: 0; bottom: -6px; height: 2px; width: 100%; background: linear-gradient(90deg, #22c55e, #ef4444); transform: scaleX(0); transform-origin: left; transition: transform 220ms ease; }
		  .navLink:hover::after { transform: scaleX(1); }

		  .cta { padding: 10px 16px; border-radius: 8px; color: #fff; background: linear-gradient(90deg,rgb(7, 7, 7), #5217ddff); box-shadow: 0 6px 18px rgba(0,0,0,0.15); transition: transform 200ms ease, box-shadow 200ms ease; text-decoration: none; font-weight: 700; }
		  .cta:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(0,0,0,0.22); }

		  .hamburger { display: inline-flex; flex-direction: column; justify-content: center; gap: 5px; width: 42px; height: 42px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); background: rgba(255,255,255,0.7); backdrop-filter: blur(6px); cursor: pointer; padding: 0; }
		  .bar { height: 2px; width: 22px; background: #222; border-radius: 2px; transition: transform 200ms ease, opacity 200ms ease; margin: 0 auto; }
		  .hamburger.open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
		  .hamburger.open .bar:nth-child(2) { opacity: 0; }
		  .hamburger.open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

		  /* Mobile first */
		  .nav { position: fixed; left: 0; right: 0; top: 64px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 14px 20px; }
		  .navList { flex-direction: column; gap: 14px; }

		  /* Desktop */
		  @media (min-width: 768px) {
		    .hamburger { display: none; }
		    .nav { position: static; background: transparent; backdrop-filter: none; border-bottom: none; padding: 0; transform: none !important; opacity: 1 !important; }
		    .navList { flex-direction: row; gap: 24px; }
		  }
      `}</style>
      {/* Logo / Banner */}
      <div style={styles.logoContainer}>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img 
            src="/images/basket.jpg" 
            alt="FreshBasket Logo" 
            style={styles.logo} 
          />
          <h1 style={styles.title}>FreshBasket</h1>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="main-nav"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Navigation Menu */}
      <nav id="main-nav" className={`nav ${isMenuOpen ? "open" : "closed"}`}>
        <ul className="navList">
          <li><Link to="/" className="navLink" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/store" className="navLink" onClick={() => setIsMenuOpen(false)}>Store</Link></li>
          
          <li><Link to="/about" className="navLink" onClick={() => setIsMenuOpen(false)}>About</Link> </li>
          
          <li><Link to="/checkout" className="navLink" onClick={() => setIsMenuOpen(false)}>Checkout</Link></li>
          <li>
      <Link to="/cart" className="relative">
  🛒 Cart
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
      {cartCount}
    </span>
  )}
</Link>

    </li>
          <li><Link to="/store" className="cta" onClick={() => setIsMenuOpen(false)}>Shop Now</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "rgba(255,255,255,0.65)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(10px)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "42px",
    marginRight: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111",
    letterSpacing: "0.3px",
  },
};

export default Header;