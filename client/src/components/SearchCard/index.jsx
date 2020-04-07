import React, { Component } from "react";
import axios from "axios";

export default class SearchCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: "hushbringer",
      cardData: "",
      textAreaContent: "",
      link: "#",
      button: "Build Deck",
      message: "Not Ready Yet",
    };
    this.seachThisCardName = this.seachThisCardName.bind(this);
  }

  seachThisCardName = () => {
    let deckName = this.state.textAreaContent
      .slice(
        this.state.textAreaContent.indexOf("Deck: ") + 6,
        this.state.textAreaContent.indexOf(".dec")
      )
      .trim()
      .replace(/ /g, "_")
      .toLowerCase();

    this.setState({ button: "loading..." });

    axios
      .post("/builder", {
        cardName: this.state.cardName,
        deck: this.state.textAreaContent,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          cardData: res.data,
        });
        this.setState({
          link: res.data.url,
          message: "Visit My Deck Page",
          button: "Build Deck",
        });
      })
      .catch((err) => {
        this.setState({
          link: `https://mtgchad.herokuapp.com/deck/${deckName}`,
          button: "Build Deck",
          message: "Click here to visit Card Sheet",
        });
      });
  };

  inputChange = (event) => {
    this.setState({
      cardName: event.target.value,
    });
  };

  textAreaChange = (event) => {
    this.setState({
      textAreaContent: event.target.value,
    });
  };

  render() {
    return (
      <div className="search_card_root" style={searchCardRoot}>
        <p>Enter a Card name here and click Build to see that card.</p>
        <input
          type="text"
          onChange={this.inputChange}
          placeholder="Card Name"
          style={inputStyle}
        />
        <p>Paste iOS version of Deck Builder content here then click Build.</p>
        <textarea
          name="card_input"
          id=""
          cols=""
          rows="20"
          style={{ width: "100%" }}
          onChange={this.textAreaChange}
        ></textarea>
        <div className="btn" onClick={this.seachThisCardName} style={btn}>
          {this.state.button}
        </div>
        <br />
        <img src={this.state.cardData} alt="a magic card" style={imgStyle} />
        <br />
        <br />
        <a href={this.state.link} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
          <div style={aTag}>{this.state.message}</div>
        </a>
        <br />
      </div>
    );
  }
}

////// style

const btn = {
  color: "#ffffff",
  fontFamily: "'Open Sans', sans-serif",
  backgroundColor: "#3498db",
  padding: "1em",
  margin: "2px",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  userSelect: "none",
};

const searchCardRoot = {
  maxWidth: "99%",
  fontFamily: "'Open Sans', sans-serif",
  margin: "auto",
};

const imgStyle = {
  width: "100%",
  maxWidth: "256px",
  fontFamily: "'Open Sans', sans-serif",
};

const inputStyle = {
  width: "100%",
  height: "2em",
  fontFamily: "'Open Sans', sans-serif",
  margin: "2px",
};

const aTag = {
    padding: "1em 0",
    backgroundColor: "#2ecc71",
    color: "#ffffff",
    textAlign: "center"
}
