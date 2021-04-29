<template><div>
        <v-tabs v-model="tab" slider-color="yellow" background-color="transparent" color="black">
            <v-tab>DEPOLAR</v-tab>
            <v-tab>SORUMLULAR</v-tab>
            <v-tab>FİRMALAR</v-tab>
        </v-tabs>
 <v-tabs-items v-model="tab">
      <v-tab-item>
       <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
       <Modals :mdlText="MdlText[0]" ref="modals-0" :mdlBtnText="btnText[0]" @clicked-save="clickedSave" @clicked-new="clickedNew"></Modals>
       </v-card>
      </v-tab-item>
      <v-tab-item>
      <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
        <Modals :mdlText="MdlText[1]" ref="modals-0" :mdlBtnText="btnText[1]" @clicked-save="clickedSave" @clicked-new="clickedNew"></Modals>
      </v-card>
      </v-tab-item>
      <v-tab-item>
       <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
        <Modals :mdlText="MdlText[2]" ref="modals-0" :mdlBtnText="btnText[2]" @clicked-save="clickedSave" @clicked-new="clickedNew"></Modals>
       </v-card>
      </v-tab-item>
</v-tabs-items>
</div>
</template>
<script>
/*eslint-disable*/
export default {
    data () {
      return {
        tab: null,
        MdlText: ['Depo Tanımla', 'Depo Sorumlusu Tanımla', 'Firma Ekle'],
        btnText: ['Depo Tanımla', 'Depo Sorumlusu Tanımla', 'Firma Ekle']
      }
    },
    methods:{
      clickedNew(){
      },
      clickedSave(){
      },
    }
}
</script>
