<template>
<div>
    <Modals
    :mdlText="MdlText"
    ref="modals"
    @clicked-save="clickedSave"
    @clicked-new="clickedNew"
    >
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
      </v-row>
    </v-container>
  </v-form>
    </Modals>
    <Datatable :headers="headers" :items="malzemeler" :title="title" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/></div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
    computed:{
      ...mapState({
        malzemeler : state=> state.malzemeler.malzemeler
      }),
    },
    methods:{
      ...mapActions({ 
        getMalzemeler: 'malzemeler/getMalzemeler',
        saveMalzemeler: 'malzemeler/saveMalzemeler' 
        }),
      //child datatable item clicked
      clickedEdit(val){
          this.status='edit'
          this.malzeme_id=val.malzeme_id
          this.$refs.modals.dialog = true;   
      },
      clickedDelete(val){
          this.malzeme_id=val.malzeme_id    
      },
      clickedSave(){
        //statusu al edit or new
        //ona göre işlem yap
        this.$refs.form.validate();
        if(this.status=="new" && this.valid){
          let obj = { malzeme_adi: this.firstname, malzeme_birim: this.value }
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
         
      },
      clickedNew(){
        this.status='new';
        //yeni item ekleme
      }
    },
    created() {
        this.getMalzemeler()
    },
    data(){
        
        return{
          malzeme_id:null,
          status:null,
            items: ['ADET', 'METRE', 'KG'],
            value: null,
        headers: [
          {text: 'Malzeme Adı', value: 'malzeme_adi'},
          {text: 'Malzeme Birim', value: 'malzeme_birim'},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        title:'Malzeme Tanımları',
      MdlText:'Yeni Malzeme Tanımla',
      valid: false,
      firstname: '',
      lastname: '',
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
