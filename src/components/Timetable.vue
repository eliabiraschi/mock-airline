<template>
  <div class="timetable">
    <div class="timetable__header">
      <span class="timetable__header-outbound">{{label}}</span>
      <span class="timetable__header-airport">{{originFullName}}</span>
      <Icon class="timetable__header-arrow" name="arrow-rev" color="#06038D" />
      <span class="timetable__header-airport">{{destinationFullName}}</span>
    </div>
    <div class="timetable__dates">
      <div class="timetable__dates-departure">{{formattedDate}}</div>
    </div>
    <div class="timetable__content">
      <div v-for="(row, index) in schedule" class="flight" :key="row.flightNumber">
        <div class="flight__time">
          <span class="flight__time-departure">{{`${new Date(row.departure).getHours()}:${new Date(row.departure).getMinutes()}`}}</span>
          <Icon class="flight__time-arrow" name="arrow-rev" color="#343434" />
          <span class="flight__time-arrival">{{`${new Date(row.arrival).getHours()}:${new Date(row.arrival).getMinutes()}`}}</span>
        </div>
        <div v-for="fare in row.fares" class="flight__fare" :key="fare.fareSellKey" :class="fare.bundle">
          <span v-if="index===0" class="fare__bundle">{{fare.bundle}}</span>
          <a
            href="#"
            class="fare__price"
            :class="{'fare__bundle-selected': selectedFaresCode.includes(fare.fareSellKey)}"
            @click="selectFare(row, fare.bundle)"
          >
            ${{fare.price}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  name: 'timetable',
  components: {
    Icon,
  },
  props: {
    label: {
      type: String,
      default: 'outbound'
    },
    isInbound: {
      type: Boolean,
      default: false,
    },
    origin: String,
    destination: String,
    date: Date,
    schedule: Array
  },
  computed: {
    formattedDate() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${days[this.date.getDay()]}, ${this.date.getDate()} ${months[this.date.getMonth()]} ${this.date.getFullYear()}`
    },
    originFullName() {
      return this.$store.getters.getFullAirportName(this.origin)
    },
    destinationFullName() {
      return this.$store.getters.getFullAirportName(this.destination)
    },
    selectedFaresCode() {
      return this.$store.getters.getSelectedFaresCode
    }
  },
  methods: {
    selectFare(value, bundle) {
      const selectedFare = value.fares.filter(({ bundle: _bundle }) => (_bundle === bundle)).shift()
      this.$store.dispatch({
        type: 'selectFare',
        isInbound: this.isInbound,
        value: {
          ...value,
          selectedFare,
          origin: this.originFullName,
          destination: this.destinationFullName,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";
.timetable {
  background: $WHITE;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  width: 100%;
  margin-bottom: 2.5rem;
  .timetable__header {
    background: $GREY;
    padding: 1.1rem 1.3rem;
    .timetable__header-outbound {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.1rem;
      line-height: 1.3rem;
      text-transform: uppercase;
      color: $GREY;
      margin-right: 3rem;
    }
    .timetable__header-airport {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 1.5rem;
      text-transform: capitalize;
      color: $PRIMARY;
      margin-right: 1.5rem;
    }
    .timetable__header-arrow {
      margin-right: 1.5rem;
      margin-top: -12px;
    }
  }
  .timetable__dates {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem 1.3rem;
    border-bottom: 1px solid $G3;
    .timetable__dates-departure {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.1rem;
      line-height: 1.4rem;
      color: $DARK_GREY;
    }
  }
}
.flight {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid $G3;
  .flight__time {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 11rem;
    .flight__time-departure {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 1rem;
      line-height: 1.2rem;
      text-transform: uppercase;
      color: $DARK_GREY;
    }
    .flight__time-arrow {
      margin-left: 0.4rem;
      margin-right: 0.4rem;
    }
    .flight__time-arrival {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 1rem;
      line-height: 1.2rem;
      text-transform: uppercase;
      color: $DARK_GREY;
    }
  }
  .flight__fare {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem;
    .fare__bundle {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 0.7rem;
      line-height: 0.8rem;
      text-align: center;
      text-transform: uppercase;
      color: $BLACK;
      margin-bottom: 0.6rem;
      margin-top: 0.3rem;
      width: 100%;
    }
    .fare__price {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 1.3rem;
      line-height: 1.4rem;
      text-transform: uppercase;
      color: $BLACK;
      padding: 0.7rem 3.7rem;
      background: $WHITE;
      border: 2px solid $ACCENT;
      border-radius: 2px;
      width: 10rem;
      text-decoration: none;
    }
    &.standard {
      background-color: $GREY;
    }
    .fare__bundle-selected {
      background: $ACCENT;
      border: 2px solid $ACCENT;
      border-radius: 2px;
      color: $WHITE!important;
    }
  }
}
</style>