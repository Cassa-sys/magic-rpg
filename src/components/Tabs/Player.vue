<script setup>
import {player} from "@/components/player";
</script>

<template>
  <div style="display: flex" class="w3-container">
    <input v-model="player.name" class="w3-input w3-border" type="text" style="background-color: rgb(47,47,47,1); height: 53px ; width: auto; color: white" >
  </div>
  <p>Max monster area reached: {{player.maxArea}}</p>
  <table>
    <li v-for="skill in player.skills">
      <tr>
        <th>{{skill.name}}</th>
        <td>{{skill.description}}</td>
      </tr>
    </li>
  </table>

</template>

<style scoped>

</style>