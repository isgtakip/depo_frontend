<template>
    <div><v-card class="pt-3 pb-3 pl-3 mb-5" outlined>
    <Modals :mdlText="MdlText" ref="modals" :mdlBtnText="btnText" @clicked-save="clickedSave" @clicked-new="clickedNew">
                <v-list
          class="pl-5 mb-0"
        >
<v-form v-model="stokvalid" ref="stokform" >
          <v-list-item class="pl-0 pb-0 mb-0" >
            <v-list-item-content class="pl-0 mb-0">
              <v-list-item-title>Stok Hareket Bilgileri</v-list-item-title>
              <v-list-item-subtitle>Stok hareketleri tanımlamalarını bu bölümden yapabilirsiniz</v-list-item-subtitle>
                <v-container fluid>
                  <v-row class="pb-0">
                       <v-col
                      cols="12"
                      md="9"
                      class="pl-0 mb-0 pb-0"
                    >
                      <v-autocomplete
                        v-model="depoadi"
                        :rules="selectRules"
                        label="Depo Seçiniz"
                        outlined
                        :items="depolar"
                        item-text="depo_adi"
                        item-value="depo_id"
                         @change='onChange("depo")'
                        required
                        dense
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      class="pl-0 mb-0 pb-0"
                    >
                      <v-autocomplete
                        v-model="sorumluadi"
                        :rules="selectRules"
                        label="Depo Sorumlusu"
                        outlined
                        :items="depo_sorumlulari"
                        item-text="sorumlu_ad_soyad"
                        item-value="sorumlu_id"
                        required
                        dense
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      class="pl-0 mb-0 pb-0"
                    >
                      <v-autocomplete
                        v-model="harekettipi"
                        :rules="selectRules"
                        label="Hareket tipi"
                        outlined
                        :items="harekettipleri"
                        item-text="hareket"
                        item-value="hareket_tipi"
                        required
                         @change='onChange("harekettipi")'
                        dense
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="1"
                       class="pl-0 mb-0 pb-0"
                    >
                    <Datepicker ref="picker"/>
                    </v-col>
                     <v-col
                      cols="12"
                      md="2"
                       class="pl-0 mb-0 pb-0"
                    >
                         <v-autocomplete
                      v-model="belgetipi"
                      :rules="selectRules"
                      label="Belge Tipi"
                        outlined
                      :items="belgetipleri"
                      item-text="belge"
                        item-value="belge_tipi"
                        required
                        dense
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                       class="pl-0 mb-0 pb-0"
                    >
                         <v-text-field
                        v-model="belgeno"
                        :rules="sorumlurules"
                        label="Belge Numarası"
                        required
                        dense
                        outlined
                        class="mb-8"
                      ></v-text-field>
                    </v-col>
                     <v-col
                      cols="12"
                      md="2"
                       class="pl-0 mb-0 pb-0"
                    >
                         <v-autocomplete
                      v-model="tedarikturu"
                      :rules="selectRules"
                      label="Tedarik Türü"
                        outlined
                      :items="tedarikturleri"
                      item-text="tedarik_turu"
                        item-value="tedarik_id"
                        required
                        @change='onChange("tedarikturu")'
                        dense
                        class=""
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                       class="pl-0 mb-0 pb-0"
                    >
                         <v-autocomplete
                      v-model="tedarikci"
                      :rules="selectRules"
                      :label="tedarikcilabels"
                        outlined
                      :items="tedarikciler"
                      :item-text="itemtext"
                      :item-value="itemvalue"
                        required
                        dense
                        class=""
                        ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
            </v-list-item-content>
          </v-list-item>
           <v-list-item class="pl-0 pb-0 mb-0 pt-0">
          <v-list-item-content class="pb-0">
              <v-list-item-title class="pb-0 mb-0">Malzeme Bilgileri</v-list-item-title>
              <v-list-item-subtitle class="pt-0 mt-0">Ürün hizmet ve malzeme seçerek yeni ekle tuşuna basın</v-list-item-subtitle>
                <v-container fluid>
                  <v-row class="pb-0 mb-0 pt-0 mt-0" v-for="(input,k) in inputs" :key="k">
                       <v-col
                      cols="12"
                      md="6"
                      class="pl-0 mb-0 pb-0"
                    >
                      <v-autocomplete
                        v-model="input.malzeme"
                        :rules="selectRules"
                        label="Malzeme Seçiniz"
                        outlined
                        :items="malzemeler"
                        item-text="malzeme_adi"
                        item-value="malzeme_id"
                        @change='onChange1(k)'
                        dense
                        required
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                       class="pl-0 mb-0 pb-0"
                    >
                         <v-text-field
                        v-model="input.miktar"
                        :rules="sorumlurules"
                        label="Miktar"
                        required
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                     <v-col
                      cols="12"
                      md="2"
                       class="pl-0 mb-0 pb-0"
                    >
                         <v-autocomplete
                      v-model="input.birim"
                      :rules="selectRules"
                      label="Birim"
                        outlined
                      :items="malzeme_birimleri[k]"
                      item-text="malzeme_birim"
                        item-value="malzeme_id"
                        required
                        dense
                          auto-select-first
                          :readonly="true"
                        ></v-autocomplete>
                    </v-col>
                     <v-col
                      cols="12"
                      md="1"
                       class="pl-0 mb-0 pb-0"
                    >
                    <v-btn
      depressed
      disabled
      block
      v-show="(k<1)"
    >
      SİL
      <v-icon
          dark
          right
        >
          mdi-delete
        </v-icon>
    </v-btn>
              <v-btn
        color="red"
        dark
        block
        @click="remove(k)"
         v-show="k || ( !k && inputs.length >= 2 && k>2)"
      >
        SİL
        <v-icon
          dark
          right
        >
          mdi-delete
        </v-icon>
      </v-btn>
                     </v-col>
                  </v-row>
                </v-container>
          </v-list-item-content>
          </v-list-item>
             </v-form>
        </v-list>
        <div class="pl-5 pr-5">
               <v-btn
          color="primary"
          dark
          @click="add(k)"
          block
          class="pl-0"
        >
          Yeni Satır Ekle
        </v-btn>
        </div>
    </Modals>
    </v-card>
  <Datatable
  :headers="headers"
  :items="stokhareketleri"
  :title="title"
  :slots="slots"
  @clicked-edit="clickedEdit"
  @clicked-delete="clickedDelete">
<template v-slot:hareket_tipi="{ degisken }">
  <v-chip
        :color="getColor(degisken.hareket_tipi)"
        small
        dark
        label
      >
      {{degisken.hareket_tipi}}
      </v-chip>
</template>
  </Datatable>
    </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
  /*
  async asyncData ({ $axios, $gates }) {
      const [permissions] = await Promise.all([
      $axios.get('http://localhost:8000/api/getAllPermissionsAttribute'),
    ])
    
    $gates.setPermissions(permissions.data)
  },*/
  computed:{
      ...mapState({
        deposorumlulari : state=> state.deposorumlulari.depo_sorumlulari,
        sorumlular : state=> state.sorumlular.sorumlular,
        firmalar : state=> state.firmalar.firmalar,
        depolar: state=>state.depolar.depolar,
        malzemeler : state=> state.malzemeler.malzemeler,
        stokhareketleri : state=> state.stokhareketleri.stok_hareketleri,
      }),
     ...mapGetters({
       getSorumluByDepoID:'deposorumlulari/getSorumluByDepoID',
       getMalzemeBirimByID:'malzemeler/getMalzemeBirimByID',
     }),
    /*depo_sorumlulari() {
        if(!this.depoadi) return []
        var sorumlularim = [];
        return sorumlularim.concat(this.getSorumluByDepoID(this.depoadi));
      },
    */
  },
  created() {
        this.getDepoSorumlulari();
        this.getSorumlular();
        this.getFirmalar();
        this.getDepolar();
        this.getMalzemeler();
        this.getStokHareketleri();
    },
   methods:{
      ...mapActions(
        { 
        getDepolar:'depolar/getDepolar',
        getDepoSorumlulari: 'deposorumlulari/getDepoSorumlulari',
        getSorumlular : 'sorumlular/getSorumlular',
        getFirmalar : 'firmalar/getFirmalar',
        getMalzemeler: 'malzemeler/getMalzemeler',
        saveStokHareketi : 'stokhareketleri/saveStokHareketi',
        getStokHareketleri : 'stokhareketleri/getStokHareketleri'
        }),
        onChange1(k){     
           this.deneme=this.getMalzemeBirimByID(this.inputs[k].malzeme)
           this.okan=[{
           malzeme_adi:this.deneme.malzeme_adi,
           malzeme_miktar:this.deneme.malzeme_miktar,
           malzeme_birim:this.deneme.malzeme_birim,
           malzeme_id:this.deneme.malzeme_id,
           }]
           Vue.set(this.malzeme_birimleri, k, this.okan);     
           this.inputs[k].birim=this.inputs[k].malzeme
        },
      onChange(deger){
        if(deger=="depo"){
          this.temp=[]
          this.temp=this.getSorumluByDepoID(this.depoadi);
          this.depo_sorumlulari=this.temp;
          //
        }
        if(deger=="harekettipi"){
          this.tedarikturu=''
          if(this.harekettipi==1){
          this.tedarikturleri=this.tedarikturleristokgiris
          this.tedarikturu=1
          this.tedarikcilabels=this.tedarikcilabel[0]
          }
          else{
          this.tedarikturleri=this.tedarikturleristokcikis
          this.tedarikcilabels=this.tedarikcilabel[1]
          }
        }
        if(deger="tedarikturu"){
            this.tedarikci=[]
            if(this.tedarikturu==1 && this.harekettipi==1){
            this.tedarikcilabels=this.tedarikcilabel[0]
            this.tedarikciler=this.firmalar
            this.itemtext=this.itemtext1[0]
            this.itemvalue=this.itemvalue1[0]
          }
          if(this.tedarikturu==1 && this.harekettipi==2){
            this.tedarikcilabels=this.tedarikcilabel[2]
            this.tedarikciler=this.firmalar
            this.itemtext=this.itemtext1[0]
            this.itemvalue=this.itemvalue1[0]
          }
          if(this.tedarikturu==2){
            this.tedarikcilabels=this.tedarikcilabel[3]
            this.tedarikciler=this.depolar
            this.itemtext=this.itemtext1[1]
            this.itemvalue=this.itemvalue1[1]
          }
        }
        
      },
      getColor (calories) {
        if (calories == 'GİRİŞ') return 'green'
        else if (calories == 'ÇIKIŞ') return 'red'
      },
      clickedEdit(val){
      this.status="edit"
      },
      clickedDelete(val){

      },
      add(index) {
            this.inputs.push({
                malzeme: '',
                miktar:'',
                birim:''
            });
        },
        remove(index) {
            this.inputs.splice(index, 1);
        },
      clickedNew(){
        //hangi tabda olduğuna bak 
        this.status='new'

      },
      clickedSave(){
        //hangi tabda olduğuna bak 
         this.$refs.stokform.validate();
          if(this.status=="new" && this.stokvalid){
           let obj = {
             depo_id: this.depoadi,
             sorumlu_id:this.sorumluadi,
             hareket_tipi:this.harekettipi,
             belge_tipi_id:this.belgetipi,
             belge_no:this.belgeno,
             tedarik_turu:this.tedarikturu,
             firma_depo_id:this.tedarikci,
             hareket_tarihi:this.$refs.picker.date,
             malzemeler:JSON.parse(JSON.stringify(this.inputs)),
             }
             this.saveStokHareketi(obj).then(()=>{
                    this.toastMessage('Stok Hareketi','Eklendi')
                    this.$refs.modals.dialog = false; 
             });
          }
    
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
   },
   data () {
      return {
        slots:[{ 
          Id: 1, slotName: 'hareket_tipi'
          }],
        stokvalid:false,
        malzeme_birimleri:[],
        depo_sorumlulari:[],
        k:null,
        itemtext:'',
        itemvalue:'',
        itemtext1:['firma_unvan','depo_adi'],
        itemvalue1:['firma_id','depo_id'],
        tedarikciler:[],
        tedarikcilabels:'',
        harekettipi:'',
        tedarikturu:'',
        belgeno:'',
        tedarikci:'',
        belgetipi:'',
        title:'Stok Hareketleri',
        tedarikturleri:[],
        inputs: [
            {
                malzemeler: '',
                miktar:'',
                birim:''
            }
        ],
        status:null,
        selectRules: [
          v => !!v || 'Bu alan Gerekli',
        ],
        sorumlurules: [
          v => !!v || 'Bu alan Gereklidir',
          v => v.length <= 255 || 'En fazla 255 karakter olabilir.',
        ],
        tab: null,
        MdlText: 'Stok Hareketi Ekle',
        refs:['modalsdepolar','modalsdepo','modalssorumlular','modalsfirmalar'],
        MdlNewText: ['Depo Tanımla','Depo Sorumlu Tanımla', 'Sorumlu Tanımla', 'Firma Ekle'],
        MdlEditText: ['Depo Düzenle','Depo Sorumlu Düzenle', 'Sorumlu Düzenle', 'Firma Düzenle'],
        btnText:  'Stok Hareketi Ekle',
        birimler:['ADET','KG','METRE','TON'],
          belgetipleri:[
            {belge_tipi:1,belge:'İRSALİYE'},
            {belge_tipi:2,belge:'DEPO FİŞİ'}
          ],
          tedarikturleristokcikis:[
            {tedarik_id:1,tedarik_turu:'FİRMA'},
            {tedarik_id:2,tedarik_turu:'DEPO'}
          ],
          tedarikturleristokgiris:[
            {tedarik_id:1,tedarik_turu:'FİRMA'},
          ],
          harekettipleri:[
            {hareket_tipi:1,hareket:'STOK GİRİŞİ'},
            {hareket_tipi:2,hareket:'STOK ÇIKIŞI'},
          ],
          headers: [
          {text: 'Hareket', value: 'hareket_tipi'},
          {text: 'Belge No', value: 'belge_no'},
          {text: 'Malzeme Adı', value: 'malzeme_adi'},
          {text: 'Miktar', value: 'miktar'},
          {text: 'Birim', value: 'malzeme_birim'},
          {text: 'Depo', value: 'depo_adi'},
          {text: 'Firma/Depo', value: 'firma_depo'},
          {text: 'Hareket Tarihi', value: 'hareket_tarihi'},
          {text: 'Actions', value: 'actions', sortable: false },
        ],
         depoadi:'',
         sorumluadi:[],
         tedarikcilabel:['Tedarikçi','Firma/Depo','Çıkış Firma','Çıkış Depo',]

      }
    },

}
</script>
<style scoped>
.v-list-item__content {
    padding-bottom: 0px !important;
}
.v-list {
    display: block;
    padding: 8px 0;
    padding-top: 8px;
    padding-right: 0px;
    padding-bottom: 0px !important;
    padding-left: 0px;
  
}
</style>