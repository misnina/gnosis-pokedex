import React from 'react';

export default function PKMNStats(props) {
  return (
    <div className="stats flex column">
      <div className="type flex center">
        <div className="margin-side">
          <button onClick={() => props.showTypeEntries(props.type1)}>
            {props.type1}
          </button>
        </div>
        <div className="margin-side">
          <button
            onClick={() => props.showTypeEntries(props.type2)}
            className={props.type2 ? "show" : "hide"}
          >
            {props.type2}
          </button>
        </div>
      </div>
      <div>{props.genus}</div>
      <div>
        <strong>color</strong> -
        <button
          onClick={() => props.showColorEntries(props.color)}
        >
          {props.color}
        </button>
      </div>
      <div>
        <strong>shape</strong> -
        <button
          onClick={() => props.showShapeEntries(props.shape)}
        >
          {props.shape}
        </button>
      </div>
      <div>
        <strong>egg{props.egg2 ? `s` : null}</strong> -
        <button onClick={() => props.showEggGroups(props.egg1)}>
          {props.egg1}
        </button>
        <button
          onClick={() => props.showEggGroups(props.egg2)}
          className={props.egg2 ? "show" : "hide"}
        >
          {props.egg2}
        </button>
      </div>
      <div>"{props.flavorText}"</div>
    </div>
  )
}