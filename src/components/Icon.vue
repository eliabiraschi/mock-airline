<template>
  <div>
    <Logo v-if="name==='logo'" class="icon" :fill="color" />
    <Danger v-if="name==='danger'" class="icon" :fill="color" />
    <Calendar v-if="name==='calendar'" class="icon" :fill="color" />
  </div>
</template>

<script>
import Logo from '../assets/logo.svg';
import Danger from '../assets/danger.svg';
import Calendar from '../assets/calendar.svg';
export default {
  name: 'Icon',
  props: {
    name: String,
    color: {
      type: String,
      default: '#FFF',
    },
  },
  components: {
    Logo,
    Danger,
    Calendar,
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 28px;
  height: 28px;
}
</style>
