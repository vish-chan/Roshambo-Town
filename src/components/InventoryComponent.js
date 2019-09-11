import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, EATABLE, HEALER, CURRENCY } from '../helpers/constants';
import { GameObjects } from '../data/gameobjects';



function GetInventoryItemCounts(list) {
    let countObj = {}, item;
    for(item of list) {
        if(item.type.name in countObj)
            countObj[item.type.name]+=1;
        else
            countObj[item.type.name] = 1;
    }
    return countObj;
}

const mapStatetoProps = state => {
    return({
        inventory: state.inventory,
    })
}

const InventoryItem = (props) => {

    const itemStyle = {
        color: 'white',
        fontSize: '10px',
        textAlign: 'center',
        width: 100,
        height: 100,
    };

    const imageStyle = {
        width: props.self.width,
        height: props.self.height,
        backgroundImage: `url('${props.self.src}')`,
        backgroundPosition: `${props.self.srcpos[0]}px ${props.self.srcpos[1]}px`
    };

    return(
        <div style={itemStyle}>
            <div style={imageStyle}/>
            <p style={{fontSize: '20px',}}>{props.count}</p>
        </div>
    );
}


const InventoryRow = (props) => {

    const countObj = GetInventoryItemCounts(props.inventorylist);
    const validgameobjects = GameObjects.filter(gameobj => gameobj.type === props.type);

    const renderedgameobjects = validgameobjects.map( gameobj => <InventoryItem self={gameobj} key={gameobj.id} count={ (gameobj.name in countObj)? countObj[gameobj.name]:0} />);

    const style = {
        display: 'flex',
        flexDirection: 'row',
        margin: '5px auto',
        padding: '5px',
    };

    return(
        <div style={style}>
            {renderedgameobjects}
        </div>
    );
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
            display: this.props.inventory.isOpen? 'block' : 'none',
        };

        return(
                <div id="inventory" style={inventoryStyle}>
                    <div style={{ height: '50px', padding: '5px', display:'flex'}}>
                        <p style={{ width:'30%', fontSize: '30px', padding: '0px', margin:'0px'}}>Player</p>
                        <div style={{marginLeft:'auto', fontSize:'30px'}}></div>
                    </div>
                    <div style={{display: 'flex', padding: '5px', flexDirection: 'column', justifyContent: 'center'}}>
                        <InventoryRow type={HEALER} inventorylist={this.props.inventory[HEALER]} />
                        <InventoryRow type={EATABLE} inventorylist={this.props.inventory[EATABLE]} />
                        <InventoryRow type={CURRENCY} inventorylist={this.props.inventory[CURRENCY]} />
                    </div>
                </div>
        );
    }
}

export default connect(mapStatetoProps)(Inventory);
