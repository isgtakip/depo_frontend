<template>
<div>
    <Modals
    :mdlText="MdlText"
    ref="modals"
    :valId="ValId"
    >
         <v-form v-model="valid">
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
       auto-select-first
  dense
  :items="items"
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
      ...mapActions({ getMalzemeler: 'malzemeler/getMalzemeler' }),
      //child datatable item clicked
      clickedEdit(val){
          this.$refs.modals.dialog = true;
      },

      clickedDelete(val){
            alert(val.malzeme_id);
            
      }

    },
    created() {
        this.getMalzemeler()
    },
    data(){
        
        return{
            value: 'Lütfen Seçiniz',
            items: ['Lütfen Seçiniz','ADET', 'METRE', 'KG'],
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
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
        }
    }
}
</script>
