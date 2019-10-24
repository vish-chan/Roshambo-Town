import React from 'react';
import { DRIP_SOUND, BEEP_SOUND, BEEP_2_SOUND, BEEP_3_SOUND, BEEP_LONG_SOUND, PICK_SOUND, LASER_SOUND, BATTLE_END_MUSIC } from '../helpers/constants';

const AudioEffects = () => {
    return(
        <React.Fragment>
            <audio src={DRIP_SOUND} preload="auto"/>
            <audio src={BEEP_SOUND} preload="auto"/>
            <audio src={BEEP_2_SOUND} preload="auto"/>
            <audio src={BEEP_3_SOUND} preload="auto"/>
            <audio src={BEEP_LONG_SOUND} preload="auto"/>
            <audio src={PICK_SOUND} preload="auto"/>
            <audio src={LASER_SOUND} preload="auto"/>
            <audio src={BATTLE_END_MUSIC} preload="auto"/>
        </React.Fragment>
    );
}

export default AudioEffects;