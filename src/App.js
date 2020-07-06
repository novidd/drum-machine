import React from "react";

const buttonData = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyData: buttonData,
      audioVol: 50,
    };
    this.playAudioOnClick = this.playAudioOnClick.bind(this);
    this.playAudioOnKeyDown = this.playAudioOnKeyDown.bind(this);
    this.changeVol = this.changeVol.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.playAudioOnKeyDown);

    const audioTag = this.state.keyData.map((item) => item.key);
    for (let i = 0; i < audioTag.length; i++) {
      document.getElementById(audioTag[i]).volume = this.state.audioVol / 100;
    }
  }
  componentWillMount() {
    document.removeEventListener("keydown", this.playAudioOnKeyDown);
  }
  playAudioOnClick(e) {
    e.target.children[0].play();
    document.getElementById("display").innerHTML = e.target.id;
  }
  playAudioOnKeyDown(e) {
    switch (e.keyCode) {
      case 81:
      case 87:
      case 69:
      case 65:
      case 83:
      case 68:
      case 90:
      case 88:
      case 67:
        const KEY_DATA = this.state.keyData
          .filter((item) => item.keyCode === e.keyCode)
          .map((item) => [item.key, item.id]);
        document.getElementById(KEY_DATA[0][0]).play();
        document.getElementById("display").innerHTML = KEY_DATA[0][1];
        return;
      default:
        return;
    }
  }
  changeVol(e) {
    this.setState({
      audioVol: e.target.value,
    });

    const audioTag = this.state.keyData.map((item) => item.key);
    for (let i = 0; i < audioTag.length; i++) {
      document.getElementById(audioTag[i]).volume = this.state.audioVol / 100;
    }
  }
  render() {
    const BUTTONS = this.state.keyData.map((item) => {
      return (
        <button
          onClick={this.playAudioOnClick}
          key={item.keyCode}
          id={item.id}
          className="drum-pad"
        >
          {item.key}
          <audio
            preload="auto"
            id={item.key}
            className="clip"
            src={item.src}
          ></audio>
        </button>
      );
    });

    return (
      <div id="drum-machine">
        <div id="buttons-wrapper">{BUTTONS}</div>
        <div id="dashboard">
          <div id="display-wrapper">
            <h2 id="display"></h2>
          </div>
          <input
            onChange={this.changeVol}
            type="range"
            value={this.state.audioVol}
          />
          <div id="volume-wrapper">
            <h2 id="volume">{this.state.audioVol}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
