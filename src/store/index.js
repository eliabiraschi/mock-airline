export default {
  state: {
    airports: [],
    origin: null,
    destination: null,
    departure: null,
    return: null,
    timetableOutbound: null,
    timetableInbound: null,
    outboundSelectedFare: null,
    inboundSelectedFare: null,
  },
  mutations: {
    AIRPORTS_UPDATE(state, status) {
      state.airports = status
    },
    SET_ORIGIN(state, status) {
      state.origin = status
    },
    SET_DESTINATION(state, status) {
      state.destination = status
    },
    SET_DEPARTURE(state, status) {
      state.departure = status
    },
    SET_RETURN(state, status) {
      state.return = status
    },
    TIMETABLE_OUTBOUND(state, status) {
      state.timetableOutbound = status
    },
    TIMETABLE_INBOUND(state, status) {
      state.timetableInbound = status
    },
    OUTBOUND_SELECTED_FARE(state, status) {
      state.outboundSelectedFare = status
    },
    INBOUND_SELECTED_FARE(state, status) {
      state.inboundSelectedFare = status
    },
  },
  actions: {
    fetchAirports(context) {
      fetch('https://mock-air.herokuapp.com/asset/stations')
        .then(res => res.json())
        .then(data => context.commit('AIRPORTS_UPDATE', data))
    },
    fetchTimeTable: (context, { isInbound = false }) => {
      fetch(`https://jsconf-ws-api.mito.hu/search?departureStation=${isInbound ? context.state.destination : context.state.origin}&arrivalStation=${isInbound ? context.state.origin : context.state.destination}&date=${isInbound ? context.state.return : context.state.departure}`)
        .then(res => res.json())
        .then(data => context.commit(isInbound ? 'TIMETABLE_INBOUND' : 'TIMETABLE_OUTBOUND', data))
    },
    setOrigin(context, { value }) {
      context.commit('SET_ORIGIN', value)
    },
    setDestination(context, { value }) {
      context.commit('SET_DESTINATION', value)
    },
    setDeparture(context, { value }) {
      context.commit('SET_DEPARTURE', value)
    },
    setReturn(context, { value }) {
      context.commit('SET_RETURN', value)
    },
    selectFare(context, { value, isInbound = false }) {
      // eslint-disable-next-line no-console
      console.log(value)
      context.commit(isInbound ? 'INBOUND_SELECTED_FARE' : 'OUTBOUND_SELECTED_FARE', value)
    },
  },
  getters: {
    getOriginSuggestions(state) {
      return state.airports.map(({ shortName, iata }) => `${shortName} (${iata})`)
    },
    getDestinationSuggestions: (state) => (originIata) => {
      const [origin] = state.airports.filter(({ iata }) => (iata === originIata))
      return state.airports
        .filter(({ iata }) => (origin.connections.map(({ iata }) => (iata)).includes(iata)))
        .map(({ shortName, iata }) => `${shortName} (${iata})`)
    },
    getFullAirportName: (state) => (value) => {
      const { shortName } = state.airports.filter(({ iata }) => (iata === value) ).shift()
      return shortName
    },
    getSelectedFaresCode(state) {
      const res = []
      if (state.outboundSelectedFare !== null) {
        res.push(state.outboundSelectedFare.selectedFare.fareSellKey)
      }
      if (state.inboundSelectedFare !== null) {
        res.push(state.inboundSelectedFare.selectedFare.fareSellKey)
      }
      return res;
    },
  },
}
