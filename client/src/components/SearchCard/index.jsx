import React, { Component } from 'react'
import axios from 'axios';

export default class SearchCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cardName: "hushbringer",
             cardData: "",
             textAreaContent: "",
             link: "#",
             button: "Build Deck",
             message: "Not Ready Yet"
        }
        this.seachThisCardName = this.seachThisCardName.bind(this);
    }

    seachThisCardName = () => {

        this.setState({button: "loading..."})

        axios.post( "/builder", {
            cardName: this.state.cardName,
            deck: this.state.textAreaContent
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                cardData: res.data
            })
            this.setState({link: res.data.url, message: "Visit My Deck Page", button: "Build Deck"})
        })
        .catch(err => {
            this.setState({button: "Build Deck"})
        })
        
    };

    inputChange = (event) => {
        this.setState({
            cardName: event.target.value
        });
    };
    
    textAreaChange = (event) => {
        this.setState({
            textAreaContent: event.target.value
        });
    };

    render() {
        return (
            <div className="search_card_root" style={searchCardRoot}>
            <input type="text" onChange={this.inputChange} placeholder="Card Name" style={inputStyle}/>
            <textarea name="card_input" id="" cols="" rows="30" style={{width: "100%"}} onChange={this.textAreaChange}></textarea>
        <div className="btn" onClick={this.seachThisCardName} style={btn}>{this.state.button}</div>
            <img src={this.state.cardData} alt="a magic card" style={imgStyle}/>
        <a href={this.state.link} target="_blank" rel="noopener noreferrer">{this.state.message}</a>
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