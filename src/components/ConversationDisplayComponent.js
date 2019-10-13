import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getKeyDiv } from '../helpers/funcs';

const mapStateToProps = (state) => {
    return({
        dialog: state.dialog,
    });
}

const FONT_ANIMATION = 25;

class Dialog extends Component {


    constructor(props) {
        super(props);
        this.animateConversation = this.animateConversation.bind(this);
        this.timeout = null;
    }

    animateConversation(speakerIdx, name, content, idx, objref) {
        
        const animate = function() {
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
            this.timeout = setTimeout(animate, FONT_ANIMATION);
        }.bind(this);
        animate();
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

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {

        let POS = {};
        if(this.props.position==="top") {
            POS["top"] = 0;
        } else {
            POS["bottom"] = 0;
        }

        const style = {
            position: 'absolute',
            borderTop: '5px solid white',
            borderBottom: '5px solid white',
            width: '100%',
            height: 200,
            padding: '10px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '20px',
            fontFamily: 'gameboy_lg',
            display: this.props.isOpen? 'block': 'none',
            overflowWrap: 'break-word',
            ...POS,
        };

        return(
            <div id="conversation" style={style}>
                <div style={{position:"relative", width:'100%', height:'100%'}}>
                    <p ref={p1 => this.p1 = p1}></p>
                    <p ref={p2 => this.p2 = p2}></p>
                    <div className='blink' style={{position:'absolute', right:20, bottom:20}}>{getKeyDiv("SPACE")}</div>
                </div>
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