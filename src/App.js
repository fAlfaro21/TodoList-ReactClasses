import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import { LoginContextProvider } from "../src/contexts/LoginContext";

function App() {

  let myBrand = "FyF"; // Hardcoded

  const setBrand = (newBrand) => {
    // myBrand = newBrand;
  }

  /* JSX */
  return (
    <div className="App">
      <Header myBrand={myBrand} setBrand={setBrand} />
      <LoginContextProvider />
      <Footer brand={myBrand} />
    </div>
  );
}

export default App;