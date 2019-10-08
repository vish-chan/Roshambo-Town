export const PLAYERDIALOGS = {
    Dad: {
        follows:[],
        starts:[],
        battleAccept:[],
        battleAsk:[],
        battleWin:[],
        battleLose:[],
    },

    Moon: {
        follows:["Great to be back, Dad. The town looks very different to me!", "OMG! How can we get take it back from them?", "I need some practice beofre challenging them.", "Thanks Dad."],
        starts:["Hey! Whatsup?"],
        battleAccept:[],
        battleAsk:[],
        battleWin:[],
        battleLose:[],
    },

    Beast: {
        follows:[],
        starts:[],
        battleAccept:["Yeah sure, lets go!"],
        battleAsk:["Hey do you wanna battle?"],
        battleWin:["Losers will remain losers.", "asdsdads"],
        battleLose:["I'll be back in no time. See you then."],
    }

}

export const NPCDIALOGS = {
    Dad:{
        starts: [],
        follows: [],
        battleAsk:[],
        battleAcceptNeverDefeated:[],
        battleAcceptDefeated:[],
        battleDecline:[],
        battleLose:[],
        battleWin:[],
    },

    Moon:{
        starts: ["Hey Son! Whatsup!", "The town is in a lot of trouble after the tribe takeover", "You need to defeat their boss in roshambo.", "Good luck!"],
        follows: ["You should go out and defeat the tribe!"],
        battleAsk:[],
        battleAcceptNeverDefeated:[],
        battleAcceptDefeated:[],
        battleDecline:[],
        battleLose:[],
        battleWin:[],
    },

    Beast:{
        starts: [],
        follows: [],
        battleAsk: ["You won't be able to defeat me. Do you have the guts to battle?"],
        battleAcceptNeverDefeated:["How many times you wanna lose!!"],
        battleAcceptDefeated:["Yeah, sure. But, this time you won't be lucky!"],
        battleDecline:["I don't think you're on my level. Go and Practice"],
        battleLose:["You've defeated me, but never our Boss!", "asdsdsdasd"],
        battleWin: ["Stop challenging the tribe."],
    }
}