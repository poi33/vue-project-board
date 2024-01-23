<script setup lang="ts">
    import { ref } from 'vue'
    const count = ref(0);

    function add() {
        count.value++;
    }
</script>

<template>
    <button @click="add">Clicked {{ count }} times</button>
</template>

<style scoped>
    button {
        border: 5px solid red;
    }
</style>