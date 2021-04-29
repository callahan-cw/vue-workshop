<template>
  <div>
    <h1>Create an Event </h1>
     <form>
          <label>Select a category</label>
          <select v-model="event.category">
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
          <h3>Name & describe your event</h3>
          <div class="field">
            <label>Title</label>
            <input v-model="event.title" type="text" placeholder="Add an event title"/>
          </div>
          <div class="field">
            <label>Description</label>
            <input v-model="event.description" type="text" placeholder="Add a description"/>
          </div>
          <h3>Where is your event?</h3>
          <div class="field">
            <label>Location</label>
            <input v-model="event.location" type="text" placeholder="Add a location"/>
          </div>
          <h3>When is your event?</h3>
          <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date"/>
          </div>
          <div class="field">
            <label>Select a time</label>
            <select v-model="event.time">
              <option v-for="time in times" :key="time">{{ time }}</option>
            </select>
          </div>
          <input type="submit" class="button -fill-gradient" value="Submit"/>
        </form>
    <!-- <h1>Create an Event {{ user.name }}</h1>
    <p>This event is created by the {{ user.id }} </p>
    <ul>
      <li v-for="cat in categories" :key="cat"> - {{ cat }}</li>
    </ul>
    <p>There are {{ catLength }} categories </p>
     <p>Get Todo By Id {{ getTodo(2) }} </p> 
    <p>Get Todo By Id {{ getTodoById(3) }} </p>

    <div>
      <input type="number" v-model.number="incrementBy">
      <button @click="incrementCount">Increment</button>
    </div> -->
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex"
import Datepicker from "vuejs-datepicker"

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00")
    }
    return {
      // times: times
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObjec()
    }
  },
  methods: {
    createEvent() {
      this.$store.dispatch('createEvent', this.event)
    },
    createFreshEventObjec() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 1000000)
      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      }
    }
  }
}
// export default {
//   data() {
//     return {
//       incrementBy: 1
//     }
//   },
//   methods: {
//     incrementCount() {
//       // this.$store.commit("INCREMENT_COUNT", this.incrementBy)
//       this.$store.dispatch("updateCount", this.incrementBy)
//     }
//   },
//   computed: {
//     // getTodo(){
//     //   return this.$store.getters.getTodoById
//     // },
//     ...mapGetters(["getTodoById"]),
//     catLength() {
//       // return this.$store.categories.length
//       return this.$store.getters.catLength
//     },
//     // localComputed(){
//     //   return something
//     // },
//     ...mapState(["user", "categories"])
//   }

//   // computed: mapState(['user','categories'])

//   // computed: mapState({
//   //   // userName: state => state.user.name,
//   //   // userID: state => state.user.id,
//   //   user: 'user',
//   //   // categories: state => state.categories,
//   //   categories: 'categories'
//   // })

//   // computed: {
//   //   userName() {
//   //     return this.$store.state.user.name
//   //   },
//   //   userId() {
//   //     return this.$store.state.user.id
//   //   }
//   // }
// }
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
