<script setup>
import {player} from "@/components/player";
import ResourceBar from "@/components/ResourceBar.vue";
import {monsterNames} from "@/components/monster";
import {monsterAdjectives} from "@/components/monster";

function generateMonster() {
  player.monsterAdjective = monsterAdjectives[Math.round(Math.random()*monsterAdjectives.length)]
  player.monsterName=monsterNames[Math.round(Math.random()*monsterNames.length)]; //generate randomName
  player.monsterHPMax=10 + 10*(player.stage*player.area) + Math.round(Math.random()*player.monstersDefeated);
  player.monsterProgressMax=100;
  player.monsterProgress = 0; //reset progress of monster attack
  player.monsterAttack= 5*(player.stage) + Math.round(Math.random()*player.monstersDefeated)
  player.monsterAdjective.monsterEffect();
  player.monsterHP=player.monsterHPMax;
}
function advanceStage(slain) {
  //allow people to advance normally if stage/area less than highest
  if(player.stage<player.maxStage || player.area <player.maxArea) {
    player.stage++;
  } else {
    player.monstersDefeated++; //increment monsters
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
  if(player.stage===10 && player.monstersDefeated===1) {
    if(player.area===player.maxArea){
      player.maxArea++;
      player.area++;
      player.stage = 1;
      player.maxStage = 1;
    }
  } else if(player.area<player.maxArea) {
    this.area++ //allow people to get up to max area achieved
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
</script>

<template>
<div style="display: flex;" class="w3-bar">
  <button class="w3-btn w3-border" style="width: 20%" @click="decreaseArea()">&lt&lt-</button>
  <button class="w3-btn w3-border" style="width: 20%" @click="decreaseStage()">&lt-</button>
  <div style="display: flex; width: 20%" class="w3-border">
    <p class="w3-center" style="width: 100%">Area: {{player.area}}</p>
    <br>
    <p class="w3-center" style="width: 100%">Stage: {{player.stage}}</p>
  </div>
  <button class="w3-btn w3-border" style="width: 20%" @click="advanceStage">-></button>
  <button class="w3-btn w3-border noPadding" style="width: 20%" @click="advanceArea()">->></button>
</div>

  <ResourceBar color="red" type="monsterHP"></ResourceBar>
  <ResourceBar color="orange" type="monsterProgress"></ResourceBar>

  <table>
    <tr>
      <th>Currently Facing:</th>
      <td>{{player.monsterAdjective.adjective}} {{player.monsterName}}</td>
    </tr>
    <tr>
      <th>Their Attack:</th>
      <td>{{player.monsterAttack}}</td>
    </tr>
  </table>

  <button class="w3-btn w3-bar w3-border" style="width: 100%" @click="player.fight()">Start Combat</button>
  <button class="w3-btn w3-bar w3-border" style="width: 100%" @click="generateMonster()">Run Away</button>
  <button @click="player.monstersDefeated+=10">Add Monsters Defeated</button>
  {{player.monstersDefeated}}
</template>

<style scoped>
  .noPadding {
    padding: 0;
  }
</style>