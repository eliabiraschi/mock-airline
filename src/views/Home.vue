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
            :suggestions="originSuggetions"
            :errorMsg="originErrorMsg"
            @selected="originSelected"
          />
          <TextInput
            label="Destination"
            :suggestions="destinationSuggestions"
            :errorMsg="destinationErrorMsg"
            @selected="destinationSelected"
          />
          <Datepicker
            label="Departure"
            @selected="departureSelected"
            :errorMsg="departureErrorMsg"
            :from="new Date()"
            style="margin-bottom: 3.2rem;"
          />
          <Datepicker
            label="Return"
            @selected="returnSelected"
            :from="new Date(departure)"
            style="margin-bottom: 3.2rem;"
          />
        </div>
        <div>
          <button class="modal__submit" @click="handleSearchClick">search</button>
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
      origin: null,
      destination: null,
      departure: null,
      return: null,
      destinationSuggestions: [],
      originErrorMsg: null,
      destinationErrorMsg: null,
      departureErrorMsg: null,
    }
  },
  computed: {
    originSuggetions() {
      return this.$store.getters.getOriginSuggestions
    },
  },
  mounted() {
    this.$store.dispatch('fetchAirports')
  },
  methods: {
    originSelected(value) {
      this.origin = value;
      const originIata = value.match(/\((.*?)\)/)[1]
      this.$store.dispatch({type: 'setOrigin', value: originIata })
      this.destinationSuggestions = this.$store.getters.getDestinationSuggestions(originIata)
      this.originErrorMsg = null
    },
    destinationSelected(value) {
      this.destination = value;
      this.$store.dispatch({type: 'setDestination', value: value.match(/\((.*?)\)/)[1] })
      this.destinationErrorMsg = null
    },
    departureSelected(value){
      this.departure = value;
      this.$store.dispatch({type: 'setDeparture', value: `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}` })
      this.departureErrorMsg = null
    },
    returnSelected(value){
      this.return = value;
      this.$store.dispatch({type: 'setReturn', value: `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}` })
    },
    handleSearchClick(){
      if (this.origin === null || this.origin.length === 0) {
        this.originErrorMsg = "Please select a valid origin"
      } else if (this.destination === null || this.destination.length === 0) {
        this.destinationErrorMsg = "Please select a valid destination"
      } else if (this.departure === null) {
        this.departureErrorMsg = "Please select a departure"
      } else {
        this.$router.push('search')
      }
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
      background: $PRIMARY_ALT;
      border-radius: 3px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.7rem;
      text-transform: uppercase;
      color: $WHITE;
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
