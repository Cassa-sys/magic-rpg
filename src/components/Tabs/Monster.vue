<script setup>
import {player} from "@/components/player";
function changeMonster(monsterName, monsterHealth) {
  player.monsterName=monsterName;
  player.monsterHP=monsterHealth;
  player.monsterMax=monsterHealth;
  player.monsterProgress = 0;
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
        <div class="w3-dark-grey" style="width: 100%">
          <div class="w3-container bar w3-center w3-red" v-bind:style="{width: ((player.monsterHP/player.monsterMax)*100 + '%')}">{{player.monsterHP}}/{{player.monsterMax}}</div>
        </div>
      </td>
    </tr>
  </table>
  <button class="w3-btn w3-bar w3-border" style="width: 100%">Start Combat</button>
</template>

<style scoped>
  .noPadding {
    padding: 0;
  }
</style>