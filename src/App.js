import './App.css';
import React from 'react';
import sound from './Alarm-ringtone.mp3';

const BreakLength = (props) => {
  return (
    <div className='break'>
      <h2 className='number'>Break Length</h2>
      <h2 className='button up' id='breakUp' onClick={props.handleUp}>+</h2>
      <h2 className='numbers'>{props.break}</h2>
      <h2 className='button down' id='breakDown' onClick={props.handleDown}>-</h2>
    </div>
  )
}

const SessionLength = (props) => {
  return (
    <div className='session'>
      <h2 className='number'>Session Length</h2>
      <h2 className='button up' id='sessionUp' onClick={props.handleUp}>+</h2>
      <h2 className='numbers'>{props.session}</h2>
      <h2 className='button down' id='sessionDown' onClick={props.handleDown}>-</h2>
    </div>
  )
}

const Display = (props) => {
  let className = 'numbers';
  if (props.minute<=1){
    className+=' alert';
  }
  return (
    <div className='display'>
      <h2>{props.title}:</h2>
      <h2 className={className}>
        {props.minute < 10 ? '0'+props.minute : props.minute}
        :
        {props.second < 10 ? '0'+ props.second : props.second}
      </h2>
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'Session',
      break: 5,
      session: 25,
      timer: 0,
      ID: null,
      running: false
    };
  };
  componentDidMount = () => {
    this.setState({
      timer: this.state.session * 60
    });
  };
  handleUpSession = () => {
    if (this.state.running===false) {
      this.setState({
        session: this.state.session + 1,
        timer: (this.state.session+1) * 60
      })
    }
  };
  handleUpBreak = () => {
    this.setState({
      break: this.state.break + 1,
    })
  };
  handleDownSession = () => {
    if (!this.state.running) {
      this.setState({
        session: this.state.session > 1 ? this.state.session - 1 : this.state.session,
        timer: this.state.session > 1 ? (this.state.session-1) * 60 : this.state.session*60
      })
    }
  };
  handleDownBreak = () => {
    this.setState({
      break: this.state.break > 1 ? this.state.break - 1 : this.state.break,
    })
  };
  handleCountDownStart = () => {
    this.setState({
      ID: setInterval(() => {
        this.setState({
          timer: this.state.timer - 1
        });
        if (this.state.title === 'Session' && this.state.timer === 0){
          this.setState({
            running: false,
            title: 'Break',
            timer: this.state.break * 60
          });
          const audio = new Audio(sound);
          audio.play();
        } else if (this.state.title === 'Break' && this.state.timer === 0){
          clearInterval(this.state.ID);
          this.setState({
            running: false,
            title: 'Session',
            timer: this.state.session * 60
          })
        }
      }, 1000),
      running: true
    });
  };
  handleCountDownStop = () => {
    clearInterval(this.state.ID);
    this.setState({running:false})
  };
  handleRestart = () => {
    clearInterval(this.state.ID);
    this.setState({
      title: 'Session',
      running: false,
      timer: this.state.session*60
    });
  };

  handleClick = () => {
    if (this.state.title === 'Session' && this.state.running === false) {
      this.handleCountDownStart()
    } else if (this.state.title === 'Session' && this.state.running === true){
      this.handleCountDownStop()
    }
  };
  render() {
    return (
      <div>
      <div className='App'>
        <h1>Pomodoro Timer!</h1>
        <div className='settings'>
          <BreakLength handleUp={this.handleUpBreak.bind(this)} handleDown={this.handleDownBreak.bind(this)} break={this.state.break}/>
          <SessionLength handleUp={this.handleUpSession.bind(this)} handleDown={this.handleDownSession.bind(this)} session={this.state.session}/>
        </div>
        <Display title={this.state.title} minute={Math.floor(this.state.timer/60)} second={this.state.timer%60}/>
        <div className='buttons'>
          <h2 className='button' id='play' onClick={this.handleClick.bind(this)}>play/pause</h2>
          <h2 className='button' id='restart' onClick={this.handleRestart.bind(this)}>restart</h2>
        </div>
      </div>
      <div className='credits'>
        <p>Designed and coded by Abay Nurpeissov</p>
      </div>
      </div>
    );
  }
}


export default App;
