/*eslint-disable*/
import Vue from 'vue';
export const getters ={
    getAllMalzemes(state){
        return state.malzemeler;
    },
    getMalzemeBirimByID: (state) => (malzeme_id) => {
        return state.malzemeler.find(malzeme => malzeme.malzeme_id === malzeme_id)
    }
}
export const state = () => ({
    malzemeler : [],
})
export const mutations = {
    SET_MALZEMELER(state,data){
        state.malzemeler= data;
    },
    ADD_MALZEME(state,data){
        state.malzemeler.push(data)
    },
    EDIT_MALZEME(state,data){
        const ogIndex = state.malzemeler.findIndex(t => t.malzeme_id === data.malzeme_id)
        //alert(ogIndex)
        Vue.set(state.malzemeler, ogIndex, data);
        //state.malzemeler[ogIndex] = data;
    },
    DELETE_MALZEME(state,data){
        const ogIndex = state.malzemeler.findIndex(t => t.malzeme_id === data)
        state.malzemeler.splice(ogIndex, 1)
    }
}
export const actions = {

    async getMalzemeler ({commit}) {
    const malzemeler = await this.$starWarsApi.$get('/malzemeler')
    commit('SET_MALZEMELER',malzemeler)                  
    },
    
    
    async saveMalzemeler ({commit}, request){
        var params = new URLSearchParams;
        params.append("malzeme_adi",request.malzeme_adi);
        params.append("malzeme_birim",request.malzeme_birim);
        params.append("depo_id",request.depo_id)

        var gidecek = {
            params: params
        };

        let res=await this.$starWarsApi.post("/malzemeler",null, gidecek);
        commit('ADD_MALZEME',res.data);
    },
    async editMalzemeler ({commit},request){

        var params = new URLSearchParams;
        params.append("malzeme_adi",request.malzeme_adi);
        params.append("malzeme_birim",request.malzeme_birim);
        params.append("depo_id",request.depo_id)

        var gidecek = {
            params:params
        }

        let res= await this.$starWarsApi.put("/malzemeler/"+request.malzeme_id,null, gidecek);
        commit('EDIT_MALZEME',res.data)


    },

    async deleteMalzemeler({commit},request){
       
        
        let res = await this.$starWarsApi.delete("/malzemeler/"+request); 
        commit('DELETE_MALZEME',request) 

    }
   
}
