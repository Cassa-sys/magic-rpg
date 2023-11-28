<script setup>
import {player} from "@/components/player";

defineProps({
  type: String,
  color: String
})
</script>

<template>
  <div class = "w3-dark-gray" style="width: 100%;">
    <div class="w3-container bar w3-center" v-bind:class="'w3-' + color" v-bind:style="{width: ((player[type]/player[type + 'Max'])*100 + '%')}">{{ player[type] }}/{{ player[type + 'Max'] }}</div>
  </div>
</template>

<style scoped>
.bar {
  height: 32px;
//width: v-bind('bar.width');
  padding: 0;
  user-select: none;
}
</style>