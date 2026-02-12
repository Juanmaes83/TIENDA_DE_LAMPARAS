import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero>
          <CategoryCarousel />
        </Hero>
      </main>
    </>
  );
}

export default App;
