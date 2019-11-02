import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getKeyDiv, getFontSize } from '../helpers/funcs';
import { isMobile } from 'react-device-detect';
import { HandleConversation } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return({
        dialog: state.dialog,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        handleConversation: () => { dispatch(HandleConversation()); },
    });
}

const FONT_ANIMATION = 25;

class Dialog extends Component {


    constructor(props) {
        super(props);
        this.animateConversation = this.animateConversation.bind(this);
        this.timeout = null;
        this.next = isMobile? "TAP": "SPACE";
    }

    animateConversation(speakerIdx, name, content, idx, objref) {
        
        const animate = function() {
            if(idx>content.length) {
                this.props.handleConversation();
                return;
            }
            if(speakerIdx!==this.props.speakerIdx) {
                if(speakerIdx===0 || speakerIdx===1) {
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
            } else if(this.props.speakerIdx===1) {
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
            height: '25%',
            border: '10px solid #00b4bc',
            left: 0,
            right: 0,
            borderRadius: '10px',
            padding: '5px',
            backgroundColor: '#f7f8f7',
            color: '#5d5f5b',
            fontSize: getFontSize(2),
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
                    <div className='blink' style={{position:'absolute', right:20, bottom:20}}>{getKeyDiv(this.next)}</div>
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
                    handleConversation={this.props.handleConversation}
            />
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ConversationDisplay);