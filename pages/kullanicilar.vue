<template><div>
      <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
        <Modals :mdlText="MdlText" :ref="refs" :mdlBtnText="btnText" @clicked-save="clickedSave" @clicked-new="clickedNew">
           <v-form v-model="sorumluvalid" ref="sorumluform">
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="sorumluadisoyadi"
                        :rules="sorumlurules"
                        :counter="255"
                        label="Sorumlu Adı Soyadı"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
        </Modals>
         </v-card>
        <Datatable :headers="headers" :items="sorumlular" :title="title" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {

  computed:{
      ...mapState({
        sorumlular : state=> state.sorumlular.sorumlular,
      }),

    },
    methods:{
      ...mapActions(
        {
        getSorumlular : 'sorumlular/getSorumlular',
        saveSorumlular :'sorumlular/saveSorumlular',
        editSorumlular: 'sorumlular/editSorumlular',
        deleteSorumlular: 'sorumlular/deleteSorumlular',
        }),

      clickedNew(){
        //hangi tabda olduğuna bak
        this.status='new'
        this.MdlText=this.MdlNewText
        console.log("sdasd")

      },
      toastMessage(deger,durum){
                this.$toast.success(deger + " " + durum, {
                position: "bottom-right",
                timeout: 5000,
                closeOnClick: false,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.72,
                showCloseButtonOnHover: true,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              });
      },
      clickedSave(){
        //status ve sayfayı al
        //depo sorumluları
        //sorumlular
          //formu validate et
          this.$refs.sorumluform.validate();
             //yeni sorumlu ekleme işlemleri
              if(this.status=="new" && this.sorumluvalid){
                let obj = {sorumlu_ad_soyad: this.sorumluadisoyadi}
                this.saveSorumlular(obj).then(()=>{
                    this.toastMessage(this.sorumluadisoyadi,'Eklendi')
                    this.$refs.modalssorumlular.dialog = false;
                });
              }
              //edit
              if(this.status=="edit" && this.sorumluvalid){
                let obj = {sorumlu_ad_soyad: this.sorumluadisoyadi, sorumlu_id:this.sorumlu_id}
                this.editSorumlular(obj).then(()=>{
                    this.toastMessage(this.sorumluadisoyadi,'Düzenlendi')
                    this.$refs.modalssorumlular.dialog = false;
                });
              }
          //sorumlu edit işlemleri
        //bulunduğun tabı al
        //validate et
        //statuse bak

      },

      clickedEdit(val){
         this.status='edit'
         this.MdlText=this.MdlEditText
         //modalsdepolar
          //sorumlular edit işlemleri
          this.sorumluadisoyadi=val.sorumlu_ad_soyad
          this.sorumlu_id=val.sorumlu_id;
          this.$refs.modalssorumlular.dialog = true;
      },
      clickedDelete(val){
          this.deleteSorumlular(val.sorumlu_id).then(()=>{
             this.toastMessage(val.sorumlu_ad_soyad,'Silindi')
         })
      },
     },
    created() {
        this.getSorumlular();
    },
    data () {
      return {
        depoAd:'',
        depo_valid:false,
        status:null,
        sorumluvalid: false,
        sorumluadisoyadi: '',
        selectRules: [
          v => !!v || 'Bu alan Gerekli',
        ],
        sorumlurules: [
          v => !!v || 'Bu alan Gereklidir',
          v => v.length <= 255 || 'En fazla 255 karakter olabilir.',
        ],
        tab: null,
        MdlText: null,
        refs:'modalssorumlular',
        MdlNewText: 'Sorumlu Tanımla',
        MdlEditText: 'Sorumlu Düzenle',
        btnText: 'Sorumlu Tanımla',
        title:'Sorumlular', 
        headers: [
          {text: 'Kullanıcı Adı Soyadı', value: 'sorumlu_ad_soyad'},
          {text: 'Actions', value: 'actions', sortable: false }
          ],
      }
    },

}
</script>
