<template>
  <v-card outlined>
    <v-card-title>
      {{this.title}}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Arama"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
    <template v-for="slot in slots" v-slot:[`item.${slot.slotName}`]="{ item }">
      <slot :name="slot.slotName" :degisken="item"></slot>
    </template>

     <template v-slot:[`item.actions`]="{ item }">
         <v-icon
            small
            @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon
            small
            @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
</v-data-table>
  </v-card>
</template>
<script>
/*eslint-disable*/
  export default {
    props:{headers: {
      type: Array,
      default: null
    },
    slots:{
      type:Array,
      default:null
    },
    items: {
      type: Array,
      default: null
    },
    title:{
      type:String,
      default:null
    },
    },
    data () {
      return {
        search: '', 
      }
    },
    methods:{

        editItem(val){
            this.$emit('clicked-edit', val)
        },
        deleteItem(val){
            this.$emit('clicked-delete', val)
        }
    }
  }
</script>