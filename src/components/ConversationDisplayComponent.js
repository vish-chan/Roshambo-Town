import React, { Component } from 'react';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../helpers/constants';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return({
        dialog: state.dialog,
    });
}

const FONT_ANIMATION = 50;

class Dialog extends Component {


    constructor(props) {
        super(props);
        this.animateConversation = this.animateConversation.bind(this);
    }

    animateConversation(speakerIdx, name, content, idx, objref) {
        
        function animate() {
            if(idx>content.length) {
                return;
            }
            if(speakerIdx!==this.props.speakerIdx) {
                if(speakerIdx===0) {
                    objref.innerHTML = name + ": " + content;
                    return;
                } else {
                    objref.innerHTML = "";
                    return;
                }
            }
            objref.innerHTML = name + ": " + content.substring(0, idx);
            idx++;
            setTimeout(boundanimate, FONT_ANIMATION);
        }
        const boundanimate = animate.bind(this);
        boundanimate();
    }

    cleanBoard() {
        this.p1.innerHTML = "";
        this.p2.innerHTML = "";
    }

    componentDidUpdate() {
        if(this.props.isOpen) {
            if(this.props.speakerIdx===0) {
                const person = this.props.person1;
                this.cleanBoard();
                this.animateConversation(0, person.name, person.dialogs[this.props.dialogIdx], 1, this.p1);
            } else {
                const person = this.props.person2;
                this.animateConversation(1, person.name, person.dialogs[this.props.dialogIdx], 1, this.p2);
            }
        }
    }

    render() {
        const style = {
            position: 'absolute',
            border: '5px solid white',
            width: VIEWPORT_WIDTH - 10,
            height: 200,
            padding: '5px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '20px',
            fontFamily: 'gameboy',
            display: this.props.isOpen? 'block': 'none',
            top: this.props.position==="top"? 0: VIEWPORT_HEIGHT - 220,
        };

        return(
            <div style={style}>
                <p ref={p1 => this.p1 = p1}></p>
                <p ref={p2 => this.p2 = p2}></p>
            </div>
        );
    }
}

class ConversationDisplay extends Component {
    render() {

        const dialog = this.props.dialog;
        return(
            <Dialog isOpen={dialog.isOpen}
                    position={dialog.position}
                    person1={dialog.person1}
                    person2={dialog.person2}
                    dialogIdx={dialog.dialogIdx}
                    speakerIdx={dialog.speakerIdx}
            />
        );
    }
}



export default connect(mapStateToProps)(ConversationDisplay);