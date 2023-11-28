<script setup>
import {player} from "@/components/player";
import ResourceBar from "@/components/ResourceBar.vue";
let monsterNames = [
    ""
];
let monsterAdjectives = [

]
function generateMonster() {
  player.monsterName=monsterNames[Math.random()*monsterNames.length]; //generate randomName
  player.monsterHPMax=10 + 10*(player.stage*player.area) + Math.round(Math.random()*this.monstersDefeated);
  player.monsterHP=player.monsterHPMax;
  player.monsterProgress = 0; //reset progress of monster attack
  player.monsterAttack= 10 + 10*(player.stage*player.area) + Math.round(Math.random()*this.monstersDefeated)
}
function advanceStage() {
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
</script>

<template>
<div style="display: flex;" class="w3-bar">
  <button class="w3-btn w3-border" style="width: 20%">&lt&lt-</button>
  <button class="w3-btn w3-border" style="width: 20%">&lt-</button>
  <div style="display: flex; width: 20%" class="w3-border">
    <p class="w3-center" style="width: 100%">Area: {{player.area}}</p>
    <br>
    <p class="w3-center" style="width: 100%">Stage: {{player.stage}}</p>
  </div>
  <button class="w3-btn w3-border" style="width: 20%">-></button>
  <button class="w3-btn w3-border noPadding" style="width: 20%">->></button>
</div>
  <table>
    <tr>
      <th>{{ player.monsterName }}:</th>
      <td style="width: 100%">
        <ResourceBar color="red" type="monsterHP"></ResourceBar>
      </td>
    </tr>
    <tr>
      <td>Attacking</td>
      <td><ResourceBar color="orange" type="monsterProgress"></ResourceBar></td>
    </tr>
  </table>
  <button class="w3-btn w3-bar w3-border" style="width: 100%">Start Combat</button>
</template>

<style scoped>
  .noPadding {
    padding: 0;
  }
</style>