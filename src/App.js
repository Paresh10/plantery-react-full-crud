import React, { Component } from 'react';
import './App.css';
import PlantContainer from './PlantContainer'

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <PlantContainer />
      </div>
    );

  }
}
