import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './components/Homepage';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Homepage />
        <Footer />
      </div>
    );
  }
}

export default App;
