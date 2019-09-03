export const PLAYER_SPRITE_SIZE = 40;

export const TILE_SIZE = 40;
export const TOTAL_MOVEMENT_SIZE = TILE_SIZE;
export const ANIMATION_STEPS = 8;
export const MAX_WALK_INDEX = 8;
export const FRAME_MOVEMENT_SIZE = TOTAL_MOVEMENT_SIZE/ANIMATION_STEPS;

export const VIEWPORT_WIDTH = TILE_SIZE*20;
export const VIEWPORT_HEIGHT = TILE_SIZE*10;
export const VIEWPORT_BOUNDARY = [VIEWPORT_WIDTH , VIEWPORT_HEIGHT];
export const CAMERA = [[(VIEWPORT_WIDTH/2) - (TILE_SIZE*2), (VIEWPORT_WIDTH/2) + (TILE_SIZE)], [(VIEWPORT_HEIGHT/2) - (TILE_SIZE*2), (VIEWPORT_HEIGHT/2) + (TILE_SIZE)]]
export const PLAYER_START_POS = [VIEWPORT_WIDTH/2 - TILE_SIZE, VIEWPORT_HEIGHT/2 - TILE_SIZE];

export const TREESPRITE = [0,0];
export const ROCKSPRITE = [1*TILE_SIZE,0];
export const TREASURESPRITE = [2*TILE_SIZE, 0];

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";
export const SPRITE_LOC_DOWN = 0;
export const SPRITE_LOC_UP = 3;
export const SPRITE_LOC_LEFT = 2;
export const SPRITE_LOC_RIGHT = 1;

export const ARROW_KEYCODES = [37, 38, 39, 40];
