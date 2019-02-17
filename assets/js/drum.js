

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
         if(this.props.on){
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
    if(this.state.on){
      e.target.className = "btn btn-danger"
    }else{
      e.target.className ="btn btn-success"
    }
    this.setState({
      on: !this.state.on
    })
  }

  render() {
    return (

      <div className="p-3">
        <h1 id="display">default</h1>
        <button className="btn btn-danger" onClick={this.power}><i className="fas fa-power-off"></i></button>
        <div className="ml-2">
          <div className="row">
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
      </div>
    );
  }
}

ReactDOM.render(<DrumSet />, document.getElementById("drum-machine"));


