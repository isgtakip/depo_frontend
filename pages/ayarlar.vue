<template><div>

        <v-tabs v-model="tab" slider-color="yellow" background-color="transparent" color="black"  show-arrows>
            <v-tab>DEPOLAR</v-tab>
            <v-tab>DEPO SORUMLU LİSTESİ</v-tab>
            <v-tab>SORUMLULAR</v-tab>
            <v-tab>FİRMALAR</v-tab>
        </v-tabs>
 <v-tabs-items v-model="tab">
      <v-tab-item>
       <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
         <Modals :mdlText="MdlText[0]" :ref="refs[0]" :mdlBtnText="btnText[0]" @clicked-save="clickedSave" @clicked-new="clickedNew">
           <v-form v-model="depo_valid" ref="depoform">
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="depoAd"
                        :rules="sorumlurules"
                        :counter="255"
                        label="Depo Adı"
                        required
                        dense
                        class="mb-8"
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
         <Datatable :headers="headers[0]" :items="depolar" :title="title[0]" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
       </v-tab-item>
      <v-tab-item>
       <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
       <Modals :mdlText="MdlText[1]" :ref="refs[1]" :mdlBtnText="btnText[1]" @clicked-save="clickedSave" @clicked-new="clickedNew">
           <v-form v-model="depovalid" ref="depolarform">
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-autocomplete
                        v-model="depoadlari"
                        :rules="selectRules"
                        label="Depo seçiniz"
                        dense
                        :items="depolar"
                        item-text="depo_adi"
                        item-value="depo_id"
                        required
                        class="mb-4"
                        ></v-autocomplete>

                      <v-autocomplete
                      v-model="sorumlulars"
                      :rules="selectRules"
                      label="Sorumlu seçiniz"
                        dense
                      :items="sorumlular"
                      item-text="sorumlu_ad_soyad"
                        item-value="sorumlu_id"
                        required
                        class="mb-4"
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
       <Datatable :headers="headers[1]" :items="deposorumlulari" :title="title[1]" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
      </v-tab-item>
      <v-tab-item>
      <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
        <Modals :mdlText="MdlText[2]" :ref="refs[2]" :mdlBtnText="btnText[2]" @clicked-save="clickedSave" @clicked-new="clickedNew">
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
        <Datatable :headers="headers[2]" :items="sorumlular" :title="title[2]" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
      </v-tab-item>
      <v-tab-item>
       <v-card class="pt-3 pb-3 pl-3 mb-5 mt-5" outlined>
        <Modals :mdlText="MdlText[3]" :ref="refs[3]" :mdlBtnText="btnText[3]" @clicked-save="clickedSave" @clicked-new="clickedNew">
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
        <Datatable :headers="headers[3]" :items="firmalar" :title="title[3]" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
      </v-tab-item>
</v-tabs-items>

</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
  computed:{
      ...mapState({
        deposorumlulari : state=> state.deposorumlulari.depo_sorumlulari,
        sorumlular : state=> state.sorumlular.sorumlular,
        firmalar : state=> state.firmalar.firmalar,
        depolar: state=>state.depolar.depolar,
      }),

    },
    methods:{
      ...mapActions(
        {
        getDepolar:'depolar/getDepolar',
        saveDepo:'depolar/saveDepo',
        editDepo:'depolar/editDepo',
        deleteDepo:'depolar/deleteDepo',
        getDepoSorumlulari: 'deposorumlulari/getDepoSorumlulari',
        getSorumlular : 'sorumlular/getSorumlular',
        getFirmalar : 'firmalar/getFirmalar',
        saveSorumlular :'sorumlular/saveSorumlular',
        editSorumlular: 'sorumlular/editSorumlular',
        deleteSorumlular: 'sorumlular/deleteSorumlular',
        saveDepoSorumlulari:'deposorumlulari/saveDepoSorumlulari',
        editDepoSorumlulari :'deposorumlulari/editDepoSorumlulari',
        deleteDepoSorumlulari :'deposorumlulari/deleteDepoSorumlulari',
        deleteFirma:'firmalar/deleteFirma',
        saveFirma:'firmalar/saveFirma',
        editFirma:'firmalar/editFirma'
        }),

      clickedNew(){
        //hangi tabda olduğuna bak
        this.status='new'
        Vue.set(this.MdlText, this.tab, this.MdlNewText[this.tab]);

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

         if(this.tab==0) {
          this.$refs.depoform.validate();
              //yeni depo ekleme
              if(this.status=="new" && this.depo_valid){
                let obj = {depo_adi: this.depoAd,depo_id:this.depo_id}
                this.saveDepo(obj).then(()=>{
                    this.toastMessage(this.depoAd,'Eklendi')
                    this.$refs.modalsdepolar.dialog = false;
                });
              }
              //depo düzenleme
               if(this.status=="edit" && this.depo_valid){
                let obj = {depo_adi: this.depoAd, depo_id:this.depo_id}
                this.editDepo(obj).then(()=>{
                    this.toastMessage(this.depoAd,'Düzenlendi')
                    this.$refs.modalsdepolar.dialog = false;
                });
               }
        }
        //depo sorumluları
        if(this.tab==1) {
          this.$refs.depolarform.validate();
              //yeni depo ekleme
              if(this.status=="new" && this.depovalid){
                let obj = {depo_id: this.depoadlari,sorumlu_id:this.sorumlulars}
                this.saveDepoSorumlulari(obj).then(()=>{
                    this.toastMessage(this.depoadlari,'Eklendi')
                    this.$refs.modalsdepo.dialog = false;
                });
              }
              //depo düzenleme
               if(this.status=="edit" && this.depovalid){

                let obj = {depo_sorumlu_id: this.depo_sorumlu_id, sorumlu_id:this.sorumlulars, depo_id:this.depoadlari}
                this.editDepoSorumlulari(obj).then(()=>{
                    this.toastMessage(this.depoAds,'Düzenlendi')
                    this.$refs.modalsdepo.dialog = false;
                });
               }
        }
        //sorumlular
        if(this.tab==2) {
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
        }
         if(this.tab==3) {
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
         }
        //bulunduğun tabı al
        //validate et
        //statuse bak

      },

      clickedEdit(val){
         this.status='edit'
         Vue.set(this.MdlText, this.tab, this.MdlEditText[this.tab]);
         //modalsdepolar
         if(this.tab==0) {
          //depolar edit işlemleri
          this.depoAd=val.depo_adi
          this.depo_id=val.depo_id
          this.$refs.modalsdepolar.dialog = true;
        }
         if(this.tab==1) {
          //depolar edit işlemleri
          this.sorumlulars=val.sorumlu_id
          this.depo_sorumlu_id=val.depo_sorumlu_id
          this.depoadlari=val.depo_id
          this.depoAds=val.depo_adi
          this.$refs.modalsdepo.dialog = true;
        }
        if(this.tab==2) {
          //sorumlular edit işlemleri
          this.sorumluadisoyadi=val.sorumlu_ad_soyad
          this.sorumlu_id=val.sorumlu_id;
          this.$refs.modalssorumlular.dialog = true;
        }
         if(this.tab==3) {
          //firmalar edit işlemleri
          this.firmaUnvan=val.firma_unvan
          this.firmaturleri=val.firma_tur
          this.firmatipleri=val.firma_tip
          this.firma_id=val.firma_id
          this.$refs.modalsfirmalar.dialog = true;
        }
      },
      clickedDelete(val){
         if(this.tab==0) {
          this.deleteDepo(val.depo_id).then(()=>{
             this.toastMessage(val.depo_adi,'Silindi')
         })
        }
         if(this.tab==1) {
           this.deleteDepoSorumlulari(val.depo_sorumlu_id).then(()=>{
             this.toastMessage(val.depo_sorumlu_id,'Silindi')
           })
        }
         if(this.tab==2) {
          this.deleteSorumlular(val.sorumlu_id).then(()=>{
             this.toastMessage(val.sorumlu_ad_soyad,'Silindi')
         })
        }
         if(this.tab==3) {
         //delete it
           this.deleteFirma(val.firma_id).then(()=>{
             this.toastMessage(val.firma_unvan,'Silindi')
         })
        }

      },
     },
    created() {
        this.getDepoSorumlulari();
        this.getSorumlular();
        this.getFirmalar();
        this.getDepolar();
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
        MdlText: [null,null,null,null],
        refs:['modalsdepolar','modalsdepo','modalssorumlular','modalsfirmalar'],
        MdlNewText: ['Depo Tanımla','Depo Sorumlu Tanımla', 'Sorumlu Tanımla', 'Firma Ekle'],
        MdlEditText: ['Depo Düzenle','Depo Sorumlu Düzenle', 'Sorumlu Düzenle', 'Firma Düzenle'],
        btnText: ['Depo Tanımla','Depo Sorumlu Tanımla', 'Sorumlu Tanımla', 'Firma Ekle'],
        title: ['Depolar','Depo Sorumluları', 'Sorumlular', 'Firmalar'],
        headers: [
          [
            {text: 'Depo Adı', value: 'depo_adi'},
            {text: 'Actions', value: 'actions', sortable: false }
          ],
          [
          {text: 'Depo Adı', value: 'depo_adi'},
          {text: 'Depo Sorumlusu', value: 'sorumlu_ad_soyad'},
          {text: 'Actions', value: 'actions', sortable: false }
          ],
          [
          {text: 'Sorumlu Adı Soyadı', value: 'sorumlu_ad_soyad'},
          {text: 'Actions', value: 'actions', sortable: false }
          ],
          [
          {text: 'Firma Ünvan', value: 'firma_unvan'},
          {text: 'Firma Tür', value: 'firma_tur' },
          {text: 'Firma Tip', value: 'firma_tip' },
          {text: 'Actions', value: 'actions', sortable: false }
          ]],
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
          depoadi:'',
          depovalid:false,
          sorumlulars:null,
          depoadlari:null
      }
    },

}
</script>
