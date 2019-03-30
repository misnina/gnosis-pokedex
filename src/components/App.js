import React, { Component } from 'react';
import PKDEXEntry from './PKDEXEntry';
import '../styles/index.scss';

let entries = [];
let filteredEntries = [];
let loadArray = [];
const infoEntries = [];
const speciesEntries = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLoaded: loadArray[199],
      showAll: true,
      showFiltered: false,
      pageFilter: "All - by number",
    }
  }

  render() {
    for (let i = 0; i < 200; i++) {
      entries[i] =
        <PKDEXEntry
          pkmnID={i}
          key={`entry-${i + 1}`}
          setInfoEntry={this.setInfoEntry}
          setSpeciesEntry={this.setSpeciesEntry}
          setMainLoading={this.setMainLoading}
          showColorEntries={this.showColorEntries}
          showShapeEntries={this.showShapeEntries}
          showEggGroups={this.showEggGroups}
          showTypeEntries={this.showTypeEntries}
        />
    }
    if (this.state.allLoaded) {
      return (
        <div className="app">
          <header className='flex center'>
            <button onClick={this.showAllEntries}>
              Gnosis Pokedex
            </button> {this.state.pageFilter}
          </header>

          {this.state.showAll ? <main className="flex">{entries}</main> : null}
          {this.state.showFiltered ? <main className="flex">{filteredEntries}</main> : null}

        </div>
      )
    } else {
      return (
        <div>
          Loading... please wait
          <div style={{ display: 'none' }}>{entries}</div>
        </div>
      )
    }
  }

  showAllEntries = () => {
    this.setState({ showAll: true, showFiltered: false });
    this.setPageFilter('All', 'by number');
  }

  showColorEntries = (color) => {
    filteredEntries = [];
    entries.forEach((entry, i) => {
      if (speciesEntries[i].color.name === color) {
        filteredEntries.push(entry);
      }
    })
    this.setState({ showAll: false, showFiltered: true });
    this.setPageFilter('Color', color);
  }

  showShapeEntries = (shape) => {
    filteredEntries = [];
    entries.forEach((entry, i) => {
      if (speciesEntries[i].shape.name === shape) {
        filteredEntries.push(entry);
      }
    })
    this.setState({ showAll: false, showFiltered: true });
    this.setPageFilter('Shape', shape);
  }

  showEggGroups = (egg) => {
    filteredEntries = [];
    entries.forEach((entry, i) => {
      if (speciesEntries[i].egg_groups[0].name === egg) {
        filteredEntries.push(entry);
      }

      if (speciesEntries[i].egg_groups[1]) {
        if (speciesEntries[i].egg_groups[1].name === egg) {
          filteredEntries.push(entry);
        }
      }
    });
    this.setState({ showAll: false, showFiltered: true });
    this.setPageFilter('Egg Group', egg);
  }

  showTypeEntries = (type) => {
    filteredEntries = [];
    entries.forEach((entry, i) => {
      if (infoEntries[i].types[0].type.name === type) {
        filteredEntries.push(entry);
      }

      if (infoEntries[i].types[1]) {
        if (infoEntries[i].types[1].type.name === type) {
          filteredEntries.push(entry);
        }
      }
    });
    this.setState({ showAll: false, showFiltered: true });
    this.setPageFilter('Type', type);
  }

  setPageFilter = (type, name) => {
    this.setState({ pageFilter: `${type} - ${name}` });
  }

  setInfoEntry = (pkmnID, data) => {
    infoEntries[pkmnID] = data;
  }

  setSpeciesEntry = (pkmnID, data) => {
    speciesEntries[pkmnID] = data;
  }

  setMainLoading = (pkmnID) => {
    loadArray[pkmnID] = true;
    if (pkmnID === 199) {
      this.setState({ allLoaded: true });
    }
  }
}

export default App;
