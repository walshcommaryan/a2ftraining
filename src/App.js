import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as DownIcon} from './icons/down.svg'
import { ReactComponent as BookIcon} from './icons/book.svg'
import { ReactComponent as WeightIcon} from './icons/dumbell.svg'
import { ReactComponent as PrayerIcon} from './icons/prayer.svg'
import { ReactComponent as BookClubIcon} from './icons/bookClub.svg'
import { ReactComponent as BackArrowIcon} from './icons/back-arrow.svg'

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
Amplify.configure(awsconfig);

var createReactClass = require('create-react-class');

function App() {
  return (
    <Scoreboard></Scoreboard>
  );
}

export default App;


const INITIAL_STATE = {
  players: [
  ],
}


class Scoreboard extends React.Component {

  constructor() {
    super();
    this.state = JSON.parse(window.localStorage.getItem('state')) || INITIAL_STATE;
  }

  componentDidMount(){
    console.log("fetching players")
    this.getPlayers();
    console.log("players fetched: \n", this.state.players);
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  onScoreChange (index, delta) {
    this.state.players[index].score = this.state.players[index].score + delta;
    this.updatePlayerScore(index);
  }

  async getPlayers() {
    const result = await API.graphql(graphqlOperation(queries.listPlayers));
    var players = result.data.listPlayers.items.filter(player => player._deleted !== true);
    this.state.players = players;
    this.setState(this.state);
    return result
  }

  async addPlayer(name) {

    const player = {
      name: name,
      score: 0
    };
  
    const result = await API.graphql({query: mutations.createPlayer, variables: {input: player}});
    console.log(result);
    this.state.players.push({ 
      id: result.data.createPlayer.id, 
      name: name, 
      score: 0, 
      _version: result.data.createPlayer._version
    });

    this.setState(this.state);
    return result
  }

  async updatePlayerScore(index) {

    var version = this.state.players[index]._version

    var player = {
      id: this.state.players[index].id,
      score: this.state.players[index].score,
      _version: version
    };
  
    const result = await API.graphql({query: mutations.updatePlayer, variables: {input: player}});
    console.log(result);

    this.state.players[index]._version = result.data.updatePlayer._version;
    this.setState(this.state);
    return result
  }

  async removePlayer(index) {

    var id = this.state.players[index].id
    var version = this.state.players[index]._version

    var player = {
      id: id,
      _version: version
    };
  
    const result = await API.graphql({query: mutations.deletePlayer, variables: {input: player}});
    console.log(result);
    this.state.players.splice(index, 1);
    this.setState(this.state);
    return result
  }

  onAddPlayer (name) {
    this.addPlayer(name);
  }

  onRemovePlayer (index) {
    this.removePlayer(index);
  }

  render () {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} 
        />
        <div className="players">
          {this.state.players.map(function(player, index) {
             return (
               <Player
                 name={player.name}
                 score={player.score}
                 key={player.name}
                 onScoreChange={(delta) => this.onScoreChange(index, delta)}
                 onRemove={() => this.onRemovePlayer(index)}
               />
             );
           }.bind(this))}
        </div>
        <AddPlayerForm onAdd={(name) =>this.onAddPlayer(name)} />
      </div>
    );
  }
}

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} time={props.second} />
      <h1>Scoreboard</h1>
      {/* <Stopwatch /> */}
    </div>
  );
}

Header.propTypes = {
  players: PropTypes.array.isRequired,
};

function Stats(props) {
  const playerCount = props.players.length;
  var timeElapsed = JSON.parse(window.localStorage.getItem('time_state'));
  var totalPlayerPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  timeElapsed = timeElapsed === null ? 0 : timeElapsed['seconds']
  var totalPoints = totalPlayerPoints - Math.round(timeElapsed/60);
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playerCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
        <tr>
          <td>Time Elapsed</td>
          <td><Stopwatch /></td>
        </tr>
      </tbody>

    </table>
  )
}

Stats.propTypes = {
  players: PropTypes.array.isRequired,
};

const TIME_STATE = {
  elapsedTime: 0,
  previousTime: new Date("12/14/2021 18:30:00"),
  seconds: 0
}

class Stopwatch extends React.Component {

  constructor() {
    super();
    this.state = TIME_STATE;
    window.localStorage.setItem('time_state', JSON.stringify(this.state));
  }

  setState(state) {
    window.localStorage.setItem('time_state', JSON.stringify(state));
    super.setState(state);
  }

  componentDidMount() {
    // this.state = JSON.parse(window.localStorage.getItem('time_state')) || TIME_STATE;
    this.interval = setInterval(
        (function(self) {     //Self-executing func which takes 'this' as self
            return function() {    //Return a function in the context of 'self'
                  self.onTick();   //Thing you wanted to run as non-window 'this'
              }
        })(this),
    this.INTERVAL     //normal interval, 'this' scope not impacted here.
    ); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick() {
    var now = Date.now();
    // console.log(this.getTime())
    this.state.elapsedTime = this.state.elapsedTime + (now - this.state.previousTime);
    this.state.previousTime = Date.now();
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    this.state.seconds = seconds;
    this.setState(this.state);
  }


  render() {

    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
  
      var hDisplay = h + ":";
      var mDisplay = m + ":";
      var sDisplay = s;
      return hDisplay + mDisplay + sDisplay; 
    }

    var seconds = this.state.seconds;
    return (
      <div>
        {/* <h2>Stopwatch</h2> */}
        <div className="stopwatch-time"> {secondsToHms(seconds)} </div>
      </div>
    )
  }
};

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>???</a>
        {props.name}
      </div>
      <NavItem icon={<DownIcon />} >
        
        <DropdownMenu />

      </NavItem>
      <div className="player-score">
        <Counter onChange={props.onScoreChange} score={props.score} />
      </div>
    </div>
  );
}

function NavItem(props) {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  
  function DropdownItem(props) {
    return(
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );

  }

  return (
    <div className="dropdown" style={{ height: menuHeight}}>
      <CSSTransition 
      in={activeMenu === 'main'} 
      unmountOnExit
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
      >
        <div className="menu">

          <DropdownItem leftIcon={<BookIcon />} rightIcon={"Reading"} goToMenu="reading"></DropdownItem>
          <DropdownItem leftIcon={<WeightIcon />} rightIcon={"Exercise"} goToMenu="exercise"></DropdownItem>
          <DropdownItem leftIcon={<PrayerIcon />} rightIcon={"Prayer"} goToMenu="prayer"></DropdownItem>
          <DropdownItem leftIcon={<BookClubIcon />} rightIcon={"Book Club"} goToMenu="bookClub"></DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition 
        in={activeMenu === 'reading'} 
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        >
          <div className="menu">

            <DropdownItem leftIcon={<BackArrowIcon />} goToMenu="main"></DropdownItem>

          </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'exercise'} 
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        >
          <div className="menu">

            <DropdownItem leftIcon={<BackArrowIcon />} goToMenu="main"></DropdownItem>

          </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'prayer'} 
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        >
          <div className="menu">

            <DropdownItem leftIcon={<BackArrowIcon />} goToMenu="main"></DropdownItem>

          </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'bookClub'} 
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        >
          <div className="menu">

            <DropdownItem leftIcon={<BackArrowIcon />} goToMenu="main"></DropdownItem>

          </div>
      </CSSTransition>
      
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
};

function Counter(props) {
  return (
    <div className="counter" >
      <button className="counter-action decrement" onClick={() => props.onChange(-100)}>
        -
      </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={() => props.onChange(100)}>
        +
      </button>
    </div>
  );
}

Counter.propTypes = {
  onChange: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
}


const AddPlayerForm = createReactClass({
  propTypes: {
    onAdd: PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return { name: "" };
  },

  onNameChange: function (e) {
    const name = e.target.value;
    this.setState({ name: name });
  },

  onSubmit: function (e) {
    if (e) e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: "" });
  },

  render: function () {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Player Name"
          />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
  
});
ReactDOM.render(<Scoreboard />, document.getElementById('root'));