<script>
export default {
  name: "Spacer",
  props: {
    height: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>

<template>
  <div :style="{ height: height + 'px' }"></div>
</template>
