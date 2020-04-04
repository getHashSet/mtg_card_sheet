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
            url: `https://api.scryfall.com/cards/named?fuzzy=${this.state.cardName}`,
        })
        .then(scryfallData => {
            console.log(scryfallData.data)
            this.setState({
                cardData: scryfallData.data.image_uris.large
            });

        })
        .catch(err => {
            console.log('error');
        });
    };

    inputChange = (event) => {
        this.setState({
            cardName: event.target.value
        });
    };
    
    render() {
        return (
            <div className="search_card_root">
            <input type="text" onChange={this.inputChange} placeholder="Card Name"/>
            <div className="btn" onClick={this.seachThisCardName}>Search Card</div>
            <img src={this.state.cardData} alt="a magic card" />
        </div>
        )
    }
}
