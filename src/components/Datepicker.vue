<template>
<div class="outer-wraper">
  <div
    class="text-input"
    v-bind:class="{ 'text-input__hasFocus': isNotEmpty, 'text-input__hasError': errorMsg !== null }"
  >
    <div class="text-input__input-wrapper">
      <label class="text-input__label" v-if="isNotEmpty">{{label}}</label>
      <Datepicker
        input-class="errorMsg === null ? datepicker__field : datepicker__field_error"
        :placeholder="label"
        @selected="selected"
        @focus="toggleFocus"
        @blur="toggleBlur"
      />
    </div>
    <span class="calendar">
      <Icon name="calendar" color="#919191" />
    </span>
  </div>
  <div class="text-input__error" v-if="errorMsg !== null">
    <Icon class="text-input__error-icon" name="danger" color="#C6007E" /><span>{{errorMsg}}</span>
  </div>
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
  .outer-wraper {
    display: flex;
    flex-direction: column;
    margin-bottom: 3.2rem;
    align-items: flex-start;
    justify-content: flex-start;
  }
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
    &.text-input__hasFocus {
      padding-top: 0.3rem;
    }
    &.text-input__hasError {
      background: #FFF2FA;
      border: 2px solid #C6007E;
      box-shadow: 0px 0px 10px rgba(198, 0, 126, 0.35);
      border-radius: 3px;
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
  .text-input__error {
    color: #C6007E;
    margin-top: 1.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    line-height: 0.9rem;
    .text-input__error-icon {
      width: 17px;
      height: 17px;
      margin-right: 0.6rem;
    }
  }
</style>
