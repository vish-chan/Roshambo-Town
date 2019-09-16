import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStatetoProps = state => {
    return({
        battle: state.battle,
    })
}

class Battle extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="battle"></div>
        );
    }
}

export default connect(mapStatetoProps)(Battle);