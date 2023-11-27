import {reactive} from "vue";
export let player = reactive({
    name: "Player",
    date: Date(),

    //different resources
    //hp
    health: 100,
    maxHealth: 100,
    healthMulti: 1, //multiplier to max gain

    //mana
    mana: 100,
    maxMana: 100,
    manaMulti: 1, //multiplier to max gain

    //energy
    stamina: 100,
    maxStamina: 100,
    staminaMulti:1, //multiplier to max gain

    //level
    level: 1,
    exp: 0,
    maxXP:100,

    //skills
    skillPoints: 0,
    skills: [], //array with objects inside

    //magic
    spellBook: [],

    //actions
    action: {
        actionName: "", //the Name of Action
        actionProgress: 0, //the progress of actions. increases per tick
        actionMax: 0, //the max amount of progress. causes result when full
        actionColor: "Dark Gray", //the color of the bar
        actionCost: 0, //how much it decreases by per game tick
        actionResource: "", //the resource an action takes e.g. Health
        actionResult: function () {}, //the effect that takes place when action done
    },
    swapAction: function(actionName, actionMax, actionColor, actionCost, actionResource, actionResult) {
        this.action.actionName = actionName;
        this.action.actionMax = actionMax;
        this.action.actionColor = actionColor;
        this.action.actionCost = actionCost;
        this.action.actionResource = actionResource;
        this.action.actionResult = actionResult
    },
    tempAction: {},
    rest: function() {
        this.tempAction = this.action;
        this.swapAction('Resting', 0, 'Dark Gray', -1, 'Health Mana Stamina',() => {
            this.health = (this.health > this.maxHealth) ? this.maxHealth : this.health;
            this.mana = (this.mana > this.maxMana) ? this.maxMana : this.mana;
            this.stamina = (this.stamina > this.maxStamina) ? this.maxStamina : this.stamina;
        })
    },
    doNothing: function() {
        this.swapAction("Nothing", 0, 'Dark Gray', 0, '', () => {})
    },

    //inventory
    inventory:  [],
    inventoryMax: 10,
    equipped: [],

    //monsters
    area: 1,
    maxArea: 1,
    stage: 1, //1-10,
    maxStage: 1,
    monstersDefeated: 0,
    monsterName: "Nothing",
    monsterHP: 0,
    monsterMax: 0,
    monsterAttack: 0, //attack damage
    monsterProgress:0, //progress on attack
    monsterProgressMax: 0, //max time for their action



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