<template>
<v-app>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >

         <v-list-item :to="'/firmalar'">
            <v-list-item-title>Firma Yönetimi</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/depolar'">
            <v-list-item-title>Depo Yönetimi</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/malzemeler'">
            <v-list-item-title>Malzeme Yönetimi</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/kullanicilar'">
            <v-list-item-title>Kullanıcı Yönetimi</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  <v-app-bar
  app
  dense
  color="white"
  fixed
  flat
  >
   <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-avatar :tile="true">
    <img :src="require('@/assets/images/logo/sari_elektronik.jpg')" alt="logo">
  </v-avatar>
    <v-toolbar-title>
      Depo <span style="font-weight:bold;">Takip</span></v-toolbar-title>
    <!-- -->

    <v-spacer></v-spacer>

<v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn text v-on="on" color="grey" class="text--darken-2">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Menu</span>
        </v-btn>
    </template>
        <v-list>
            <v-list-item
                v-for="(link,idx) in links"
                :key="idx"
                :to="link.route"
            >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <nuxt />
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import $axios from 'axios'
$axios.defaults.withCredentials = true

  export default {
 
    middleware: 'auth',
    name: "default",
    computed:{
      ...mapState({
        permissions : state=> state.rules.permissions,
      }),
     
    },
   data () {
    return {
      drawer:false,
       links: [
          { text: 'Stok Hareketleri', icon: 'mdi-help-box',route:'/stok-hareketleri' },
        ],
        permise:[],
        
    }
  },

     async created() {
        //this.getPermissions();  
     this.$axios.setBaseURL(process.env.apiURL)
     const { data: permissions } = await this.$axios.get('/getAllPermissionsAttribute');
    
      this.$gates.setPermissions(permissions);
      console.log("ffhgfh")
    },
    
   methods:{
      ...mapActions(
        { 
        getPermissions:'rules/getPermissions',
        }),
     
     
      
       

   },
  }
</script>