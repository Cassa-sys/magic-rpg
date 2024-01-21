import {reactive} from "vue";
export let player = reactive({
    name: "Player",
    date: Date(),


    defense: 5,
    playerAttack: 10,

    //different resources
    //hp
    health: 100,
    healthMax: 100,
    healthMulti: 1, //multiplier to max gain
    //mana
    mana: 100,
    manaMax: 100,
    manaMulti: 1, //multiplier to max gain

    //energy
    stamina: 100,
    staminaMax: 100,
    staminaMulti:1, //multiplier to max gain

    //level
    level: 1,
    exp: 0,
    expMax:100,

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
        storage: false, //if the skill tracks how far it has gone
    },
    swapAction: function(actionName, actionMax, actionColor, actionCost, actionResource, actionResult, storage) {
        this.action.actionProgress=0;
        this.action.actionName = actionName;
        this.action.actionMax = actionMax;
        this.action.actionColor = actionColor;
        this.action.actionCost = actionCost;
        this.action.actionResource = actionResource;
        this.action.actionResult = actionResult
        this.action.storage = storage
        for(let i=0;i<this.bankedActions.length;i++) {
            if(this.bankedActions[i].name===actionName) {
                this.action.actionProgress=this.bankedActions[i].actionProgress;
            }
        }
    },
    tempAction: {},
    bankedActions:[],

    rest: function() {
        this.swapAction('Resting', 1, 'Dark Gray', -1, 'Health Mana Stamina',() => {
            this.health = (this.health > this.healthMax) ? this.healthMax : this.health;
            this.mana = (this.mana > this.manaMax) ? this.manaMax : this.mana;
            this.stamina = (this.stamina > this.staminaMax) ? this.staminaMax : this.stamina;
        }, false)
    },
    doNothing: function() {
        this.swapAction("Nothing", 0, 'Dark Gray', 0, '', () => {},false)
    },

    //inventory
    inventory:  [],
    inventoryMax: 10,
    equipped: [],

    //items, like gold
    //["Fire", "Earth", "Water", "Air","Shadow", "Light", "Arcane"]
    items: {
        gold: {
            name: "Gold",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"ooo Shiny!",
            acquired: true
        },
        bones: {
            name: "Bones",
            amount: 0,
            max: 10,
            amountPerSecond: 0,
            description:"It sends shivers down your spine.",
            acquired: false
        },
        fireGem: {
            name: "Fire Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"Sizzling Hot.",
            acquired: false
        },
        waterGem: {
            name: "Water Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"Surprisingly Humid?",
            acquired: false
        },
        airGem: {
            name: "Air Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"Light as a Feather!",
            acquired: false
        },
        earthGem: {
            name: "Earth Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"Solid as a Rock.",
            acquired: false
        },
        shadowGem: {
            name: "Shadow Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"It reeks of bad vibes.",
            acquired: false
        },
        lightGem: {
            name: "Light Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"It radiates a holy aura.",
            acquired: false
        },
        arcaneGem: {
            name: "Arcane Gem",
            amount: 0,
            max: 5,
            amountPerSecond: 0,
            description:"It is bursting with power.",
            acquired: false
        },
    },

    //monsters
    area: 1,
    maxArea: 1,
    stage: 1, //1-10,
    maxStage: 1,
    monstersDefeated: 0,
    monsterName: "Nothing",
    monsterHP: 0,
    monsterHPMax: 0,
    monsterAttack: 0, //attack damage
    monsterProgress:0, //progress on attack
    monsterProgressMax: 0, //max time for their action
    monsterDefense: 0,
    monsterAdjective: {},

    levelUp: function() {
        if(this.exp>=this.expMax) {
            this.exp= this.exp-this.expMax;
            this.level++;
            this.health+=20*this.healthMulti;
            this.healthMax+=20*this.healthMulti;
            this.mana+=20*this.manaMulti;
            this.manaMax+=20*this.manaMulti;
            this.stamina+=20*this.staminaMulti;
            this.staminaMax+=20*this.staminaMulti;
            this.skillPoints+=Math.round(Math.random()*2)+1;
            this.expMax+=(this.level*100);
        }
    },
    load: function () {
        Object.assign(player, JSON.parse(localStorage.getItem("rpgSave")));
    }
})