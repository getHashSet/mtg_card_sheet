import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchCard from '../../components/SearchCard';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <SearchCard />
                <Footer />
            </div>
        )
    }
}
