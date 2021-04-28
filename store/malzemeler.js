/*eslint-disable*/
import Vue from 'vue';
export const getters ={
    getAllMalzemes(state){
        return state.malzemeler;
    },
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
        const ogIndex = state.malzemeler.findIndex(t => t.malzeme_id === data.malzeme_id)
        state.malzemeler.splice(ogIndex, 1)
    }
}
export const actions = {

    async getMalzemeler ({commit}) {
    const malzemeler = await this.$axios.$get('http://127.0.0.1:8000/api/malzemeler')
    commit('SET_MALZEMELER',malzemeler)                  
    },
    
    async saveMalzemeler ({commit}, request){
        var params = new URLSearchParams;
        params.append("malzeme_adi",request.malzeme_adi);
        params.append("malzeme_birim",request.malzeme_birim);

        var gidecek = {
            params: params
        };

        let res=await this.$axios.post("http://127.0.0.1:8000/api/malzemeler",null, gidecek);
        commit('ADD_MALZEME',res.data);
    },
    async editMalzemeler ({commit},request){

        var params = new URLSearchParams;
        params.append("malzeme_adi",request.malzeme_adi);
        params.append("malzeme_birim",request.malzeme_birim);

        var gidecek = {
            params:params
        }

        let res= await this.$axios.put("http://127.0.0.1:8000/api/malzemeler/"+request.malzeme_id,null, gidecek);
        commit('EDIT_MALZEME',res.data)


    },

    async deleteMalzemeler({commit},request){
       
        
        let res = await this.$axios.delete("http://127.0.0.1:8000/api/malzemeler/"+request); 
        commit('DELETE_MALZEME',res.data) 

    }
   
}
