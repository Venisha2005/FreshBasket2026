import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const slides = [
    "/images/banner.jpg",
    "/images/fruits1.jpg",
    "/images/fruits2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  const handleExploreClick = () => {
    navigate("/store"); // navigate to Store page route
  };

  return (
    <section style={styles.banner}>
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes reveal {
          0% { opacity: 0; filter: blur(6px); transform: translateY(8px) scale(0.98); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
        }
        
        @keyframes floatY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }
        .cta-button { transition: transform 200ms ease, box-shadow 200ms ease; }
        .cta-button:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 10px 24px rgba(0,0,0,0.25); }
        @media (min-width: 768px) { .bannerTitle { font-size: 72px; } }
      `}</style>

      <div style={styles.slidesContainer}>
        {slides.map((src, index) => (
          <div
            key={src}
            style={{
              ...styles.slide,
              backgroundImage: `url('${src}')`,
              opacity: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div style={styles.backdrop} />

      <div style={styles.overlay} className="bannerContent">
        <h1 style={styles.title} className="bannerTitle">Fruit Basket</h1>
        <p style={styles.description}>
          Discover a wide variety of fresh, juicy fruits handpicked just for you. From seasonal favorites to exotic delights, Fresh Basket delivers the best quality fruits straight to your doorstep. Taste the freshness, enjoy the flavor, and stay healthy with every bite.
        </p>
        <button
          style={styles.button}
          className="cta-button"
          onClick={handleExploreClick}  // <-- HERE
        >
          Explore Fruits
        </button>
      </div>
    </section>
  );
};

const styles = {
  banner: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "#fff",
    fontFamily: "'Times New Roman', Times, serif",
  },
  slidesContainer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  slide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity 900ms ease-in-out",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.25), rgba(0,0,0,0.10))",
  },
  overlay: {
    background: "transparent",
    padding: "0 28px",
    maxWidth: "1000px",
    margin: "0 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "16px",
    animation: "reveal 800ms ease-out both, floatY 6s ease-in-out 1200ms infinite alternate",
  },
  title: {
    fontSize: "60px",
    fontWeight: "bold",
    marginBottom: "12px",
    lineHeight: 1.1,
    textShadow: "0 10px 24px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.25)",
    animation: "fadeInDown 800ms 150ms ease-out both",
  },
  description: {
    fontSize: "25px",
    marginBottom: "24px",
    lineHeight: "1.5",
    maxWidth: "60ch",
    textShadow: "0 6px 18px rgba(0,0,0,0.25)",
    animation: "fadeInUp 900ms 350ms ease-out both",
  },
  button: {
    padding: "18px 40px",
    fontSize: "25px",
    fontWeight: "bold",
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
    animation: "fadeInUp 900ms 550ms ease-out both",
  },
};

export default Banner;
