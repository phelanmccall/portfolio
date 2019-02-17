  const DrumPad = props => {

    return (
      <div
        className="drum-pad"
        id={props.id}
        onClick={function() {
          let sound = document.getElementById(props.keyChar);
          sound.play();
          document.getElementById(
            "display"
          ).innerHTML = sound.parentElement.id.replace(/-/g, " ");
        }}
      >
        <audio className="clip" src={props.source} id={props.keyChar} />
        {props.keyChar}
      </div>
    );
  };
  
  class DrumSet extends React.Component {
    constructor(props) {
      super(props);
    }
  
    handleKeyPress(e) {
      console.log(e.keyCode);
  
      if (e.keyCode) {
        let sound = document.getElementById(String.fromCharCode(e.keyCode));
        document.getElementById(
          "display"
        ).innerHTML = sound.parentElement.id.replace(/-/g, " ");
        sound.play();
      }
    }
  
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
  
    render() {
      return (
        <div className="p-3">
          <h1 id="display">default</h1>
  
          <div id="container">
            <div className="row">
              <div className="col-xs-4">
                <DrumPad
                  id="hi-hat"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
                  keyChar="Q"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="crash-1"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
                  keyChar="W"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="crash-2"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
                  keyChar="E"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="snare"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
                  keyChar="A"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="chord-1"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
                  keyChar="S"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="chord-2"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
                  keyChar="D"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="chord-3"
                  source="https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
                  keyChar="Z"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="bass-1"
                  source="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
                  keyChar="X"
                />
              </div>
              <div className="col-xs-4">
                <DrumPad
                  id="bass-2"
                  source="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
                  keyChar="C"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<DrumSet />, document.getElementById("drum-machine"));

  
