import React, { Component } from 'react';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, EATABLE, HEALER, CURRENCY } from '../helpers/constants';

const InventoryItem = (props) => {

    const itemStyle = {
        color: 'white',
        fontSize: '10px',
        width: 100,
        height: 100,
    };

    const imageStyle = {
        width: props.self.type.width,
        height: props.self.type.height,
        backgroundImage: `url('${props.self.type.src}')`,
        backgroundPosition: `${props.self.type.srcpos[0]}px ${props.self.type.srcpos[1]}px`
    };

    return(
        <div style={itemStyle}>
            <div style={imageStyle}/>
        </div>
    );
}

function GetInventoryItemCounts() {

}


class Inventory extends Component {


    render() {
        const width = VIEWPORT_WIDTH-400, height = VIEWPORT_HEIGHT-200;

        const inventoryStyle = {
            position: 'absolute',
            width: width,
            height: height, 
            backgroundColor: 'black',
            border: '5px solid white',
            borderRadius: '20px',
            color: 'white',
            fontSize: "10px",
            padding: "5px",
            left: VIEWPORT_WIDTH/2 - width/2,
            top: VIEWPORT_HEIGHT/2 - height/2,
            zIndex: 5,
            display: this.props.isOpen? 'block' : 'none',
        };

        const eatableitems = this.props.items[EATABLE].map( item => <InventoryItem self={item} key={item.id}/>);
        const healeritems = this.props.items[HEALER].map( item => <InventoryItem self={item} key={item.id}/>); 
        const currencyitems = this.props.items[CURRENCY].map( item => <InventoryItem self={item} key={item.id}/>); 

        return(
                <div id="inventory" style={inventoryStyle}>
                    <div style={{ height: '50px', padding: '5px', display:'flex'}}>
                        <p style={{ width:'30%', fontSize: '30px', padding: '0px', margin:'0px'}}>{this.props.playername}</p>
                        <div style={{marginLeft:'auto', fontSize:'30px'}}>HELLO</div>
                    </div>
                    <div>
                        <ul>
                            {eatableitems}
                            {healeritems}
                            {currencyitems}
                        </ul>
                    </div>
                </div>
        );
    }
}

export default Inventory;
