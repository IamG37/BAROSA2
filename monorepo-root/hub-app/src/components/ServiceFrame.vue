<template>
  <iframe :src="src" style="width:100%;height:90vh;border:none;" />
</template>
<script setup lang="ts">
defineProps<{ src: string }>()
</script> 