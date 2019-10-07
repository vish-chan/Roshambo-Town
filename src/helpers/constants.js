export const TILE_SIZE = 80;
export const TOTAL_MOVEMENT_SIZE = TILE_SIZE;

export const VIEWPORT_WIDTH = TILE_SIZE*18; //1440
export const VIEWPORT_HEIGHT = TILE_SIZE*10; //800
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


export const PLAYER_DEFAULT_DIALOG = "Hey! What's up?";
export const NPC_DEFAULT_POLITE_DIALOG = "I already told you everything!";
export const NPC_DEFAULT_RUDE_DIALOG = "Ehhh! Leave me alone!";


export const BATTLE_QUESTION = "Hey! Do you wanna battle?";
export const BATTLE_ACCEPT_ANS = "Yeah, sure. Let's go!";
export const BATTLE_BOSS_ACCEPT_ANS = "HAHA! Sure. But you won't win.";

export const BATTLE_DEFEATED_ACCEPT_ANS = "Yeah, sure. But, this time you won't be lucky!";
export const BATTLE_NEVER_DEFEATED_ACCEPT_ANS = "How many times you wanna lose!!";
export const BATTLE_DECLINE_ANS = "You're not on my level.";

export const BATTLE_LOSE_NGM_NPC_DIALOG = "I win, as expected. You need more practice.";
export const BATTLE_LOSE_NGM_PLAYER_DIALOG = "I'll be back in no time. See you then.";
export const BATTLE_WIN_NGM_NPC_DIALOG = "Don't be on cloud nine. It was just one game!";
export const BATTLE_WIN_NGM_PLAYER_DIALOG = "Losers will remain losers.";

export const BATTLE_LOSE_GM_NPC_DIALOG = "HAHA! I win as expected. You'll not be able to dethrone us!";
export const BATTLE_LOSE_GM_PLAYER_DIALOG = "I'll be back for you after more practice. See you then.";
export const BATTLE_WIN_GM_NPC_DIALOG = "You could defeat me, but you would never be able to defeat our BOSS!";
export const BATTLE_WIN_GM_PLAYER_DIALOG = "One step closer to your boss! Can't wait to battle him!";

export const BATTLE_LOSE_BOSS_DIALOG = "You can't defeat me! Ever!";
export const BATTLE_LOSE_BOSS_PLAYER_DIALOG = "I'll be back for you after more practice. See you then.";
export const BATTLE_WIN_BOSS_DIALOG = "A worthy winner atlast. It was a pleasure battling you. You have the town now!";
export const BATTLE_WIN_BOSS_PLAYER_DIALOG = "Thanks! I hope you won't get me killed after this. Haha!";

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