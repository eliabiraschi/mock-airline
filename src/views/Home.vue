<template>
  <div class="home-page">
    <div class="modal">
      <div class="modal__header">
        <Icon name="logo" />
        <span>mito airline</span>
      </div>
      <div class="modal__body">
        <div class="modal__body_inputfields">
          <TextInput
            label="Origin"
            :suggestions="suggestions"
            @selected="originSelected"
          />
          <TextInput
            label="Destination"
            :suggestions="suggestions"
            @selected="destinationSelected"
          />
          <Datepicker
            label="Departure"
            @selected="departureSelected"
          />
          <Datepicker
            label="Return"
            @selected="returnSelected"
          />
        </div>
        <div>
          <button class="modal__submit">search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../components/Icon';
import TextInput from '../components/TextInput';
import Datepicker from '../components/Datepicker';
export default {
  name: 'home',
  components: {
    Icon,
    TextInput,
    Datepicker,
  },
  data() {
    return {
      suggestions: ['Rome','Berlin','London','Budapest'],
      origin: null,
      destination: null,
      departure: null,
      return: null,
    }
  },
  methods: {
    originSelected(value) {
      this.origin = value;
    },
    destinationSelected(value) {
      this.departure = value;
    },
    departureSelected(value){
      this.departure = value;
    },
    returnSelected(value){
      this.return = value;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";
.home-page {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
  }
}
.modal {
  width: 35rem;
  background: $WHITE;
  box-shadow: $BOX_SHADOW;
  border-radius: $BORDER_RADIUS;
  display: flex;
  flex-direction: column;
  .modal__header {
    .icon {
      width: 1.3rem;
      height: 1.3rem;
    }
    background-color: $PRIMARY;
    color: $WHITE;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-left: 1rem;
      font-style: normal;
      font-weight: 500;
      font-size: 1.1rem;
      line-height: 1.3rem;
      text-transform: uppercase;
    }
  }
  .modal__body {
    padding: 1.5rem 1.5rem 2.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .modal__body_inputfields {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }
    .modal__submit {
      background: #3434E0;
      border-radius: 3px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.7rem;
      text-transform: uppercase;
      color: #FFFFFF;
      border: none;
      outline: none;
      width: 15rem;
      text-align: center;
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      cursor: pointer;
    }
  }
}
</style>
