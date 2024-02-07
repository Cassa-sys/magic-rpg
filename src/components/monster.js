import {player} from "@/components/player";

export const monsterNames = [
    "Mouse",
    "Horde of Rats",
    "Slime",
    "Bandit",
    "Ant",
    "Void Woken",
    "Mind Flayer",
    "Cerebus",
    "Cthulhu",
    "Owl-Bear",
    "Kitsune",
    "Golem",
];
export const monsterAdjectives = [
    {
        adjective: "Furious",
        effectDescription: "Anger Spikes within you as you hold this weapon",
        monsterEffect: () => {
            player.monsterAttack*=2;
        },
        effect:() => {
            var equip = {};
            equip.stage = player.stage;
            equip.area = player.area;
            player.playerAttack += Math.pow(this.stage,this.area);
        },
        remove:() => {
            player.playerAttack -= Math.pow(this.stage,this.area);
        }
    },
    {
        adjective: "Mystical",
        effectDescription: "You have never felt more wise. Increases Max Mana",
        monsterEffect: () => {
            player.monsterProgressMax/=2;
        },
        effect:() => {
            this.stage = player.stage;
            this.area = player.area;
            player.manaMax += Math.pow(this.stage,this.area);
        },
        remove:() => {
            player.maxMana -= Math.pow(this.stage,this.area);
        }
    },
    {
        adjective: "Cowardly",
        effectDescription: "You could outrun a cheetah. Increases Max Stamina",
        monsterEffect: () => {
            player.monsterProgressMax*=2;
        },
        effect: () => {
            this.stage = player.stage;
            this.area = player.area;
            player.staminaMax += Math.pow(this.stage, this.area);
        },
        remove: () => {
            player.staminaMax -= Math.pow(this.stage, this.area);
        }
    },
    {
        adjective: "Healthy",
        effectDescription: "You eat your vitamins every day. Increases Max Health",
        monsterEffect: () => {
            player.monsterHPMax*=2;
                player.monsterHP = player.monsterHPMax;
        },
        effect: () => {
            this.stage = player.stage;
            this.area = player.area;
            player.healthMax += Math.pow(this.stage, this.area);
        },
        remove: () => {
            player.healthMax -= Math.pow(this.stage, this.area);
        }
    },
    {
        adjective: "Tanky",
        effectDescription: "You are tougher than an elephant. Increases Max Defense",
        monsterEffect: () => {
            player.monsterDefense*=2;
        },
        effect: () => {
            this.stage = player.stage;
            this.area = player.area;
            player.defense += Math.pow(this.stage, this.area);
        },
        remove: () => {
            player.healthMax -= Math.pow(this.stage, this.area);
        }
    }
]