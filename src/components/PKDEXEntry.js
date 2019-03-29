import React, { Component } from 'react';
import axios from 'axios';
import { GPOKEDEX } from './gpokedex';
import PKMNHeader from './PKMNHeader';

class PKDEXEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
    }
  }

  render() {
    const { loading, info } = this.state;
    if (!loading) {
      return (
        <div className="entry flex">
          <PKMNHeader
            pkmnID={this.props.pkmnID}
            name={info.species.name}
          />
        </div>
      )
    } else {
      return 'Loading...'
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
        this.setState({ loading: false });
      }).catch(err => {
        console.log(name + err);
      })
  }
}

export default PKDEXEntry