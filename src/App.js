import './App.css';
import React from 'react';

const BreakTimer = (props) => {
  return (
    <div className='break'>
      <h1>Break Length</h1>
      <p>^</p>
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='App'>
        <h1>Hello World!</h1>
        <BreakTimer />
      </div>
    );
  }
}


export default App;
