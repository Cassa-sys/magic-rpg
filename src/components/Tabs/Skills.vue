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
  <table style="width: 100%" class="w3-table w3-bordered">
    <li v-for="skill in skills" >
      <tr>
        <th style="width: 10%;">{{skill.name}}</th>
        <td style="width: 40%;">{{skill.description}}</td>
        <td style="width: 30%">Skill Conflicts: {{skill.conflicts}}</td>
        <td style="width: 10%; white-space: nowrap">Cost: {{skill.cost}} Skill Points</td>
        <td>
          <button class="w3-btn w3-border" @click="addSkill(skill)">Acquire Skill</button>
        </td>
      </tr>
    </li>
  </table>
  <button @click="addSkill('Pyromancy', 'You\'ve always loved fire.', () => {player.maxMana*=10})">Add Skill</button>
</template>

<style scoped>

</style>