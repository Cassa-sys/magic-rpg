<script setup>
import {player} from "@/components/player";
</script>

<template>
  <div style="display: flex" class="w3-container">
    <input v-model="player.name" class="w3-input w3-border" type="text" style="background-color: rgb(47,47,47,1); height: 53px ; width: auto; color: white" >
  </div>
  <h4>Statistics</h4>
  <p>Max area reached: {{player.maxArea}}</p>
  <h4>Skills</h4>
  <table class="w3-table">
    <tr>
      <th>Skill Name</th>
      <th>Description</th>
    </tr>
    <tr v-for="skill in player.skills">
        <td>{{skill.name}}</td>
        <td>{{skill.description}}</td>
    </tr>
  </table>

</template>

<style scoped>

</style>