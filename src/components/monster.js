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
        monsterEffect: () => {
            player.monsterAttack*=2;
        },
        effect:() => {
            this.stage = player.stage;
            this.area = player.area;
            player.playerAttack += Math.pow(this.stage,this.area);
        },
        remove:() => {
            player.playerAttack -= Math.pow(this.stage,this.area);
        }
    },
    {
        adjective: "Mystical",
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
        monsterEffect: () => {
            player.monsterHPMax*=2;
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
]