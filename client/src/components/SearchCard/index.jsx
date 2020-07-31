import React, { Component } from "react";
import axios from "axios";

axios.defaults.timeout = 50000;

export default class SearchCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: "hushbringer",
      cardData:
        "https://img.scryfall.com/cards/normal/front/7/2/7220aaa0-c457-4067-b1ff-360b161c34e5.jpg?1562850134",
      textAreaContent: "",
      link: "https://img.scryfall.com/cards/normal/front/7/2/7220aaa0-c457-4067-b1ff-360b161c34e5.jpg?1562850134",
      button: "Build Deck",
      message: "Not Ready Yet",
      cardBack: `manaleaks.com/back`,
      chadsRequest: "manaleaks.com/tron",
      deckName: "",
    };
    this.seachThisCardName = this.seachThisCardName.bind(this);
  }

  seachThisCardName = () => {
    let deckName;
    if (this.state.deckName !== null && this.state.deckName !== "") {
      deckName = this.state.deckName;
    } else {
      deckName = this.state.textAreaContent
      .slice(
        this.state.textAreaContent.indexOf("Deck: ") + 6,
        this.state.textAreaContent.indexOf(".dec")
      )
      .trim()
      .replace(/ /g, "_")
      .toLowerCase();
    }

    this.setState({ button: "loading..." });

    axios
      .post("/builder", {
        cardName: this.state.cardName,
        deck: this.state.textAreaContent,
      }, { timeout: 100000 })
      .then((res) => {

        let theLink = res.data.url 
        ? res.data.url
        : res.data;

        this.setState({
          link: theLink,
          message: "Visit My Deck Page",
          button: "Build Deck",
          chadsRequest: `https://manaleaks.com/deck/${deckName}`,
          cardBack: `manaleaks.com/back`,
          cardData: theLink
        });
      })
      .catch((err) => {
        this.setState({
          link: `https://manaleaks.com/deck/${deckName}`,
          button: "Build Deck",
          message: "Click here to visit Card Sheet",
          chadsRequest: `manaleaks.com/deck/${deckName}`,
          cardBack: `manaleaks.com/back`,
          cardData: `https://manaleaks.com/deck/${deckName}`
        });
      });
  };

  inputChange = (event) => {
    this.setState({
      cardName: event.target.value,
    });
  };

  deckNameChange = (event) => {
    this.setState({
      deckName: event.target.value,
    })
  }

  textAreaChange = (event) => {
    this.setState({
      textAreaContent: event.target.value,
    });
  };

  render() {
    return (
      <div className="search_card_root" style={searchCardRoot}>

        {/* <p>Enter a Card name here and click Build to see that card.</p> */}

        {/* <input
          type="text"
          onChange={this.inputChange}
          placeholder="Card Name"
          style={inputStyle}
        /> */}

        <h1>Card Sheet Builder</h1>
        <input 
        type="text"
        placeholder="Deck Name"
        onChange={this.deckNameChange}
        style={inputStyle}
        />

        <p>Paste mobile version of Deck Builder content here then click Build.</p>

        <textarea
          name="card_input"
          id=""
          cols=""
          rows="20"
          style={{ width: "98%" }}
          onChange={this.textAreaChange}
          placeholder="Copy From Decked App on Mobile"
        ></textarea>
        
        <div id="build_button" className="btn" onClick={this.seachThisCardName} style={btn}>
          {this.state.button}
        </div>

        <div className="img_wrap">
            <a href={this.state.link} target="_blank" rel="noopener noreferrer">
                <img src={this.state.cardData} alt="a magic card" style={imgStyle} />
            </a>
        </div>

        <a
          href={this.state.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={aTag}>{this.state.message}</div>
        </a>
        <br />

        <h3>URL will update below with deck builds.</h3>
        <p>{this.state.chadsRequest}</p>

        <h3>Card Back</h3>
        <p>{this.state.cardBack}</p>
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
  width: "90%",
  height: "2em",
  fontFamily: "'Open Sans', sans-serif",
  margin: "2px 0",
};

const aTag = {
  padding: "1em 0",
  backgroundColor: "#2ecc71",
  color: "#ffffff",
  textAlign: "center",
};
