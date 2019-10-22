<template>
<div class="searchPage">
  <div class="header">
    <Icon name="logo" />
    <div class="header__origin">
      <span class="header__origin_label">leaving from</span>
      <span class="header__origin_airport">{{originFullName}}</span>
    </div>
    <div class="header__arrowsWrapper">
      <Icon class="arrow" name="arrow" />
      <Icon class="arrow" name="arrow-rev" />
    </div>
    <div class="header__destination">
      <span class="header__destination_airport">{{destinationFullName}}</span>
    </div>
  </div>
  <div class="title">
    <Icon name="airplane" />
    <span>select flight</span>
  </div>

  <div class="content">

    <Cart />

    <div class="content__timetables">
      <Timetable
        v-if="timetableOutbound !== null"
        label="outbound"
        :origin="origin"
        :destination="destination"
        :date="new Date(departure)"
        :schedule="timetableOutbound"
      />
      <Timetable
        v-if="timetableInbound !== null"
        label="inbound"
        :origin="destination"
        :destination="origin"
        :date="new Date(returnDate)"
        :schedule="timetableInbound"
        :isInbound="true"
      />
      <div v-if="timetableInbound === null" class="inbound-search">
        <div class="inbound-search__header">
          <span class="inbound-search__header-outbound">inbound</span>
          <span class="inbound-search__header-airport">{{destinationFullName}}</span>
          <Icon class="inbound-search__header-arrow" name="arrow-rev" color="#06038D" />
          <span class="inbound-search__header-airport">{{originFullName}}</span>
        </div>
        <div class="inbound-search__body">
          <Datepicker
            label="Return"
            :from="new Date(departure)"
            @selected="returnSelected"
          />
          <button
            @click="searchReturn"
          >search</button>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import Icon from '../components/Icon'
import Timetable from '../components/Timetable'
import Cart from '../components/Cart'
import Datepicker from '../components/Datepicker'
export default {
  name: 'search',
  components: {
    Icon,
    Timetable,
    Cart,
    Datepicker,
  },
  data() {
    return {
      return: null,
    }
  },
  computed: {
    origin() {
      return this.$store.state.origin
    },
    destination() {
      return this.$store.state.destination
    },
    departure() {
      return this.$store.state.departure
    },
    returnDate() {
      return this.$store.state.return
    },
    timetableOutbound() {
      return this.$store.state.timetableOutbound
    },
    timetableInbound() {
      return this.$store.state.timetableInbound
    },
    originFullName() {
      return this.$store.getters.getFullAirportName(this.origin)
    },
    destinationFullName() {
      return this.$store.getters.getFullAirportName(this.destination)
    },
  },
  methods: {
    returnSelected(value){
      this.return = value;
      this.$store.dispatch({type: 'setReturn', value: `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}` })
    },
    searchReturn(){
      this.$store.dispatch({ type: 'fetchTimeTable', isInbound: true })
    }
  },
  mounted() {
    this.$store.dispatch({ type: 'fetchTimeTable', isInbound: false })
    if (this.$store.state.return !== null) {
      this.$store.dispatch({ type: 'fetchTimeTable', isInbound: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";
  .searchPage {
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 3.8rem;
  }
  .header {
    background-color: $PRIMARY;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    .header__origin {
      margin-left: 7rem;
      color: $WHITE;
      display: flex;
      flex-direction: column;
      .header__origin_label {
        text-transform: uppercase;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 0.8rem;
        line-height: 0.9rem;
      }
      .header__origin_airport {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 1.3rem;
        line-height: 1.4rem;
        text-transform: capitalize;
        margin-top: 0.2rem;
      }
    }
    .header__arrowsWrapper {
      margin-left: 2.5rem;
      display: flex;
      flex-direction: column;
      .arrow {
        height: 8px;
        margin-top: 2px;
        margin-bottom: 2px;
      }
    }
    .header__destination {
      margin-left: 2.5rem;
      color: $WHITE;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      justify-content: flex-end;
      .header__destination_airport {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 1.3rem;
        line-height: 1.4rem;
        text-transform: capitalize;
        margin-top: 0.2rem;
      }
    }
  }
  .title {
    margin-left: 17rem;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 2.5rem;
      line-height: 3rem;
      text-transform: uppercase;
      color: $PRIMARY_3;
      margin-left: 1.5rem;
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 1.3rem;
    padding-right: 1.3rem;
    justify-content: center;
    .inbound-search {
      background: $WHITE;
      box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      width: 100%;
      margin-bottom: 2.5rem;
      .inbound-search__header {
        background: $GREY;
        padding: 1.1rem 1.3rem;
        .inbound-search__header-outbound {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 1.1rem;
          line-height: 1.3rem;
          text-transform: uppercase;
          color: $GREY;
          margin-right: 3rem;
        }
        .inbound-search__header-airport {
          font-family: Roboto;
          font-style: normal;
          font-weight: bold;
          font-size: 1.4rem;
          line-height: 1.5rem;
          text-transform: capitalize;
          color: $PRIMARY;
          margin-right: 1.5rem;
        }
        .inbound-search__header-arrow {
          margin-right: 1.5rem;
          margin-top: -12px;
        }
      }
      .inbound-search__body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        button {
          margin-left: 1rem;
          background: $PRIMARY_ALT;
          border-radius: 3px;
          padding: 1.1rem 1.5rem;
          border: none;
          outline: none;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 1.2rem;
          line-height: 1.3rem;
          display: flex;
          align-items: center;
          text-align: center;
          text-transform: uppercase;
          cursor: pointer;
          color: $WHITE;
        }
      }
    }
  }
</style>
