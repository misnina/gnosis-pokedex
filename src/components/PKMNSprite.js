import React from 'react';
import { GPOKEDEX } from './gpokedex';

export default function PKMNSprite(props) {
  return <img
    src={`${process.env.PUBLIC_URL}/regular/${GPOKEDEX[props.pkmnID].toLowerCase()}.png`}
    alt={GPOKEDEX[props.pkmnID]}
  />
}