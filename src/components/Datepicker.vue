<template>
<div class="outer-wraper">
  <div
    class="text-input"
    v-bind:class="{ 'text-input__hasFocus': isNotEmpty, 'text-input__hasError': errorMsg !== null }"
  >
    <div class="text-input__input-wrapper">
      <label class="text-input__label" v-if="isNotEmpty">{{label}}</label>
      <Datepicker
        :input-class="datepickerClass"
        :placeholder="label"
        @selected="selected"
        @focus="toggleFocus"
        @blur="toggleBlur"
        :disabled-dates="{ to: from }"
      />
    </div>
    <span class="calendar">
      <Icon name="calendar" color="#919191" />
    </span>
  </div>
  <div class="text-input__error" v-if="errorMsg !== null">
    <Icon class="text-input__error-icon" name="danger" color="$ACCENT" /><span>{{errorMsg}}</span>
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
    from: {
      type: Date,
      default: null,
    }
  },
  computed: {
    isNotEmpty() {
      return this.value !== null;
    },
    datepickerClass() {
      return this.errorMsg === null ? 'datepicker__field' : 'datepicker__field_error'
    }
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
@import "../styles/vars";
  .outer-wraper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .text-input {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    background: $WHITE;
    border: 1px solid $GREY_ALT;
    border-radius: 2px;
    padding: 0.9rem;
    min-height: 3.2rem;
    max-height: 3.2rem;
    width: 15rem;
    max-width: 15rem;
    &.text-input__hasFocus {
      padding-top: 0.3rem;
    }
    &.text-input__hasError {
      background: $WHITE_ALT;
      border: 2px solid $ACCENT;
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
      color: $GREY_ALT;
    }
    .calendar {
      position: absolute;
      top: 0.9rem;
      right: 0.7rem;
    }
  }
  .text-input__error {
    color: $ACCENT;
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
