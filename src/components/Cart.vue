<template>
<div class="cart">
  <div class="cart__header">
    <span>flights</span>
    <span class=".cart__header-amount">${{total}}</span>
  </div>
  <div class="cart__body">
    <span v-if="cartIsEmpty" class="cart__body_empty">Choose an outbound flight</span>
    
    <div v-if="outbound!==null" class="flightsummary">
      <div class="flightsummary__left">
        <span class="flightsummary__date-month">{{months[new Date(outbound.departure).getMonth()]}}</span>
        <span class="flightsummary__date-day">{{new Date(outbound.departure).getDate()}}</span>
      </div>
      <div class="flightsummary__right">
        <span class="flightsummary__right-cities">{{`${outbound.origin} -`}}<br/>{{outbound.destination}}</span>
        <span class="flightsummary__right-schedule">{{formatSchedule(outbound.departure, outbound.arrival)}}</span>
      </div>
    </div>

    <div v-if="inbound!==null" class="flightsummary flightsummary_inbound">
      <div class="flightsummary__left">
        <span class="flightsummary__date-month">{{months[new Date(inbound.departure).getMonth()]}}</span>
        <span class="flightsummary__date-day">{{new Date(inbound.departure).getDate()}}</span>
      </div>
      <div class="flightsummary__right">
        <span class="flightsummary__right-cities">{{`${inbound.origin} -`}}<br/>{{inbound.destination}}</span>
        <span class="flightsummary__right-schedule">{{formatSchedule(inbound.departure, inbound.arrival)}}</span>
      </div>
    </div>

  </div>
  <div class="cart__footer">
    <span>total</span>
    <span>${{total}}</span>
  </div>
  <div class="cart__paybutton" :class="{cart__paybutton_active: !cartIsEmpty}">
    <button>pay now</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'cart',
  computed: {
    cartIsEmpty() {
      return this.$store.state.outboundSelectedFare === null
    },
    outbound() {
      return this.$store.state.outboundSelectedFare
    },
    inbound() {
      return this.$store.state.inboundSelectedFare
    },
    months() {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    },
    total() {
      return (((this.inbound || {}).selectedFare || {}).price || 0) + (((this.outbound || {}).selectedFare || {}).price || 0)
    }
  },
  methods: {
    formatSchedule(departure, arrival) {
      const depDate = new Date(departure)
      const arrDate = new Date(arrival)
      const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return `${weekday[depDate.getDay()]} ${depDate.getHours()}:${depDate.getMinutes()} - ${arrDate.getHours()}:${arrDate.getMinutes()}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";
.cart {
  width: 14.5rem;
  margin-right: 1.3rem;
  .cart__header {
    background: $WHITE;
    padding: 1rem 1rem 0 1rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 1rem;
    text-transform: uppercase;
    color: $DARK_GREY;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.2rem;
    .cart__header-amount {
      color: $PRIMARY;
    }
  }
  .cart__body {
    background: $WHITE;
    padding: 1rem 1rem 0 1rem;
    padding-bottom: 1.3rem;
    .cart__body_empty {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.3rem;
      color: $GREY_ALT;
    }
  }
  .cart__footer {
    background: $WHITE;
    background: $PRIMARY;
    color: $WHITE;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    span {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.3rem;
      text-transform: uppercase;
    }
  }
  .cart__paybutton {
    margin-top: 1.3rem;
    button {
      background: LIGHT_GREY;
      border-radius: 3px;
      width: 100%;
      height: 3.2rem;
      border: none;
      outline: none;
      font-family: Roboto;
      font-style: normal;
      font-weight: 900;
      font-size: 1rem;
      line-height: 1.3rem;
      text-transform: uppercase;
      color: $WHITE;
      cursor: pointer;
    }
    &.cart__paybutton_active {
      button {
        background: $ACCENT;
      }
    }
  }
  .flightsummary {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    .flightsummary__left {
      margin-right: 0.9rem;
      background: $WHITE;
      border: 2px solid $G2;
      box-sizing: border-box;
      border-radius: 3px;
      display: flex;
      align-items: center;
      text-align: center;
      flex-direction: column;
      .flightsummary__date-month {
        background: $GREY;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 0.8rem;
        line-height: 0.9rem;
        display: flex;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
        color: $DARK_GREY;
        padding: 0.4rem;
        display: flex;
        align-items: center;
        text-align: center;
      }
      .flightsummary__date-day {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 1.1rem;
        line-height: 1.3rem;
        display: flex;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
        color: $DARK_GREY;
        padding: 0.4rem;
      }
    }
    .flightsummary__right {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      flex-grow: 1;
      .flightsummary__right-cities {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 1.1rem;
        line-height: 1.3rem;
        color: $DARK_GREY;
        margin-bottom: 0.5rem;
      }
      .flightsummary__right-schedule {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 0.8rem;
        line-height: 0.9rem;
        color: $DARK_GREY;
      }
    }
  }
  .flightsummary_inbound {
    border-top: 1px dotted $LIGHT_GREY;
    margin-top: 1rem;
    padding-top: 1rem;
  }
}
</style>
