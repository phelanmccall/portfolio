const secret = "Secret";
const backgrounds = [
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "yellow",
  "teal",
  "orange",
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "yellow",
  "orange",
  "teal"


];

function shuffle(OLDarray) {
  var array = [...OLDarray];
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyChar: props.keyChar,
      source: props.source,
      id: props.id
    }
  }


  render() {
    return (
      <div
        className="drum-pad"
        id={this.state.id}
        onClick={() => {
          if (this.props.on) {
            let sound = document.getElementById(this.state.keyChar);
            sound.load();
            sound.play();
            document.getElementById(
              "display"
            ).innerHTML = sound.parentElement.id.replace(/-/g, " ");
          }
        }}
      >
        <audio className="clip" src={this.state.source} id={this.state.keyChar} />
        {this.state.keyChar}
      </div>
    );
  }
};


class DrumSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      on: false,
      parts: [
        {
          id: "hi-hat",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
          keyChar: "Q"
        },
        {
          id: "crash-1",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
          keyChar: "W"
        }, {
          id: "crash-2",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
          keyChar: "E"
        },
        {
          id: "snare",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
          keyChar: "A"
        },

        {
          id: "chord-1",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
          keyChar: "S"
        },
        {
          id: "chord-2",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
          keyChar: "D"
        },
        {
          id: "chord-3",
          source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
          keyChar: "Z"
        },
        {
          id: "bass-1",
          source: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
          keyChar: "X"
        },

        {
          id: "bass-2",
          source: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
          keyChar: "C"
        }

      ]
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.power = this.power.bind(this);
  }

  handleKeyPress(e) {

    if (e.keyCode && this.state.on) {
      let sound = document.getElementById(String.fromCharCode(e.keyCode));
      document.getElementById(
        "display"
      ).innerHTML = sound.parentElement.id.replace(/-/g, " ");
      sound.load();
      sound.play();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  power(e) {
    if (this.state.on) {
      e.target.className = "btn btn-danger"
    } else {
      e.target.className = "btn btn-success"
    }
    this.setState({
      on: !this.state.on
    })
  }

  render() {
    return (

      <div id="drum-machine" className="p-3">
        <h1 id="display">default</h1>
        <button className="btn btn-danger" onClick={this.power}><i className="fas fa-power-off"></i></button>
        
          <div className="row pl-3">
          {
            this.state.parts.map((part, index) => {

              return (<DrumPad
                key={index}
                id={part.id}
                source={part.source}
                keyChar={part.keyChar}
                on={this.state.on}
              />)

            })
          }

      </div>
      </div>
    );
  }
}


class Card extends React.Component {



  render() {
    return <div id={this.props.bg} className="btn border border-light" style={this.props.picked || this.props.matched ? { background: this.props.background } : { background: "grey" }}></div>


  }


}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pick1: null,
      pick2: null,
      matched: ["test"],
      maxMatches: backgrounds.length / 2,
      matches: 0,
      backgrounds: shuffle(backgrounds).map((bg, index) => {
        return {
          hash:
            CryptoJS.AES.encrypt(bg, secret), bg: bg
        };
      })
    }

    this.handleClick = this.handleClick.bind(this);
    this.determineMatch = this.determineMatch.bind(this);
    this.reset = this.reset.bind(this);
  }


  determineMatch() {
    if (this.state.pick1 && this.state.pick2) {
      var p1 =
        CryptoJS.AES.decrypt(this.state.pick1, secret).toString();
      var p2 =
        CryptoJS.AES.decrypt(this.state.pick2, secret).toString();

      if (p1 === p2) {

        try {
          this.setState({
            pick1: null,
            pick2: null,
            matched: [...this.state.matched, this.state.pick1, this.state.pick2],
            matches: this.state.matches + 1
          }, () => {
            if (this.state.matches >= this.state.maxMatches) {
              this.reset();
            }
          });
        } catch (err) {
          console.log("MATCH ERR")
        }
      } else {

        try {
          this.setState({
            pick1: null,
            pick2: null,
          })
        } catch (err) {
          console.log("set ERR")
        }
      }

    }

  }

  handleClick(e) {
    e.preventDefault();
    console.log("U2FsdGVkX1/GoY76pT589vwdqcRvG1IvwxHO9KVX2rI=".length)
    if (!this.state.matched.includes(e.target.id) && e.target.id.length < 32)
      if (this.state.pick1 === null) {
        this.setState({ pick1: e.target.id });
      } else if (this.state.pick2 === null && this.state.pick1 !== e.target.id) {
        this.setState({ pick2: e.target.id }, () => { setTimeout(this.determineMatch, 1000) });

      }
  }

  reset() {

    this.setState({
      pick1: null,
      pick2: null,
      matched: [],
      maxMatches: backgrounds.length / 2,
      matches: 0,
      backgrounds: shuffle(backgrounds).map((bg, index) => {
        var test = {
          hash:
            CryptoJS.AES.encrypt(bg, secret), bg: bg
        };
        return test;
      })
    })
  }




  render() {
    return (
      <div id="memory-game" className="App">

        <header className="App-header row bg-light border border-dark">
          <h1 className="text-dark m-auto"> MEMORY </h1>

          <button id="resetBtn" className="btn btn-danger" onClick={this.reset}>RESET</button>

        </header>


        <div className="col-12" onClick={this.handleClick}>
          {

            this.state.backgrounds.map(((bg, index) => {

              return <Card key={index} bg={bg.hash.toString()} picked={this.state.pick1 === bg.hash.toString() || this.state.pick2 === bg.hash.toString()} matched={this.state.matched.includes(bg.hash.toString())}
                background={bg.bg} />
            }))
          }

        </div>






      </div>
    );
  }
}

class App extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="portfolio-item col-sm-12 col-md-5 col-xl-4 m-auto">

          <DrumSet />
          <h5 className="p-3 text-center" style={{ "left": "5.5%", "right": " 5%" }}>
            <p className="item-title">Drum Machine (React app)<br />
              <small>uses html auido <a className="btn btn-dark text-light" href="https://codepen.io/mougatrah/pen/JaNzPa"
                target="_blank">
                <i className="fab fa-codepen"></i></a></small>
            </p>

          </h5>
        </div>
        <div className="portfolio-item col-sm-12 col-md-5 col-xl-4 m-auto">

          <MemoryGame />

          <h5 className="p-3 text-center" style={{ "left": "5.5%", "right": " 5%" }}>
            <p className="item-title">Memory Game (React app)<br />
              <small>classic memory card game <a className="btn btn-dark text-light" href="https://github.com/mougatrah/memory"
                target="_blank">
                <i className="fab fa-github"></i></a></small>
            </p>

          </h5>
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("react-demo"))