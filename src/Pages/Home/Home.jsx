import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO ADDIS EATS</p>

          <h1>
            Delicious Ethiopian
            <span> Food, Made Easy.</span>
          </h1>

          <p className="hero-text">
            Discover authentic Ethiopian dishes, order your favorites,
            and enjoy delicious food wherever you are.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="hero-button">
              Explore Menu
            </Link>

            <Link to="/menu" className="hero-link">
              View Dishes →
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-circle">
            <img
              src="/images/hero-food.png"
              alt="Delicious Ethiopian food"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;