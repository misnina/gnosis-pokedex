import React, { Component } from 'react';
import PKMNHeader from './PKMNHeader';

export const Entry = (props) => {
   return (
      <div className={`entry flex column ${props.color}`}>
      <PKMNHeader
        pkmnID={props.id}
        name={props.name}
      />
        <div className="stats flex column">
          <div>{props.genus}</div>
          <div>
            <strong>color</strong> -
            <button
              onClick={() => props.setSorting('color', props.color)}
            >
              {props.color}
            </button>
          </div>
          <div>
            <strong>shape</strong> -
            <button
              onClick={() => props.setSorting('shape', props.shape)}
            >
              {props.shape}
            </button>
          </div>
          <div>
            <strong>egg{props.egg2 ? `s` : null}</strong> -
            <button onClick={() => props.setSorting('eggGroups',props.egg1)}>
              {props.egg1}
            </button>
            <button
              onClick={() => props.setSorting('eggGroups', props.egg2)}
              className={props.egg2 ? "show" : "hide"}
            >
              {props.egg2}
            </button>
          </div>
          <div>"{props.flavorText}"</div>
        </div>
      </div>
   )
}