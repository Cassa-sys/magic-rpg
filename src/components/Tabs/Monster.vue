<script setup>
import {player} from "@/components/player";
import ResourceBar from "@/components/ResourceBar.vue";
import {monsterNames} from "@/components/monster";
import {monsterAdjectives} from "@/components/monster";
import {addItem} from "@/components/inventory";


function generateMonster() {
  player.monsterAdjective = monsterAdjectives[Math.round(Math.random()*monsterAdjectives.length)]
  player.monsterName=monsterNames[Math.round(Math.random()*monsterNames.length)]; //generate randomName
  player.monsterHPMax=10 + 10*(player.stage*player.area) + Math.round(Math.random()*player.monstersDefeated);
  player.monsterHP=player.monsterHPMax;
  player.monsterProgressMax=100;
  player.monsterProgress = 0; //reset progress of monster attack
  player.monsterAttack= 5*(player.stage) + Math.round(Math.random()*player.monstersDefeated)
  player.monsterDefense = player.stage+(player.area-1)*5 * player.area
  player.monsterAdjective.monsterEffect();
}
function generateLoot() {
  let random = Math.round(Math.random()*10);
  console.log(random)
  random=10;
  if(random<=5) {
    // 5/10 generate gold
    if(player.items["gold"].amount<player.items["gold"].max) {
      player.items["gold"].amount++;
    }
  } else if(random<=8) {
    // 3/10 generate bones
    if(player.items["bones"].amount<player.items["bones"].max) {
      if(player.items["bones"].acquired==false) player.items["bones"].acquired=true;
      player.items["bones"].amount++;
    }
  } else if(random<=9) {
    // 1/10 generate gem
    let gems = ["fireGem", "earthGem", "waterGem", "airGem","shadowGem", "lightGem", "arcaneGem"]
    let r = Math.round(Math.random()*gems.length) -1;
    if(player.items[gems[r]].amount<player.items[gems[r]].max) {
      if(player.items[gems[r]].acquired==false) player.items[gems[r]].acquired=true;
      player.items[gems[r]].amount++;
    }
  } else {
    // 1/10 generate item
    let adj;
    monsterAdjectives.forEach((adjective) => {if(adjective.adjective === player.monsterAdjective.adjective) adj=adjective});
    addItem("Sword", "Swordy Sword", adj.effectDescription, adj.effect, adj.remove)

  }
}
function advanceStage(slain) {
  //allow people to advance normally if stage/area less than highest
  if((player.stage<player.maxStage || player.area <player.maxArea) && (player.stage<10)) {
    player.stage++;
    if(slain) {
      player.monstersDefeated++; //increment monsters
      player.exp+=10*(player.stage+player.area*5*player.area);
      generateLoot();
    }
    generateMonster();
  } else {
    if(slain) {
      player.monstersDefeated++; //increment monsters
      player.exp+=10*(player.stage+player.area*5*player.area);
      generateLoot();
    }
    if(player.stage===10) {
      advanceArea();
    } else if(player.monstersDefeated===10) {
      player.maxStage++;
      player.stage++;
      player.monstersDefeated=0;
    }
    generateMonster();
  }
}
function advanceArea() {
  if(player.area<player.maxArea) {
    player.area++ //allow people to get up to max area achieved
    player.stage=1;
  } else if(player.stage===10 && player.monstersDefeated===1) {
      if(player.area===player.maxArea){
        player.maxArea++;
        player.area++;
        player.stage = 1;
        player.maxStage = 1;
        player.monstersDefeated=0;
      }
  }
}
function decreaseStage() {
  if(player.stage>1) {
    player.stage--;
    generateMonster();
  }
}
function decreaseArea() {
  if(player.area>1) {
    player.area--;
    generateMonster();
  }
}
function attack() {
  if(player.monsterName==="Nothing") generateMonster();
  this.cost = 1;
  player.swapAction("Attack",10,"Red",this.cost,"Stamina",() => {
    player.monsterHP= player.monsterDefense - player.playerAttack;
    if(player.monsterHP<=0) {
      advanceStage(true)
    }
  },false)
}
</script>

<template>
<div style="display: flex;" class="w3-bar">
  <button class="w3-btn w3-border" style="width: 20%" @click="decreaseArea()" :disabled="player.area===1">&lt&lt-</button>
  <button class="w3-btn w3-border" style="width: 20%" @click="decreaseStage()" :disabled="player.stage===1">&lt-</button>
  <div style="display: flex; width: 20%" class="w3-border">
    <p class="w3-center" style="width: 100%">Area: {{player.area}}</p>
    <br>
    <p class="w3-center" style="width: 100%">Stage: {{player.stage}}</p>
  </div>
  <button class="w3-btn w3-border" style="width: 20%" @click="advanceStage(false)" :disabled="player.stage<player.maxStage || !(player.area<player.maxArea) || player.stag===10">-></button>
  <button class="w3-btn w3-border noPadding" style="width: 20%" @click="advanceArea()" :disabled="player.area>=player.maxArea">->></button>
</div>

  <ResourceBar color="red" type="monsterHP"></ResourceBar>
  <ResourceBar color="pale-red" type="monsterProgress"></ResourceBar>

  <table>
    <tr>
      <th>Currently Facing:</th>
      <td>{{player.monsterAdjective.adjective}} {{player.monsterName}}</td>
    </tr>
    <tr>
      <th>Monster Attack:</th>
      <td>{{player.monsterAttack}}</td>
    </tr>
    <tr>
      <th>Monster Defense: </th>
      <td>{{player.monsterDefense}}</td>
    </tr>
  </table>

  <button class="w3-btn w3-bar w3-border" style="width: 100%" @click="attack()" :disabled="player.stamina<5 || player.health<player.monsterAttack">Start Combat</button>
  <button class="w3-btn w3-bar w3-border" style="width: 100%" @click="generateMonster()">Run Away</button>
  <button @click="player.monstersDefeated+=10">Add Monsters Defeated</button>
  <button @click="player.maxArea+=9">Area Up</button>
  <button @click="player.maxStage+=1"></button>
  {{player.monstersDefeated}}
  <p>Current Action: {{player.action.actionName}}</p>
  <p>Saved Action: {{player.tempAction.actionName}}</p>
  <p>{{player.tempAction}}</p>
  <span>{{player.action.actionResult}}</span>
  <br>
  <span>{{player.monsterAdjective.adjective}}</span>
</template>

<style scoped>
  .noPadding {
    padding: 0;
  }
</style>