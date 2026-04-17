import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
