<template>
  <div
    class="text-input"
    v-bind:class="{ 'text-input__hasFocus': hasFocus || isNotEmpty }"
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
    <div class="text-input__error" v-if="error !== null"></div>
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
export default {
  name: 'textinput',
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
  .text-input {
    display: flex;
    flex-direction: column;
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
    .text-input__field {
      border: none;
      outline: none;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;
      line-height: 1.2rem;
      color: #919191;
    }
    .text-input__suggestions {
      background-color: #FFF;
      width: 100%;
      margin-top: 0.6rem;
      box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
      color: #919191;
      z-index: 2;
      ul {
        list-style-type: none;
        li {
          margin-bottom: 0.5rem;
          a {
            color: #919191;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
