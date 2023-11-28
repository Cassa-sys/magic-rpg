<script setup>

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
</script>

<template>
  <div class="w3-btn w3-border" @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave()" @mousemove="mouseMove($event)">
  </div>
  <div id="popup" class="w3-border" v-if="popup" style="position: absolute">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>