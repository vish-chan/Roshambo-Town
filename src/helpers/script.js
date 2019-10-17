const DEFAULT_START = "Hey! Whatsup!";
const DEFAULT_FOLLOW = "Ehh! Leave me alone!";

export const PLAYERDIALOGS = {
    Frank: {
        follows:["Hey Frank! I'm great.", 
                 "I'm a bit busy with my engineering exams. What about you?", 
                 "Oh wow! That's awesome.", 
                 "Ohh, thanks for informing :). I'll probably go now.", 
                 "BBye, Takecare."],
        starts:[DEFAULT_START, 
                "Yup. He told me about that markov tribe."],
        battleAccept:[],
        battleAsk:[],
        battleWin:[],
        battleLose:[],
    },

    Dad: {
        follows:["It feels great to be back home. You look worried dad. Is everything fine?", 
                 "Yeah! The town seems a bit different. Someone refused to play Roshambo with me coz I was not on his level! I didn't get it.",
                 "Markov tribe? That's an interesting name. And what are the new rules?",
                 "And...",
                 "Okay! Now I get it. But this isn't great for our town. We always had a 'free Roshambo for all' motto.",
                 "How can we do that?",
                 "I can do that dad. But I need some practice.",
                 "Okay dad! I'll go and practice now. Big task ahead.",
                 "Thats amazing! I'll go grab an Eclair. See you!",
                ],
        starts:["Hey Dad! Whatsup?"],
        battleAccept:[],
        battleAsk:[],
        battleWin:[],
        battleLose:[],
    },

    Tia: {
        follows:["Hey Tia! I'm great. Came here to get some eclairs.", 
                 "Why so? I see the bakery is open.", 
                 "Its not their bakery! why are we being forced to battle him?", 
                 "Okay, I'll go inside and defeat him.",
                 "Sure, I'll do that. See you!",
                ],
        starts:["Hey Tia! Whatsup?"],
        battleAccept:[],
        battleAsk:[],
        battleWin:[],
        battleLose:[],
    },

    Nathan: {
        follows:[],
        starts:[],
        battleAccept:["Yeah sure, lets go!"],
        battleAsk:["Hey! do you wanna battle?"],
        battleWin:["Thanks mate! I think I am ready to defeat him, whatever."],
        battleLose:["I'll be back in no time. See you then."],
    },

    Samantha: {
        follows:[],
        starts:[],
        battleAccept:["Yeah sure, who doesn't like a freebie ;)"],
        battleAsk:["Hey! do you wanna battle?"],
        battleWin:["Thanks! I think I am ready to defeat him.", "Great! Now I have 2 reasons to defeat him haha."],
        battleLose:["I'll be back in no time. See you then."],
    },

    Eden:{

        follows:[],
        starts:[],
        battleAccept:["I'm $PLAYERNAME. I'm not new, you are new here. Btw, I came here for an eclair.",
                      "Really? I thought I need to have a Roshambo battle with you. Guess you are not that bad.",
                      "And I thought for a moment that the tribe isn't that bad. Nevertheless, I can defeat you, pretty easily.",
                      "Yup, lets go!!!"],
        battleAsk:["I want to challenge you for a battle!"],
        battleWin:["I'll take care of your boss later. I need my eclair now. Step aside.", 
                   "But you said so. And I believed you!",
                   "F*** man. What else can I expect from the tribe! Where can I find your boss?",
                   "Ughhhhhh."],
        battleLose:["I'll be back in no time. "],
    }

}

export const NPCDIALOGS = {
    Frank:{
        starts: ["Hey $PLAYERNAME! Whatsup.", "Long time no see. Where are you these days?", 
                "I'm preparing for this year's RoShamBo competition.", 
                "BTW, your father is waiting for you inside. You should go and meet him.", 
                "Sure, see you."],
        follows: ["I'm great. You talked to your father right!",
                  "They are dangerous! Try to stay away from them!"],
        battleAsk:[],
        battleAcceptNeverDefeated:[],
        battleAcceptDefeated:[],
        battleDecline:[],
        battleLose:[],
        battleWin:[],
    },

    Dad:{
        starts: ["Hey kiddo! Glad you're back. It feels great seeing you!",
                 "Did you notice anything weird outside?", 
                 "Its the markov tribe! Their boss won the Roshambo championship last year. Since then they have imposed new Roshambo rules in the town.",
                 "Now there is a level system in Roshambo. Every Roshambo player starts at level 1 and can go till level 5.",
                 "You can only battle a player who is at a lower or same level or 1 level higher than yours.",
                 "Yes, and thats why we need to overthrow this tribe.",
                 "We need to defeat their boss, only then we can remove these horrible rules.",
                 "Thats my kid! Look around the town for some Roshambo battlers for practice. Battle them to gain exp and level up.",
                 "Btw, your favourite Big Chill cakery has opened nearby. You should check it out."
                ],
        follows: ["Key kiddo! You should probably go and defeat the tribe!"],
        battleAsk:[],
        battleAcceptNeverDefeated:[],
        battleAcceptDefeated:[],
        battleDecline:[],
        battleLose:[],
        battleWin:[],
    },


    Tia:{
        starts: ["Hey $PLAYERNAME! Whatsup!", 
                 "You won't be able to get anything from here.", 
                 "There is a markov tribe member inside. If you want an eclair, you need to defeat him in Roshambo first.", 
                 "Everything belongs to them now. They have weird rules tbh.",
                 "I hope you have enough practice. You can battle my friend Samantha, she is inside the bakery."
                ],
        follows: ["I hope you defeat the tribe member."],
        battleAsk:[],
        battleAcceptNeverDefeated:[],
        battleAcceptDefeated:[],
        battleDecline:[],
        battleLose:[],
        battleWin:[],
    },

    Nathan:{
        starts: [],
        follows: [],
        battleAsk: ["You won't be able to defeat me. Do you have the guts to battle?"],
        battleAcceptNeverDefeated:["How many times you wanna lose!!"],
        battleAcceptDefeated:["Yeah, sure. But, this time you won't be lucky!"],
        battleDecline:["I don't think you're on my level. Go and Practice"],
        battleLose:["You are great man! Hopefully you'll be able to defeat the tribe member."],
        battleWin: ["You're aweful. You need to practice."],
    },

    Samantha:{
        starts: [],
        follows: [],
        battleAsk: ["Hey! Do you wanna battle? Winner gets a swiss roll :p"],
        battleAcceptNeverDefeated:["How many times you wanna lose!!"],
        battleAcceptDefeated:["Yeah, sure. But, this time you won't be lucky!"],
        battleDecline:["I don't think you're on my level. Go and Practice"],
        battleLose:["You are great! Now you need to defeat the tribe member to get the free swiss roll. Hehe.",
                     "Really! You'll get a brownie as well if you defeat him."],
        battleWin: ["Gosh! You're aweful. You need to practice. I don't think I'll ever get the swiss roll lol."],
    },

    Eden:{
        starts: [],
        follows: [],
        battleAsk: ["Hey you! I think you're new here.",
                    "Just an eclair? You can have one.",
                    "No, I was kidding. You need to defeat me in Roshambo first.",
                    "I like defeating overconfident kids, lets go!"],
        battleAcceptNeverDefeated:["How many times you wanna lose!!"],
        battleAcceptDefeated:["This time you won't be lucky!"],
        battleDecline:["I don't think you're on my level. Go, battle and level up."],
        battleLose:["You have defeated me, but you won't be able to defeat our boss.", 
                    "If you think you can get your eclair now, you are a fool!",
                    "Ah, I lied. You need to defeat our boss in order to change the rules. Hahahahaha.",
                    "Find him yourself. All the best. Hahahahahahahaha."],
        battleWin: ["Typical overconfident kid. You can never defeat me, nevermind our boss!!"],
    }
}