<script setup>
  import {player} from "@/components/player";
  import {reactive} from "vue";
  import {skills} from "@/components/skills";
  import {ref} from "vue";

  let popup = ref(false);
  function mouseEnter(event) {
    console.log("mouse entered")
    popup.value=true;
    // this.$el.addEventListener('mousemove', this.mouseMove, false);
  }
  function mouseLeave(event) {
    popup.value=false;
  }
  function mouseMove(event) {
    document.getElementById("popup").style.top = event.clientY+10+'px';
    document.getElementById("popup").style.left = event.clientX+10+'px';

    console.log(event.screenX, event.screenY)
  }
  function addSkill(skill) {
    if(player.skillPoints>=skill.cost) {
      skill.effect();
      player.skills.push(skill)
    }
  }


</script>

<template>
<!--  TODO: fix this-->
<!--  <div style="display: flex">-->
<!--    <div v-for="skill in skills">-->
<!--      <div class="w3-btn w3-border" @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave()" @mousemove="mouseMove($event)">-->
<!--        <button @click="addSkill(skill)">{{skill.name}}</button>-->
<!--      </div>-->
<!--      <div id="popup" class="w3-border" v-if="popup" style="position: absolute">-->
<!--        <p>{{skill.description}}</p>-->
<!--        <p>Conflicts with: {{skill.conflicts}}</p>-->
<!--        <p>Cost: {{skill.cost}}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


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
</template>

<style scoped>

</style>