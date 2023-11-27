<script setup>
  function deleteSave() {
    if(confirm("This will delete your save. Are you sure?")==true) {

    }
  }
</script>

<template>
  <button class="w3-btn w3-border" @click="deleteSave()">Delete Save?</button>
</template>

<style scoped>

</style>