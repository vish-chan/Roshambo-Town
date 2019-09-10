export const PLAYER_SPRITE_SIZE = 80;

export const TILE_SIZE = 80;
export const TOTAL_MOVEMENT_SIZE = TILE_SIZE;

export const VIEWPORT_WIDTH = TILE_SIZE*18;
export const VIEWPORT_HEIGHT = TILE_SIZE*10;
export const VIEWPORT_BOUNDARY = [VIEWPORT_WIDTH , VIEWPORT_HEIGHT];
export const CAMERA = [[(VIEWPORT_WIDTH/2) - (TILE_SIZE*2), (VIEWPORT_WIDTH/2) + (TILE_SIZE)], [(VIEWPORT_HEIGHT/2) - (TILE_SIZE*2), (VIEWPORT_HEIGHT/2) + (TILE_SIZE)]]

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
export const PICKUP_KEY = [80];

export const VALID_KEYCODES = ARROW_KEYCODES.concat(SPACE_KEY,PICKUP_KEY);

export const PASSIBLE_INDEX = 5;

export const INVENTORY = "INVENTORY";
