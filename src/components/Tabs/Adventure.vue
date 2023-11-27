<script setup>
import {player} from "@/components/player";
import Inventory from "@/components/Tabs/Equipment.vue";
import Monster from "@/components/Tabs/Monster.vue";
</script>

<template>

  <div style="display: flex">
    <div style="width: 60%" class="w3-border"><Monster></Monster></div>
    <div style="width: 40%" class="w3-border"><Inventory></Inventory></div>
  </div>

<!--  <button @click="player.exp+=100" class="w3-btn">EXP UPP</button>-->
<!--  <button @click="player.levelUp()" class="w3-btn">LVL UP</button>-->
</template>

<style scoped>

</style>