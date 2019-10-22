<template>
  <i>
    <Logo v-if="name==='logo'" class="icon" :fill="color" />
    <Danger v-if="name==='danger'" class="icon" :fill="color" />
    <Calendar v-if="name==='calendar'" class="icon" :fill="color" />
    <Arrow v-if="name==='arrow'" class="icon" :fill="color" />
    <Arrow v-if="name==='arrow-rev'" class="icon icon__arrow_rev" :fill="color" />
    <Airplane v-if="name==='airplane'" class="icon" :fill="color" />
  </i>
</template>

<script>
import Logo from '../assets/logo.svg';
import Danger from '../assets/danger.svg';
import Calendar from '../assets/calendar.svg';
import Arrow from '../assets/arrow.svg';
import Airplane from '../assets/airplane.svg';
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
    Arrow,
    Airplane,
  },
}
</script>

<style lang="scss" scoped>
.icon__arrow_rev {
  transform: rotate(180deg)
}
</style>
