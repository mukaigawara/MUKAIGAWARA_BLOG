<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);
const onClick = (): void => {
  count.value++;
};
</script>

<template>
  <button @click="onClick">Increase</button>
  <p>Count: {{ count }}</p>
</template>
