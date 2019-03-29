import React, { Component } from 'react';
import PKDEXEntry from './PKDEXEntry';
import '../styles/index.scss';

class App extends Component {
  render() {
    let entries = [];
    for (let i = 0; i < 200; i++) {
      entries.push(
        <PKDEXEntry
          pkmnID={i}
          key={`entry-${i + 1}`}
        />)
    }
    return (
      <div className="app">
        <header>Gnosis Pokedex</header>
        <main className="flex">{entries}</main>
      </div>
    );
  }
}

export default App;
