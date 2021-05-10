<template>
<div>
<v-card class="pt-3 pb-3 pl-3 mb-5" outlined>
 <Modals :mdlText="MdlText" ref="modals" :mdlBtnText="btnText" @clicked-save="clickedSave" @clicked-new="clickedNew">
  <v-form v-model="valid" ref="form">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="255"
            label="Malzeme Adı"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12"
        >
       <v-autocomplete
       v-model="value"
       :rules="selectRules"
       label="Birim seçiniz"
        dense
       :items="items"
        required
        ></v-autocomplete>
        </v-col>
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
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</Modals>
</v-card>
<Datatable :headers="headers" :items="malzemeler" :title="title" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/></div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
    computed:{
      ...mapState({
        malzemeler : state=> state.malzemeler.malzemeler,
        depolar: state=>state.depolar.depolar,
      }),
    },
    methods:{
      ...mapActions({ 
        getMalzemeler: 'malzemeler/getMalzemeler',
        saveMalzemeler: 'malzemeler/saveMalzemeler',
        editMalzemeler: 'malzemeler/editMalzemeler',
        deleteMalzemeler: 'malzemeler/deleteMalzemeler',
        getDepolar:'depolar/getDepolar'
        }),
      //child datatable item clicked
      clickedEdit(val){
          this.status='edit'
          this.malzeme_id=val.malzeme_id
          this.firstname=val.malzeme_adi
          this.value=val.malzeme_birim
          this.depoadlari=val.depo_id
          this.MdlText="Malzeme Düzenle"
          this.$refs.modals.dialog = true;   
      },
      clickedDelete(val){
          this.malzeme_id=val.malzeme_id  
          this.deleteMalzemeler(val.malzeme_id).then(()=>{
             this.$toast.error(val.malzeme_adi + " Silindi", {
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
          })  
      },
      clickedSave(){
        //statusu al edit or new
        //ona göre işlem yap
        //validateyi çağır
        this.$refs.form.validate();

        if(this.status=="new" && this.valid){
          let obj = { malzeme_adi: this.firstname, malzeme_birim: this.value,depo_id:this.depoadlari }
          this.saveMalzemeler(obj).then(()=>{
                this.$toast.success(obj.malzeme_adi + " Eklendi", {
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
               this.$refs.modals.dialog = false;
          })
        }
        //edit işlemleri
         if(this.status=="edit" && this.valid){
            let obj = { malzeme_adi: this.firstname, malzeme_birim: this.value, malzeme_id:this.malzeme_id,depo_id:this.depoadlari }
            this.editMalzemeler(obj).then(()=>{
               this.$toast.success(obj.malzeme_adi + " Düzenlendi", {
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
               this.$refs.modals.dialog = false;
            })
         }
        
         
      },
      clickedNew(){
        this.status='new';
        this.MdlText="Yeni Malzeme Tanımla"
        //yeni item ekleme
      }
    },
    created() {
        this.getMalzemeler()
        this.getDepolar()
    },
    data(){
        
        return{
          depoadlari:null,
          malzeme_id:null,
          status:null,
            items: ['ADET', 'METRE', 'KG'],
            value: null,
        headers: [
          {text: 'Malzeme Adı', value: 'malzeme_adi'},
          {text: 'Miktar', value: 'malzeme_miktar'},
          {text: 'Birim', value: 'malzeme_birim'},
          {text: 'Depo', value: 'depo_adi'},
          {text: 'Actions', value: 'actions', sortable: false },
        ],
        title:'Malzeme Tanımları',
        MdlText:'Yeni Malzeme Tanımla',
        valid: false,
        firstname: '',
        lastname: '',
        btnText:"Yeni Malzeme Tanımla",
        selectRules: [
          v => !!v || 'Malzeme Birim Gerekli',
        ],
        nameRules: [
          v => !!v || 'Malzeme adı Gerekli',
          v => v.length <= 255 || 'Malzeme adı en fazla 255 karakter olabilir.',
        ],
          }
      }
}
</script>
