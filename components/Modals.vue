<template>
 <v-card class="pt-3 pb-3 pl-3 mb-5" outlined>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="newItem()"
        >
          {{mdlText}}
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ mdlText }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="saveItem()"
            >
              Kaydet
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-list-item>
            <v-list-item-content>
     <slot></slot>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    </v-card>
</template>
<script>
/*eslint-disable*/
  export default {
    props:{
      mdlText: {
      type: String,
      default: null
      },
      itemno: {
        type:Number,
        default:null
      },
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
    methods:{
       saveItem(){
         this.$emit('clicked-save')
       },
       newItem(){
         this.$emit('clicked-new')
       }
    }
  }
</script>