<script setup>
  import {player} from "@/components/player";
  import {ref} from "vue";
  import HoverElement from "@/components/HoverElement.vue";
  import {addItem} from "@/components/inventory";
  let x = ref(0);
  let equipHover = ref(-1);


  function equipItem(index) {
    if(player.inventory[index]!==undefined) {
      //grab the equipment
      let x = player.inventory[index];
      //do the equipment effect
      x.equip();
      //remove it from inventory
      player.inventory.splice(index,1);
      //if there is already something equipped in that slot
      //find the item that has same slot as what we want to equip
      if(player.equipped.find((item) => item.slot === x.slot )) {
        player.equipped.find((item) => item.slot === x.slot ).remove();
        //push any equipped item into inventory
        player.inventory.push(player.equipped.find((item) => item.slot === x.slot ))
        //remove the old equipped item
        player.equipped.splice(player.equipped.findIndex((item) => item.slot === x.slot ), 1);
        //add the new equipped item
        player.equipped.push(x);
      } else {
        //otherwise just equip item
        player.equipped.push(x);
      }
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
  <button @click="addItem('Swordy', 'Sword', '+10 hp', () => {player.health+=10; player.healthMax+=10},() => {player.health-=10; player.healthMax-=10})">Add Sword</button>
<!--Currently Equipped-->
  <div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Helmet')" @mouseleave="equipHover=-1" @click="unEquip(equipHover=player.equipped.findIndex((item) => item.slot === 'Helmet'))">
          <div v-if="findEquipped('Helmet')" v-bind:style="{color: findEquipped('Helmet').rarity.color}">
            <HoverElement>
              <template v-slot:header>
                {{findEquipped('Helmet').rarity.name}} {{findEquipped('Helmet').slot}} of {{findEquipped('Helmet').name}}
              </template>
              <p>Effect: {{player.equipped[equipHover].effect}}</p>
              <p>Slot: {{player.equipped[equipHover].slot}}</p>
            </HoverElement>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Chest-Plate')" @mouseleave="equipHover=-1" @click="unEquip(player.equipped.findIndex((item) => item.slot === 'Chest-Plate'))">
          <div v-if="findEquipped('Chest-Plate')" v-bind:style="{color: findEquipped('Chest-Plate').rarity.color}">
            <HoverElement>
              <template v-slot:header>
                {{findEquipped('Chest-Plate').rarity.name}} {{findEquipped('Chest-Plate').slot}} of {{findEquipped('Chest-Plate').name}}
              </template>
              <p>Effect: {{player.equipped[equipHover].effect}}</p>
              <p>Slot: {{player.equipped[equipHover].slot}}</p>
            </HoverElement>
          </div>
        </div>
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Necklace')" @mouseleave="equipHover=-1" @click="unEquip(equipHover=player.equipped.findIndex((item) => item.slot === 'Necklace'))">
          <div v-if="findEquipped('Necklace')" v-bind:style="{color: findEquipped('Necklace').rarity.color}">
            {{findEquipped('Necklace').rarity.name}} {{findEquipped('Necklace').slot}} of {{findEquipped('Necklace').name}}
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Weapon')" @mouseleave="equipHover=-1" @click="unEquip(player.equipped.findIndex((item) => item.slot === 'Weapon'))">
          <div v-if="findEquipped('Weapon')" v-bind:style="{color: findEquipped('Weapon').rarity.color}">
            {{findEquipped('Weapon').rarity.name}} {{findEquipped('Weapon').slot}} of {{findEquipped('Weapon').name}}
          </div>
        </div>
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Leggings')" @mouseleave="equipHover=-1" @click="unEquip(player.equipped.findIndex((item) => item.slot === 'Leggings'))">
          <div v-if="findEquipped('Leggings')" v-bind:style="{color: findEquipped('Leggings').rarity.color}">
            {{findEquipped('Leggings').rarity.name}} {{findEquipped('Leggings').slot}} of {{findEquipped('Leggings').name}}
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%">
      <div class="flex" style="justify-content: center" >
        <div class="w3-border item" style="width: 4vh" @mouseover="equipHover=player.equipped.findIndex((item) => item.slot === 'Boots')" @mouseleave="equipHover=-1" @click="player.equipped.findIndex((item) => item.slot === 'Boots')">
          <div v-if="findEquipped('Boots')" v-bind:style="{color: findEquipped('Boots').rarity.color}">
            {{findEquipped('Boots').rarity.name}} {{findEquipped('Boots').slot}} of {{findEquipped('Boots').name}}
          </div>
        </div>
      </div>
    </div>
  </div>

  <br>

<!--  The Descriptions-->
  <!--
  <div style="display: flex; height: 4vh;">
    <b>Name: </b>
    <span v-if="player.inventory[x]" style="white-space: nowrap">{{player.inventory[x].rarity.name}} {{player.inventory[x].slot}} of {{player.inventory[x].name}}</span>
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
  -->

  <p>{{player.inventory.length}} / {{player.inventoryMax}}</p>
<!--  The inventory boxes-->
  <div class="flex">
    <div v-for="n in player.inventoryMax" style="width: 20%">
      <div class="w3-border item" @mouseover="x=n-1" @mouseleave="x=-1" @click="equipItem(n-1)" @contextmenu="removeItem($event, n-1)">
        <div v-if="n<=player.inventory.length">
          <div v-bind:style="{color: player.inventory[n-1].rarity.color}">
            <HoverElement>
              <template v-slot:header>
                {{player.inventory[n-1].rarity.name}} {{player.inventory[n-1].slot}} of {{player.inventory[n-1].name}}
              </template>
              <p>Effect: {{player.inventory[n-1].effect}}</p>
              <p>Slot: {{player.inventory[n-1].slot}}</p>
            </HoverElement>
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