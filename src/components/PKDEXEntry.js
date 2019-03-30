import React, { Component } from 'react';
import axios from 'axios';
import { GPOKEDEX } from './gpokedex';
import PKMNHeader from './PKMNHeader';
import PKMNStats from './PKMNStats';

class PKDEXEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      species: {},
    }
  }

  render() {
    const { loading, info, species } = this.state;
    if (!loading) {

      let ENentries = [];
      species.flavor_text_entries.forEach(entry => {
        if (entry.language.name === "en") {
          ENentries.push(entry.flavor_text)
        }
      });

      return (
        <div className="entry flex column">
          <PKMNHeader
            pkmnID={this.props.pkmnID}
            name={info.species.name}
          />
          <PKMNStats
            type1={info.types[0].type.name}
            type2={info.types[1] ? info.types[1].type.name : null}
            showTypeEntries={this.props.showTypeEntries}
            genus={species.genera[2].genus}
            color={species.color.name}
            showColorEntries={this.props.showColorEntries}
            shape={species.shape.name}
            showShapeEntries={this.props.showShapeEntries}
            egg1={species.egg_groups[0].name}
            egg2={species.egg_groups[1] ? species.egg_groups[1].name : null}
            showEggGroups={this.props.showEggGroups}
            flavorText={ENentries[0]}
          />
        </div>
      )
    } else {
      return (
        <div className="entry">
          Loading...
        </div>
      )
    }
  }

  componentDidMount() {
    this.fetchPKMN();
  }

  fetchPKMN() {
    let name = "bulbasaur";
    if (GPOKEDEX[this.props.pkmnID] === "Minior") {
      name = "minior-red-meteor";
    } else if (GPOKEDEX[this.props.pkmnID] === "Aegislash") {
      name = "aegislash-shield";
    } else {
      name = GPOKEDEX[this.props.pkmnID];
    }

    axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(res => {
        this.setState({ info: res.data });
        this.props.setInfoEntry(this.props.pkmnID, res.data);
        return axios.get(res.data.species.url);
      }).then(res => {
        this.setState({ species: res.data });
        this.props.setMainLoading(this.props.pkmnID);
        this.props.setSpeciesEntry(this.props.pkmnID, res.data);
        this.setState({ loading: false });
      }).catch(err => {
        console.log(name + err);
      })
  }
}

export default PKDEXEntry