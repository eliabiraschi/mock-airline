<template>
  <div
    class="text-input"
    v-bind:class="{ 'text-input__hasFocus': hasFocus || isNotEmpty, 'text-input__hasError': errorMsg !== null }"
  >
    <label class="text-input__label" v-if="hasFocus || isNotEmpty">{{label}}</label>
    <input
      class="text-input__field"
      type="text"
      v-model="value"
      :placeholder="!hasFocus ? label : ''"
      @focus="toggleFocus"
      @blur="toggleBlur"
    />
    <div class="text-input__error" v-if="errorMsg !== null">
      <Icon class="text-input__error-icon" name="danger" color="#C6007E" /><span>{{errorMsg}}</span>
    </div>
    <div
      class="text-input__suggestions"
      v-if="error === null && suggestions !== null && isNotEmpty && filteredSuggestions.length > 1"
    >
      <ul>
        <li v-for="item in filteredSuggestions" v-bind:key="item">
          <a href="#" @click="selected(item)">{{item}}</a>
        </li>
      </ul>
    </div>
  </div>  
</template>

<script>
import Icon from './Icon'
export default {
  name: 'textinput',
  components: {
    Icon,
  },
  data() {
    return {
      hasFocus: false,
      value: '',
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
    suggestions: {
      type: Array,
      default: null,
    },
  },
  computed: {
    isNotEmpty() {
      return this.value.length > 0;
    },
    filteredSuggestions() {
      if (this.value.length === 0) {
        return this.suggestions;
      } else {
        return this.suggestions
          .filter(item => item.toLowerCase().includes(this.value.toLowerCase()))
          .sort()
      }
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
@import "../styles/vars";
  .text-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: $WHITE;
    border: 1px solid $GREY_ALT;
    border-radius: 2px;
    padding: 0.9rem;
    min-height: 3.2rem;
    max-height: 3.2rem;
    margin-bottom: 3.2rem;
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
      input {
        color: $ACCENT;
        background: $WHITE_ALT;
      }
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
    .text-input__field {
      border: none;
      outline: none;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;
      line-height: 1.2rem;
      color: $GREY_ALT;
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
    .text-input__suggestions {
      background-color: $WHITE;
      width: 100%;
      margin-top: 0.6rem;
      box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
      color: $GREY_ALT;
      z-index: 2;
      ul {
        list-style-type: none;
        max-height: 15rem;
        overflow-x: auto;
        li {
          margin-bottom: 0.5rem;
          a {
            color: $GREY_ALT;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
