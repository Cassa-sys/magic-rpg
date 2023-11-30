import {player} from "@/components/player";
let slots = ["Helmet", "Chest-Plate", "Weapon", "Necklace", "Leggings", "Boots"]
let rarity = [
    {
        name: "Common",
        color: "#ffffff",
        chance: 600,
    },
    {
        name: "Uncommon",
        color: "#1eff00",
        chance: 300,
        effect: () => {this.stage+=3}
    },
    {
        name: "Rare",
        color: "#007eff",
        chance: 140,
        effect: () => {this.stage+=5}
    },
    {
        name: "Epic",
        color: "#a335ee",
        chance: 50,
        effect: () => {this.stage+=8}
    },
    {
        name: "Legendary",
        color: "#ff8000",
        chance: 10,
        effect: () => {this.area+=1; this.stage+=10}
    }
]
function findRarity() {
    let random = Math.random() * 1000;
    if(random<=rarity[0].chance) {
        return rarity[0];
    } else if(random<rarity[0].chance+rarity[1].chance) {
        return rarity[1];
    } else if(random<=rarity[0].chance+rarity[1].chance+rarity[2].chance) {
        return rarity[2]
    } else if(random<=rarity[0].chance+rarity[1].chance+rarity[2].chance+rarity[3].chance) {
        return rarity[3];
    } else {
        return rarity[4];
    }

}
export function addItem(name, description, effect, equip, remove) {
    let rarity = findRarity();
    if(player.inventory.length<player.inventoryMax) {
        let slot = slots[Math.round(Math.random()*5)];

        let item = {
            rarity:rarity,
            name: name,
            description:description,
            effect:effect,
            equip: equip,
            remove: remove,
            slot: slot
        };
        player.inventory.push(item)
    } else {
        console.log("Byebye item")
    }
}