<template>
  <div
    class="text-input"
    v-bind:class="{ 'text-input__hasFocus': isNotEmpty }"
  >
    <div class="text-input__input-wrapper">
      <label class="text-input__label" v-if="isNotEmpty">{{label}}</label>
      <Datepicker
        input-class="datepicker__field"
        :placeholder="label"
        @selected="selected"
        @focus="toggleFocus"
        @blur="toggleBlur"
      />
    </div>
    <span class="calendar">
      <Icon name="calendar" color="#919191" />
    </span>
    <div class="text-input__error" v-if="error !== null"></div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Icon from './Icon';
export default {
  name: 'datepicker',
  components: {
    Datepicker,
    Icon,
  },
  data() {
    return {
      hasFocus: false,
      value: null,
      error: null,
    }
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    errorMsg: {
      type: String,
      default: null,
    },
  },
  computed: {
    isNotEmpty() {
      return this.value !== null;
    },
  },
  methods: {
    toggleFocus() {
      this.hasFocus = true;
    },
    toggleBlur() {
      this.hasFocus = false;
    },
    selected(value) {
      this.value = value;
      this.$emit('selected', value);
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-input {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    background: #FFFFFF;
    border: 1px solid #919191;
    border-radius: 2px;
    padding: 0.9rem;
    min-height: 3.2rem;
    max-height: 3.2rem;
    margin-bottom: 3.2rem;
    &.text-input__hasFocus {
      padding-top: 0.3rem;
    }
    .text-input__label {
      font-family: Roboto;
      font-style: normal;
      font-weight: 900;
      font-size: 0.8rem;
      line-height: 0.9rem;
      text-transform: uppercase;
      color: #919191;
    }
    .calendar {
      position: absolute;
      top: 0.9rem;
      right: 0.7rem;
    }
  }
</style>
