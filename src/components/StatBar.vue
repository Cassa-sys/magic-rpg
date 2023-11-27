<script setup>
import {reactive, ref} from "vue";
import {player} from "@/components/player";
import {gameControl} from "@/components/game-loop";
</script>

<template>
  <button style="position: absolute;" @click="player.rest()">Rest</button>
  <button style="position: absolute;  right: 0px;" @click="gameControl.pauseGame()">{{ gameControl.state }}</button>
  <h1 style="text-align: center">{{player.name}}</h1>
  <table>
    <tr>
      <th>Health:</th>
      <td style="width: 100%">
        <div class="w3-dark-grey" style="width: 100%">
          <div class="w3-container bar w3-center w3-red" v-bind:style="{width: ((player.health/player.maxHealth)*100 + '%')}">{{player.health}}/{{player.maxHealth}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>Mana:</th>
      <td style="width: 100%">
        <div class="w3-dark-grey" style="width: 100%">
          <div class="w3-container w3-blue bar w3-center" v-bind:style="{width: ((player.mana/player.maxMana)*100 + '%')}">{{player.mana}}/{{player.maxMana}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>Stamina:</th>
      <td style="width: 100%">
        <div class="w3-dark-grey" style="width: 100%">
          <div class="w3-container w3-orange bar w3-center" v-bind:style="{width: ((player.stamina/player.maxStamina)*100 + '%')}">{{player.stamina}}/{{player.maxStamina}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>Exp:</th>
      <td style="width: 100%">
        <div class="w3-dark-grey" style="width: 100%">
          <div class="w3-container bar w3-center w3-light-gray" v-bind:style="{width: ((player.exp/player.maxXP)*100 + '%')}">{{ player.exp }}/{{ player.maxXP }}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>Action: {{player.action.actionName}}</th>
      <td style="width: 100%">
        <div class="w3-dark-grey" style="width: 100%">
          <div class="w3-container bar w3-center" v-bind:style="{width: ((player.action.actionProgress/player.action.actionMax)*100 + '%'), backgroundColor: player.action.actionColor}">{{player.action.actionProgress}}/{{player.action.actionMax}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>Level:</th>
      <td>{{player.level}}</td>
    </tr>
    <tr>
      <th style="white-space: nowrap">Skill Points:</th>
      <td>{{player.skillPoints}}</td>
    </tr>
  </table>
</template>

<style scoped>
  .bar {
    height: 32px;
    //width: v-bind('bar.width');
    padding: 0;
    user-select: none;
  }
</style>
<!--
<div class="w3-dark-grey">
  <div id="myBar" class="w3-container w3-red bar"></div>
</div>
{{bar}}
<button @click="start()">Click Me</button>
-->