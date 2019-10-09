export const TILE_SIZE = 80;
export const TOTAL_MOVEMENT_SIZE = TILE_SIZE;

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";
export const SPRITE_LOC_DOWN = 0;
export const SPRITE_LOC_UP = 3;
export const SPRITE_LOC_LEFT = 2;
export const SPRITE_LOC_RIGHT = 1;

export const ARROW_KEYCODES = [37, 38, 39, 40];
export const SPACE_KEY = [32];
export const PICKUP_KEY = [80]; /* P */
export const INVENTORY_KEY = [73]; /* I */
export const SAVE_KEY = [69]; /* E */
export const ENTER_KEY = [13]; /* ENTER */
export const ESC_KEY = [27]; /* R */

export const VALID_KEYCODES = ARROW_KEYCODES.concat(SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, SAVE_KEY, ENTER_KEY, ESC_KEY);

export const PASSIBLE_INDEX = 5;

export const HEALER = "HEALER";
export const EATABLE = "EATABLE";
export const CURRENCY = "CURRENCY";
export const PORTAL = "PORTAL";
export const PICKABLES = [HEALER,EATABLE,CURRENCY];

export const ROCK = 0;
export const PAPER = 1;
export const SCISSORS = 2;


export const BATTLE_THRESHOLD = 1;
export const BATTLE_GANG_MEMBERS = 5;
export const BOSS_BATTLE_LEVEL = 6;

export const BOSS = "BOSS";
export const GANG_MEMBER = "GANG_MEMBER";
export const NON_GANG_MEMBER = "NON_GANG_MEMBER";


export const SAVED_GAME = "SAVED GAME";

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