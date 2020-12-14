import React from 'react';
import './HomePage.css'
import Header from "../../component/Header/Header";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'h1',
        }
    }

    render() {
        const {text} = this.state;
        return (
          <div>
            <h1>{text}</h1>
            <Header />
          </div>
        );
    }
}

export default HomePage;
