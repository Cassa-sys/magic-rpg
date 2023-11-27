import {reactive} from "vue";

export let player = reactive({
    name: "Player",
    date: Date(),

    health: 100,
    maxHealth: 100,
    healthMulti: 1,

    mana: 100,
    maxMana: 100,
    manaMulti: 1,

    stamina: 100,
    maxStamina: 100,
    staminaMulti:1,

    level: 1,
    exp: 0,
    maxXP:100,

    skillPoints: 0,
    skills: [],

    spellBook: [],

    action: "", //the Name of Action
    actionProgress: 0, //the progress of actions. increases per tick
    actionMax: 0, //the max amount of progress. causes result when full
    actionColor: "Dark Gray", //the color of the bar
    actionCost: 0, //how much it decreases by per game tick
    actionResource: "", //the resource an action takes eg Health
    actionResult: function () {}, //the effect that takes place when action done
    swapAction: function(name, max, color, cost, result, resource) {
        this.action=name;
        this.actionProgress=0;
        this.actionMax=max;
        this.actionColor=color;
        this.actionCost = cost;
        this.actionResult = result;
        this.actionResource = resource;
    },

    inventory:  [],

    inventoryMax: 10,
    equipped: [],


    levelUp: function() {
        if(this.exp>=this.maxXP) {
            this.exp= this.exp-this.maxXP;
            this.level++;
            this.health+=20*this.healthMulti;
            this.maxHealth+=20*this.healthMulti;
            this.mana+=20*this.manaMulti;
            this.maxMana+=20*this.manaMulti;
            this.stamina+=20*this.staminaMulti;
            this.maxStamina+=20*this.staminaMulti;
            this.skillPoints+=Math.round(Math.random()*2)+1;
            this.maxXP+=(this.level*100);
        }
    },
    load: function () {
        Object.assign(player, JSON.parse(localStorage.getItem("rpgSave")));
    }
})