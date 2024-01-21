<script setup>
import {training} from "@/components/Training";
import HoverElement from "@/components/HoverElement.vue";
import {player} from "@/components/player";

function trainingAction(training) {
  player.swapAction(training.name,training.progressMax,training.actionColor,training.progressCost,training.resource,training.effect,true);

}
</script>

<template>
  <div style="display: flex">
    <div v-for="action in training">
      <HoverElement v-if="action.unlocked">
        <template v-slot:header>
          <button class="w3-btn w3-border" @click="trainingAction(action)">
            {{action.name}}
          </button>
        </template>
        <p>{{action.description}}</p>
      </HoverElement>
    </div>
  </div>
</template>

<style scoped>

</style>