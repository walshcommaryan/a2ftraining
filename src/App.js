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

var createReactClass = require('create-react-class');

function App() {
  return (
    <Scoreboard></Scoreboard>
  );
}

export default App;


const INITIAL_STATE = {
  players: [
    {
      name: "Ryan Walsh",
      score: 31,
    },
    {
      name: "Leslie Walsh",
      score: 40,
    },
  ],
}


const Scoreboard = createReactClass({
  getInitialState: function () {
    return INITIAL_STATE;
  },

  onScoreChange: function (index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onAddPlayer: function (name) {
    this.state.players.push({ name: name, score: 0 });
    this.setState(this.state);
  },

  onRemovePlayer: function (index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function () {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
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
        <AddPlayerForm onAdd={this.onAddPlayer} />
      </div>
    );
  }
});

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
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
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

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

const Stopwatch = createReactClass({
  getInitialState: function () {
    return ({
      running: true,
    });
  },

  componentDidMount: function () {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
    this.interval = setInterval(this.onTick);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  onTick: function () {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: Date.now(),
      });
    }
  },

  render: function () {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div>
        {/* <h2>Stopwatch</h2> */}
        <div className="stopwatch-time"> {seconds} </div>
        {/* { this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button> */}
      </div>
    )
  }
});

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
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

          <DropdownItem leftIcon={<BookIcon />} rightIcon={"Reading"} goToMenu="secondary"></DropdownItem>
          <DropdownItem leftIcon={<WeightIcon />} rightIcon={"Exercise"}></DropdownItem>
          <DropdownItem leftIcon={<PrayerIcon />} rightIcon={"Prayer"}></DropdownItem>
          <DropdownItem leftIcon={<BookClubIcon />} rightIcon={"Book Club"}></DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'secondary'} 
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
      <button className="counter-action decrement" onClick={() => props.onChange(-1)}>
        -
      </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={() => props.onChange(1)}>
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