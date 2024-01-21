<script setup>
import { ref} from "vue";
import {player} from "@/components/player";
import Tabs from "@/components/Tabs.vue";
import StatBar from "@/components/StatBar.vue";
import Adventure from "@/components/Tabs/Adventure.vue";
import Magic from "@/components/Tabs/Magic.vue";
import Skills from "@/components/Tabs/Skills.vue";
import Settings from "@/components/Tabs/Settings.vue";
import Player from "@/components/Tabs/Player.vue";
import Monster from "@/components/Tabs/Monster.vue";
import Inventory from "@/components/Tabs/Equipment.vue";
import {gameControl} from "@/components/game-loop";
import ResourceBar from "@/components/ResourceBar.vue";
import HoverElement from "@/components/HoverElement.vue";
import SpellCrafting from "@/components/Tabs/SpellCrafting.vue";
import Training from "@/components/Tabs/Training.vue";
let gameName = "RPG Game"
let gameVersion = "Alpha 1.0"

let gameID =ref(function () {
  setInterval(() => {gameControl.gameLoop(tickSpeed)},tickSpeed)
});
let ticks = 10;
let tickSpeed = 10;
function saveGame() {
  console.log("saved")
  localStorage.setItem("rpgSave", JSON.stringify(player))
}
function loadGame() {
  player.load()
  showMenu.value=false;
}
function initializeGame() {
  if(confirm("This will wipe any save you have")===true) {
    showMenu.value=false;
  }
}
let showMenu = ref(true);
let loadedSave = ref(JSON.parse(localStorage.getItem("rpgSave")))
</script>

<template>
<!--  This is the menu that pops up at start; with new game, load etc-->
<!--  Temporarily commented out for dev testing-->
  <!--
  <div style="position: absolute; width: 30%;height: 30%; right: 35%; background-color: dimgrey; top:30%" class="w3-border w3-container" v-if="showMenu">
    <h1>Welcome to {{gameName}}</h1>
    <span>Version: {{gameVersion}}</span>
    <br>
    <div class="flex-box" style="width: 100%;">
      <button class="w3-btn w3-border" style="background-color: lightslategrey" @click="initializeGame()">New Game</button>
      <button class="w3-btn w3-border" style="background-color: lightslategrey" @click="loadGame()">Load Game</button>
    </div>
    <div v-if="loadedSave">
      <span>Time of last save: {{loadedSave.date}}</span>
    </div>
  </div>
  -->

  <div class="main">

    <div>
      <button @click="saveGame()">Save</button>
      <button @click="loadGame()">Load</button>
      <button @click="player.exp+=1000">XPUP</button>
      <button @click="player.swapAction('Magic', 100, 'Red', 1, 'Health', () => {player.health+=100}, true)">Magic</button>
      <button @click="gameID()">Loop</button>
    </div>

    <div class="flex-box">
      <div style="width: 80%;height: 100%">
        <Tabs>
          <Adventure>
            <Monster>
              <StatBar><ResourceBar></ResourceBar></StatBar>
            </Monster>
            <Inventory></Inventory>
          </Adventure>
          <Magic><Training /> <SpellCrafting /></Magic>
          <Skills><HoverElement></HoverElement></Skills>
          <Player></Player>
          <Settings></Settings>
        </Tabs>
      </div>
      <div style="width: 20%" class="w3-border">
        <StatBar>
          <HoverElement></HoverElement>
          <ResourceBar></ResourceBar>
        </StatBar>
      </div>
    </div>


    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  </div>

</template>

<style scoped>

  .flex-box {
    display: flex;
  }


</style>
<script>

</script>
