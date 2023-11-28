<script setup>
  import {player} from "@/components/player";
  import {reactive} from "vue";
  import {skills} from "@/components/skills";
  function addSkill(skill) {
    if(player.skillPoints>=skill.cost) {
      skill.effect();
      player.skills.push(skill)
    }
  }

</script>

<template>
  <table class="w3-table w3-bordered w3-hoverable" style="width: 100%; table-layout: auto">
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Conflicts</th>
      <th>Price</th>
    </tr>

<!--    Display skills-->
    <tr v-for="skill in skills" >
        <td style="">{{skill.name}}</td>
        <td style="width: 50%;">{{skill.description}}</td>
        <td style="width: 30%">Skill Conflicts: {{skill.conflicts}}</td>
        <td style="width: 10%; white-space: nowrap">Cost: {{skill.cost}} Skill Points</td>
        <td>
          <button class="w3-btn w3-border" @click="addSkill(skill)">Acquire Skill</button>
        </td>
    </tr>
  </table>
  <button @click="addSkill('Pyromancy', 'You\'ve always loved fire.', () => {player.manaMax*=10})">Add Skill</button>
</template>

<style scoped>

</style>