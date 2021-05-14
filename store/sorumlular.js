/*eslint-disable*/
import Vue from 'vue';
export const getters={

}
export const state = () => ({
    sorumlular : [],
})
export const mutations = {
    SET_SORUMLULAR(state,data){
        state.sorumlular= data;
    },
    ADD_SORUMLU(state,data){
        state.sorumlular.push(data)
    },
    EDIT_SORUMLU(state,data){
        const ogIndex = state.sorumlular.findIndex(t => t.sorumlu_id === data.sorumlu_id)
        Vue.set(state.sorumlular, ogIndex, data);
        //state.malzemeler[ogIndex] = data;
    },
    DELETE_SORUMLU(state,data){
        const index = state.sorumlular.findIndex(p => p.sorumlu_id === data)
        state.sorumlular.splice(index, 1)
    }
}
export const actions = {

    async getSorumlular({commit}){
        const sorumlular = await this.$axios.$get('/sorumlular');
        commit('SET_SORUMLULAR',sorumlular); 
    },

    async saveSorumlular ({commit}, request){

        var params = new URLSearchParams;
        params.append("sorumlu_ad_soyad",request.sorumlu_ad_soyad);

        var gidecek = {
            params: params
        };

        let res=await this.$axios.post("/sorumlular",null, gidecek);
        commit('ADD_SORUMLU',res.data);
    },

    async editSorumlular ({commit},request){

        var params = new URLSearchParams;
        params.append("sorumlu_ad_soyad",request.sorumlu_ad_soyad);

        var gidecek = {
            params:params
        }

        let res= await this.$axios.put("/sorumlular/"+request.sorumlu_id,null, gidecek);
        commit('EDIT_SORUMLU',res.data)


    },

    async deleteSorumlular({commit},request){
       
        
        let res = await this.$axios.delete("/sorumlular/"+request); 
        commit('DELETE_SORUMLU',request) 

    }

}