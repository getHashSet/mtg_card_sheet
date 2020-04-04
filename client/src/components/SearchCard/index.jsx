import React, { Component } from 'react'
import axios from 'axios';

export default class SearchCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cardName: "hushbringer",
             cardData: "/hush.jpg"
        }
    }

    seachThisCardName = () => {
        console.log("seaching.");

        axios({
            method: 'get',
            url: `https://api.scryfall.com/cards/named?fuzzy=${this.state.cardName.toLowerCase().trim().replace(/ /g, "+")}`,
        })
        .then(scryfallData => {
            console.log(scryfallData.data)
            this.setState({
                cardData: scryfallData.data.image_uris.large
            });

        })
        .catch(err => {
            console.log('error');
            alert('No card found.');
        });
    };

    inputChange = (event) => {
        this.setState({
            cardName: event.target.value
        });
    };
    
    render() {
        return (
            <div className="search_card_root" style={searchCardRoot}>
            <input type="text" onChange={this.inputChange} placeholder="Card Name" style={inputStyle}/>
            <div className="btn" onClick={this.seachThisCardName} style={btn}>Search Card</div>
            <img src={this.state.cardData} alt="a magic card" style={imgStyle}/>
        </div>
        )
    }
}

////// style 

const btn = {
    color: "#ffffff",
    backgroundColor: "#3498db",
    padding: "1em",
    margin: "2px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    userSelect: "none"
}

const searchCardRoot = {
    maxWidth: "500px"
}

const imgStyle = {
    width: "100%"
}

const inputStyle = {
    width: "100%",
    height: "2em",
    margin: "2px"
}