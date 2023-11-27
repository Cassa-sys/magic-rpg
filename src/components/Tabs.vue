<script setup>
import {ref} from "vue";
import Adventure from "@/components/Tabs/Adventure.vue";
import Magic from "@/components/Tabs/Magic.vue";
import Skills from "@/components/Tabs/Skills.vue";
import Player from "@/components/Tabs/Player.vue";
import Settings from "@/components/Tabs/Settings.vue";


let currentTab = ref(0);

function changeTab(tabNum) {
  currentTab.value=tabNum;
  let elems = document.getElementsByClassName("tab-bar");
  for (let i=0;i< elems.length;i++) {
    elems[i].classList.add("w3-blue-gray")
  }
  elems[tabNum].classList.remove("w3-blue-gray")
}
</script>

<template>

  <div class="w3-bar" style="width: 100%">
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red" @click="changeTab(0)" style="width: 20%">Adventure</button>
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red w3-blue-gray" @click="changeTab(1)" style="width: 20%">Magic</button>
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red w3-blue-gray" @click="changeTab(2)" style="width: 20%">Skills</button>
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red w3-blue-gray" @click="changeTab(3)" style="width: 20%">Player</button>
    <button class="tab-bar w3-bar-item w3-btn w3-border w3-border-light-gray w3-block w3-hover-border-red w3-blue-gray" @click="changeTab(4)" style="width: 20%">Settings</button>
  </div>
<!--  {{currentTab}}-->
  <Adventure v-if="currentTab==0"/>
  <Magic v-if="currentTab==1" />
  <Skills v-if="currentTab==2" />
  <Player v-if="currentTab==3" />
  <Settings v-if="currentTab==4" />
</template>

<style scoped>

</style>