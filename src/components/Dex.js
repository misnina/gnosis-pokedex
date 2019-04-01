import React, { Component } from 'react';
import axios from 'axios';
import { GPOKEDEX } from './gpokedex'
import { Entry } from './Entry';
import '../styles/index.scss';

class Dex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEntryInfo: [],
      counter: 0,
      allEntryComponents: {},
      sortedComponent: [],
      sortType: 'all',
      sortValue: 'none',
    }
  }

  render() {
    const { sortType, sortValue } = this.state;
    let loaded;
    if (this.state.counter === 200) {
      loaded = true;
    }
    let sorted = this.sortBy(sortType, sortValue);

    if(loaded) {
      return (
        <div className="app">
          <header className='sticky top flex center'>
            <button onClick={() => this.setSorting('all', 'none')}>
              Gnosis Pokedex
            </button> {sortType} - {sortValue}
          </header>
          <main className="flex">
            {sorted}
          </main>

          <footer className='sticky bottom flex center'>
            <div>Made by <a href="https://github.com/misnina">Nina</a>
              Background by <a href="https://www.toptal.com/designers/subtlepatterns/cream-pixels/">Toptal</a></div>
            <div>Content © <a href="http://www.gamefreak.co.jp/">GameFreak</a>
              Using <a href="https://pokeapi.co/">PokéAPI</a></div>
          </footer>
        </div>
      )
    } else {
      return (
        <div>
          Loading...Please wait!
          {console.log('still loading')}
        </div>
      )
    }
  }

  setSorting = (sortType, sortValue) => {
    this.setState({ sortType, sortValue });
  }

  sortBy(type, value) {
    const { allEntryInfo, allEntryComponents } = this.state;
    let sorted = [];
    if (type === 'all') {
      GPOKEDEX.forEach(pokemon => {
        sorted.push(allEntryComponents[pokemon]);
      });
    } else if (type === "eggGroups") {
      let typeSorted = allEntryInfo.filter(pokemon => {
        return pokemon[type][0] === value || pokemon[type][1] === value ;
       });
       typeSorted
         .sort((a, b) => a.id - b.id)
         .forEach(pokemon => {
           sorted.push(allEntryComponents[pokemon.name])
         });
    } else {
      let typeSorted = allEntryInfo.filter(pokemon => {
       return pokemon[type] === value;
      });
      typeSorted
        .sort((a, b) => a.id - b.id)
        .forEach(pokemon => {
          sorted.push(allEntryComponents[pokemon.name])
        });
    }
    return sorted;
  }

  componentDidMount() {
    GPOKEDEX.forEach((pokemon, i) => {
      this.fetchPokemon(pokemon, i);
    });
  }

  shouldComponentUpdate() {
    if (this.state.counter >= 199) {
      return true;
    } else {
      return false;
    }
  }

  fetchPokemon = (name, id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}/`)
      .then( res => {
        const info = res.data;
        let eggSecond;
        info.egg_groups[1] ?
          eggSecond = info.egg_groups[1].name : eggSecond = null;
        
        let enEntries = info.flavor_text_entries.filter(entry => {
          return entry.language.name === 'en'
        });
        const data = {
          name: name,
          id: id,
          color: info.color.name,
          eggGroups: [
            info.egg_groups[0].name,
            eggSecond,
          ],
          genus: info.genera[2].genus,
          shape: info.shape.name,
          flavorText: enEntries[0].flavor_text,
        }

        this.setState(prevState => {
          const allEntryInfo = [...prevState.allEntryInfo, data];
          return {allEntryInfo};
        });

        const entry = <Entry
          id={id}
          name={name}
          key={name}
          color={data.color}
          egg1={data.eggGroups[0]}
          egg2={data.eggGroups[1]}
          genus={data.genus}
          shape={data.shape}
          flavorText={data.flavorText}
          setSorting={this.setSorting}
        />;
      this.setState(prevState => ({
        allEntryComponents: {
          ...prevState.allEntryComponents,
          [name] : entry
        }
      }))

        this.setState({ counter : this.state.counter + 1 })
      }).catch (err => console.log);
  }

}

export default Dex;