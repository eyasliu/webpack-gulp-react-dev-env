import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Main from './components/Main';


export default class People extends React.Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main />
      </div>

    )
  }
}
