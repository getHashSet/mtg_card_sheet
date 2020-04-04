import React, { Component } from 'react'
import axios from 'axios';

export default class SearchCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cardName: "hushbringer",
             cardData: ""
        }
    }

    seachThisCardName = () => {

        axios({
            method: "POST",
            url: "/card",
            body: { cardName: this.state.cardName }
        })
        .then(res => {
            this.setState({
                cardData: res.data
            })
        })
        .catch(err => {
            console.error(err);
        })
        
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
            <textarea name="card_input" id="" cols="" rows="30" style={{width: "100%"}}></textarea>
            <div className="btn" onClick={this.seachThisCardName} style={btn}>Give me the blocks</div>
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