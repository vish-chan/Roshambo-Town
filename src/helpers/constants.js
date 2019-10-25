export const TILE_SIZE = 80;
export const TOTAL_MOVEMENT_SIZE = TILE_SIZE;

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export const KEYCODES = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
}

export const ARROW_KEYCODES = [37, 38, 39, 40];
export const SPACE_KEY = [32];
export const PICKUP_KEY = [80]; /* P */
export const INVENTORY_KEY = [73]; /* I */
export const ESC_KEY = [27]; /* R */

export const VALID_KEYCODES = ARROW_KEYCODES.concat(SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, ESC_KEY);

export const PASSIBLE_INDEX = 5;

export const HEALER = "HEALER";
export const EATABLE = "EATABLE";
export const CURRENCY = "CURRENCY";
export const PORTAL = "PORTAL";
export const PICKABLES = [HEALER,EATABLE,CURRENCY];

export const ROCK = 0;
export const PAPER = 1;
export const SCISSORS = 2;


export const BATTLE_ELIGIBILITY_THRESHOLD = 1;
export const BATTLE_NUM_GANG_MEMBERS = 5;
export const BOSS_BATTLE_LEVEL = 6;

export const BOSS = "BOSS";
export const GANG_MEMBER = "GANG_MEMBER";
export const NON_GANG_MEMBER = "NON_GANG_MEMBER";


export const SAVED_GAME = `SAVED_GAME_${process.env.REACT_APP_VERSION? process.env.REACT_APP_VERSION.replace(/[.]/g, '_'):"1_0_0"}`;

export const LOADGAME = "LOADGAME";
export const NEWGAME = "NEWGAME";

export const MAIN_MENU = "/menu";
export const WORLD_BASE = "/world"

export const PORTAL_ENTER = "enter";
export const PORTAL_LEAVE = "leave";

export const MAX_LEVEL = 6;
export const LEVEL_COLORS =  {
    L1: "MediumSeaGreen",
    L2: "RoyalBlue",
    L3: "Turquoise",
    L4: "darkorange",
    L5: "red",
    L6: "gold"
};

export const MAP_NAMES = {
    hospital: "Hospital",
    bakery: "Bakery",
    cave: "hauntedhouse",
    gameroom: "Gameroom",
    hell: "Hell",
    home: "Home",
    hotel: "Hotel",
    library: "Library",
    town_center:"TownCenter",
    town_north: "NorthTown",
    town_south: "SouthTown",
}

const ASSETS_PATH = "assets";
const AUDIO_PATH = `${ASSETS_PATH}/audio`;
export const IMAGES_PATH = `${ASSETS_PATH}/images`;
export const MAPS_BASE = `${IMAGES_PATH}/maps`;
export const CHARACTER_SPRITES_BASE = `${IMAGES_PATH}/80/characters`;
export const PROPS_PATH = `${IMAGES_PATH}/80/objectsAndProps`;

export const DRIP_SOUND = `${AUDIO_PATH}/effects/drip.wav`;
export const BEEP_SOUND = `${AUDIO_PATH}/effects/beep.wav`;
export const BEEP_2_SOUND = `${AUDIO_PATH}/effects/beep2.wav`;
export const BEEP_3_SOUND = `${AUDIO_PATH}/effects/beep3.wav`;
export const BEEP_LONG_SOUND = `${AUDIO_PATH}/effects/longbeep.wav`;
export const PICK_SOUND = `${AUDIO_PATH}/effects/getcoin.wav`;
export const LASER_SOUND = `${AUDIO_PATH}/effects/laser.wav`;

export const MAIN_MENU_MUSIC = `${AUDIO_PATH}/MainMenu.mp3`;
export const TOWN_CENTER_MUSIC = `${AUDIO_PATH}/TownCenter.mp3`;
export const TOWN_NORTH_MUSIC = `${AUDIO_PATH}/TownSouth.mp3`;
export const TOWN_SOUTH_MUSIC = `${AUDIO_PATH}/TownSouth.mp3`;
export const HOME_MUSIC = `${AUDIO_PATH}/Home.mp3`;
export const BAKERY_MUSIC = `${AUDIO_PATH}/Bakery.mp3`;
export const HOTEL_MUSIC = `${AUDIO_PATH}/Hotel.mp3`;
export const LIBRARY_MUSIC = `${AUDIO_PATH}/Library.mp3`;
export const GAMEROOM_MUSIC = `${AUDIO_PATH}/GameRoom.mp3`;
export const CAVE_MUSIC = `${AUDIO_PATH}/Cave.mp3`;
export const HELL_MUSIC = `${AUDIO_PATH}/Hell.mp3`;
export const BATTLE_MUSIC = `${AUDIO_PATH}/Battle.mp3`;
export const BATTLE_BOSS_MUSIC = `${AUDIO_PATH}/BattleBoss.mp3`;
export const BATTLE_GM_MUSIC = `${AUDIO_PATH}/BattleGangMember.mp3`;
export const BATTLE_END_MUSIC = `${AUDIO_PATH}/BattleEnd.mp3`;