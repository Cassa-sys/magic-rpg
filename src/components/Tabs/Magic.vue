<script setup>
import {ref} from "vue";
import Training from "@/components/Tabs/Training.vue";
import SpellCrafting from "@/components/Tabs/SpellCrafting.vue";

let currentTab = ref(0);

function changeTab(tabNum) {
  currentTab.value=tabNum;
  let elems = document.getElementsByClassName("magic");
  for (let i=0;i< elems.length;i++) {
    elems[i].classList.add("w3-blue-gray")
  }
  elems[tabNum].classList.remove("w3-blue-gray")
}
</script>

<template>
<!--  Two different tabs: Training, and Spell Crafting-->
  <div class="w3-bar" style="width: 100%">
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red magic" @click="changeTab(0)" style="width: 50%">Training</button>
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red w3-blue-gray magic" @click="changeTab(1)" style="width: 50%">SpellCrafting</button>
  </div>

  <Training v-if="currentTab==0"></Training>
  <SpellCrafting v-if="currentTab==1"></SpellCrafting>
</template>

<style scoped>

</style>