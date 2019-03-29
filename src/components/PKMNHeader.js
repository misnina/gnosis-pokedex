import React from 'react';
import PKMNSprite from './PKMNSprite';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function PKMNHeader(props) {
  return (
    <header>
      <div>
        <PKMNSprite pkmnID={props.pkmnID} />
        #{props.pkmnID + 1}
      </div>

      <div><h4>{capitalize(`${props.name}`)}</h4></div>
    </header>
  )
}