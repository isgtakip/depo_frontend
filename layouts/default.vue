<template>
<v-app>
  <v-app-bar
  app
  dense
  color="white"
  fixed
  flat

  >
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
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>
<script>
/*eslint-disable*/
  export default {
    name: "default",
   data () {
    return {
      drawer:null,
       links: [
          { text: 'Stok Takip', icon: 'mdi-image',route:'/malzemeler'           },
          { text: 'Stok Hareketleri', icon: 'mdi-help-box',route:'/stok-hareketleri' },
          { text: 'Ayarlar', icon: 'mdi-help-box',route:'/ayarlar' },
        ]
    }
  }
  }
</script>