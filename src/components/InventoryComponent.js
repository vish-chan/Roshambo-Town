import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EATABLE, HEALER, CURRENCY } from '../helpers/constants';
import { GAMEOBJECTS } from '../data/gameobjects';



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

    const divSize = 120;

    const imageStyle = {
        backgroundImage: `url('${props.self.src}')`,
        backgroundPosition: `${props.self.srcpos[0]}px ${props.self.srcpos[1]}px`,
        width: props.self.width,
        height: props.self.height,
        position: 'absolute',
        left: divSize/2 - props.self.width/2,
        top: divSize/2 - props.self.height/2,
    };

    return(
        <div className="inventorybtn">
            <div style={imageStyle}/>
            <p style={{fontSize: '20px', position: 'absolute', margin: '5px', left: 5, bottom: 5}}>{props.count}</p>
        </div>
    );
}


const InventoryRow = (props) => {

    const countObj = GetInventoryItemCounts(props.inventorylist);
    const validgameobjects = GAMEOBJECTS.filter(gameobj => gameobj.type === props.type);

    const rendergameobjects = validgameobjects.map( gameobj => <InventoryItem self={gameobj} key={gameobj.id} count={ (gameobj.name in countObj)? countObj[gameobj.name]:0} />);

    const style = {
        display: 'flex',
        flexDirection: 'row',
        margin: '5px',
        padding: '6px',
        backgroundColor: 'forestgreen',
        boxShadow: 'inset 0 0 5px black',
        borderRadius: '10px'
    };

    return(
        <div style={style}>
            <div style={{ writingMode: 'vertical-lr', textOrientation: 'sideways-right', margin:'auto 5px', padding: '5px' }} >{props.type}</div>
            {rendergameobjects}
        </div>
    );
}

const InventoryDialog = (props) => {

    const width = 620, height = 550;

    const inventoryStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: 'darkgreen',
        border: '5px solid white',
        borderRadius: '10px',
        boxShadow: 'inset 0 0 5px black',
        fontFamily: 'gameboy',
        color: 'white',
        padding: "5px",
        zIndex: 5,
        display: props.inventory.isOpen? 'inline-block' : 'none',
    };

    return(
            <div id="inventory" style={inventoryStyle}>
                <div style={{ fontSize: '20px', padding: '5px', margin:'5px', textAlign: 'center'}}>
                    <p style={{ fontSize: '20px', padding: '3px', margin:'0px', display:'inline-block', border: '2px groove white'}}>Inventory</p>
                </div>
                <div style={{display: 'flex', padding: '5px', flexDirection: 'column', justifyContent: 'center'}}>
                    <InventoryRow type={HEALER} inventorylist={props.inventory[HEALER]} />
                    <InventoryRow type={EATABLE} inventorylist={props.inventory[EATABLE]} />
                    <InventoryRow type={CURRENCY} inventorylist={props.inventory[CURRENCY]} />
                </div>
            </div>
    );
}


class Inventory extends Component {

    render() {
        return( 
            <InventoryDialog inventory={this.props.inventory} />
        );
    }
}

export default connect(mapStatetoProps)(Inventory);
