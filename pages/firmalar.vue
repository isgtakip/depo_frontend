<template>
    <div>
       <v-card class="pb-3 pl-3 mb-5 pt-3" outlined>
        <Modals :mdlText="MdlText" :ref="refs" :mdlBtnText="btnText" @clicked-save="clickedSave" @clicked-new="clickedNew">
           <v-form v-model="firmaValid" ref="firmalarform">
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="firmaUnvan"
                        :rules="sorumlurules"
                        :counter="255"
                        label="Firma Tam Ünvan"
                        required
                        dense
                        class="mb-8"
                      ></v-text-field>

                      <v-autocomplete
                      v-model="firmaturleri"
                      :rules="selectRules"
                      label="Firma Türü seçiniz"
                        dense
                      :items="firmaturs"
                      item-text="value"
                        item-value="firma_tur"
                        required
                        class="mb-4"
                        ></v-autocomplete>

                      <v-autocomplete
                      v-model="firmatipleri"
                      :rules="selectRules"
                        label="Firma tipi seçiniz"
                        dense
                       :items="firmatips"
                        required
                        item-text="value"
                        item-value="firma_tip"
                        ></v-autocomplete>
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
        <Datatable :headers="headers" :items="firmalar" :title="title" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
    </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
    computed:{
      ...mapState({
        firmalar : state=> state.firmalar.firmalar,
      }),

    },
     methods:{
          ...mapActions(
        {
        getFirmalar :'firmalar/getFirmalar',
        deleteFirma:'firmalar/deleteFirma',
        saveFirma:'firmalar/saveFirma',
        editFirma:'firmalar/editFirma'
        }),
        clickedNew(){
        //hangi tabda olduğuna bak
        this.status='new'
        this.MdlText=this.MdlNewText;
        console.log("firma ekle")
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
          //firmalar new  işlemleri
          this.$refs.firmalarform.validate();
            if(this.status=="new" && this.firmaValid){
                let obj = {firma_unvan: this.firmaUnvan,firma_tur:this.firmaturleri,firma_tip:this.firmatipleri}
                this.saveFirma(obj).then(()=>{
                    this.toastMessage(this.firmaUnvan,'Eklendi')
                    this.$refs.modalsfirmalar.dialog = false;
                });
              }
              //edit
              if(this.status=="edit" && this.firmaValid){
                let obj = {firma_unvan: this.firmaUnvan, firma_tur:this.firmaturleri, firma_tip:this.firmatipleri, firma_id:this.firma_id}
                this.editFirma(obj).then(()=>{
                    this.toastMessage(this.firmaUnvan,'Düzenlendi')
                    this.$refs.modalsfirmalar.dialog = false;
                });
              }
      },
      clickedEdit(val){
         this.status='edit'
         this.MdlText=this.MdlEditText;
         //modalsdepolar  
          //firmalar edit işlemleri
          this.firmaUnvan=val.firma_unvan
          this.firmaturleri=val.firma_tur
          this.firmatipleri=val.firma_tip
          this.firma_id=val.firma_id
          this.$refs.modalsfirmalar.dialog = true;
      },
      clickedDelete(val){
         //delete it
           this.deleteFirma(val.firma_id).then(()=>{
             this.toastMessage(val.firma_unvan,'Silindi')
         })
      },
     },
     created() {
        this.getFirmalar();
      },
       data () {
      return {
        depoAd:'',
        status:null,
        selectRules: [
          v => !!v || 'Bu alan Gerekli',
        ],
        sorumlurules: [
          v => !!v || 'Bu alan Gereklidir',
          v => v.length <= 255 || 'En fazla 255 karakter olabilir.',
        ],
        tab: null,
        MdlText: null,
        refs:'modalsfirmalar',
        MdlNewText: 'Firma Ekle',
        MdlEditText: 'Firma Düzenle',
        btnText: 'Firma Ekle',
        title: 'Firmalar',
        headers: [
          {text: 'Firma Ünvan', value: 'firma_unvan'},
          {text: 'Firma Tür', value: 'firma_tur' },
          {text: 'Firma Tip', value: 'firma_tip' },
          {text: 'Actions', value: 'actions', sortable: false }
          ],
          firmatips:[
            {firma_tip:1,value:'TÜZEL'},
            {firma_tip:2,value:'ŞAHIS'}
          ],
          firmaturs:[
            {firma_tur:1,value:'ANA FİRMA'},
            {firma_tur:2,value:'TAŞERON'},
            {firma_tur:3,value:'TEDARİKÇİ'},
          ],
          firmaUnvan:'',
          firmaturleri:null,
          firmatipleri:null,
          firmaValid:false,
      }
    },
}
</script>