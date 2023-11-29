<script setup>
  import {player} from "@/components/player";
  import {ref} from "vue";
  let x = ref(0);
  let equipHover = ref(-1);


  function equipItem(index) {
    if(player.inventory[index]!==undefined) {
      let x = player.inventory[index];
      x.equip();
      player.inventory.splice(index,1);
      if(player.equipped.find((item) => item.slot === x.slot )) {
        player.inventory.push(player.equipped.find((item) => item.slot === x.slot ))
        player.equipped.splice(player.equipped.findIndex((item) => item.slot === x.slot ), 1)
        player.equipped.push(x);
      } else {
        player.equipped.push(x);
      }
    }
  }
  let slots = ["Helmet", "Chest-Plate", "Weapon", "Necklace", "Leggings", "Boots"]
  let rarity = [
    {
      type: "Common",
      chance: 600,
    },
    {
      type: "Uncommon",
      chance: 300,
      effect: () => {this.stage+=3}
    },
    {
      type: "Rare",
      chance: 140,
      effect: () => {this.stage+=5}
    },
    {
      type: "Epic",
      chance: 50,
      effect: () => {this.stage+=8}
    },
    {
      type: "Legendary",
      chance: 10,
      effect: () => {this.area+=1; this.stage+=10}
    }
  ]
  let rarityColors = ["Lavender", "Green", "Blue", "Purple", "Gold"]
  function findRarity() {
    let random = Math.random() * 1000;
    if(random<=700) {
      return rarity[0].type;
    } else if(random<=700+200) {
      return rarity[1].type;
    } else if(random<=700+200+100) {
      return rarity[2].type
    } else if(random<=700+200+100+80) {
      return rarity[3].type;
    } else {
      return rarity[4].type;
    }

  }
  function addItem(name, description, effect, equip, remove) {
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
  function findEquipped(slot) {
    return player.equipped.find((item) => item.slot === slot);
  }
  function removeItem(e, index) {
    e.preventDefault();
    player.inventory.splice(index,1);
  }
  function unEquip(index) {
    if(player.inventory.length<player.inventoryMax) {
      player.equipped[index].remove();
      player.inventory.push(player.equipped[index])
      player.equipped.splice(index,1)
    }
  }
</script>

<template>
  <p style="text-align: center">Equipment</p>
<!--Currently Equipped-->
  <div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Helmet')" @mouseleave="equipHover=-1" @click="unEquip(equipHover=player.equipped.findIndex((item) => item.slot === 'Helmet'))">
          <div v-if="findEquipped('Helmet')" v-bind:style="{color: rarityColors[rarity.indexOf(findEquipped('Helmet').rarity)]}">{{findEquipped('Helmet').rarity}} {{findEquipped('Helmet').slot}} of {{findEquipped('Helmet').name}}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Chest-Plate')" @mouseleave="equipHover=-1" @click="unEquip(player.equipped.findIndex((item) => item.slot === 'Chest-Plate'))">
          <div v-if="findEquipped('Chest-Plate')" v-bind:style="{color: rarityColors[rarity.indexOf(findEquipped('Chest-Plate').rarity)]}">{{findEquipped('Chest-Plate').slot}} of {{findEquipped('Chest-Plate').name}}</div>
        </div>
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Necklace')" @mouseleave="equipHover=-1" @click="unEquip(equipHover=player.equipped.findIndex((item) => item.slot === 'Necklace'))">
          <div v-if="findEquipped('Necklace')" v-bind:style="{color: rarityColors[rarity.indexOf(findEquipped('Necklace').rarity)]}">{{findEquipped('Necklace').rarity}} {{findEquipped('Necklace').slot}} of {{findEquipped('Necklace').name}}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Weapon')" @mouseleave="equipHover=-1" @click="unEquip(player.equipped.findIndex((item) => item.slot === 'Weapon'))">
          <div v-if="findEquipped('Weapon')" v-bind:style="{color: rarityColors[rarity.indexOf(findEquipped('Weapon').rarity)]}">{{findEquipped('Weapon').rarity}} {{findEquipped('Weapon').slot}} of {{findEquipped('Weapon').name}}</div>
        </div>
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Leggings')" @mouseleave="equipHover=-1" @click="unEquip(player.equipped.findIndex((item) => item.slot === 'Leggings'))">
          <div v-if="findEquipped('Leggings')" v-bind:style="{color: rarityColors[rarity.indexOf(findEquipped('Leggings').rarity)]}">{{findEquipped('Leggings').rarity}} {{findEquipped('Leggings').slot}} of {{findEquipped('Leggings').name}}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Boots')" @mouseleave="equipHover=-1" @click="player.equipped.findIndex((item) => item.slot === 'Boots')">
          <div v-if="findEquipped('Boots')" v-bind:style="{color: rarityColors[rarity.indexOf(findEquipped('Boots').rarity)]}">{{findEquipped('Boots').rarity}} {{findEquipped('Boots').slot}} of {{findEquipped('Boots').name}}</div>
        </div>
      </div>
    </div>
  </div>

  <br>

<!--  The Descriptions-->
  <div style="display: flex; height: 4vh;">
    <b>Name: </b>
    <span v-if="player.inventory[x]" style="white-space: nowrap">{{player.inventory[x].rarity}} {{player.inventory[x].slot}} of {{player.inventory[x].name}}</span>
    <span v-if="equipHover!==-1" style="white-space: nowrap">{{player.equipped}}</span>
  </div>
  <div style="display: flex; height: 4vh;">
    <b>Description: </b>
    <span v-if="player.inventory[x]" style="white-space: nowrap">{{player.inventory[x].description}}</span>
  </div>
  <div style="display: flex; height: 4vh;">
    <b>Effect: </b>
    <span v-if="player.inventory[x]" style="white-space: nowrap">{{player.inventory[x].effect}}</span>
  </div>
  <div style="display: flex; height: 4vh;">
    <b>Slot: </b>
    <span v-if="player.inventory[x]" style="white-space: nowrap">{{player.inventory[x].slot}}</span>
  </div>

  <p>{{player.inventory.length}} / {{player.inventoryMax}}</p>
<!--  The inventory boxes-->
  <div class="flex">
    <div v-for="n in player.inventoryMax" style="width: 20%">
      <div class="w3-border item" @mouseover="x=n-1" @mouseleave="x=-1" @click="equipItem(n-1)" @contextmenu="removeItem($event, n-1)">
        <div v-if="n<=player.inventory.length">
          <div v-bind:style="{color: rarityColors[rarity.indexOf(player.inventory[n-1].rarity)]}">
            {{player.inventory[n-1].rarity}} {{player.inventory[n-1].slot}} of {{player.inventory[n-1].name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .flex {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-flow: row wrap;
}
  .item {
    background-color: dimgrey;
    flex: 0 1 auto;
    height: 100%;
    min-height: 10vh;
    min-width: 10vh;
  }
</style>