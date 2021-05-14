/*eslint-disable*/
import Vue from 'vue';
export const getters={

getSorumluByDepoID: (state) => (depo_id) => {
return state.depo_sorumlulari.find(sorumlu => sorumlu.depo_id === depo_id)
}

}
export const state = () => ({
    depo_sorumlulari : [],
    
})
export const mutations = {
    SET_DEPO_SORUMLULARI(state,data){
        state.depo_sorumlulari= data;
    },
    ADD_DEPO_SORUMLULARI(state,data){
        state.depo_sorumlulari.push(data)
    },
    EDIT_DEPO_SORUMLULARI(state,data){
        const ogIndex = state.depo_sorumlulari.findIndex(t => t.depo_sorumlu_id === data.depo_sorumlu_id)
        Vue.set(state.depo_sorumlulari, ogIndex, data);
    },
    DELETE_DEPO_SORUMLU(state,data){
        const index = state.depo_sorumlulari.findIndex(p => p.depo_sorumlu_id === data)
        state.depo_sorumlulari.splice(index, 1)
    },
   
}
export const actions = {

    async getDepoSorumlulari({commit}){
        const res = await this.$axios.$get('/depo-sorumlulari');
        commit('SET_DEPO_SORUMLULARI',res); 
    },

    async saveDepoSorumlulari ({commit}, request){

        var params = new URLSearchParams;
        params.append("depo_id",request.depo_id);
        params.append("sorumlu_id",request.sorumlu_id);

        var gidecek = {
            params: params
        };

        let res=await this.$axios.post("/depo-sorumlulari",null, gidecek);
        commit('ADD_DEPO_SORUMLULARI',res.data[0]);
    },

    async editDepoSorumlulari ({commit},request){

        var params = new URLSearchParams;
        params.append("sorumlu_id",request.sorumlu_id);
        params.append("depo_id",request.depo_id)

        var gidecek = {
            params:params
        }

        let res= await this.$axios.put("/depo-sorumlulari/"+request.depo_sorumlu_id,null, gidecek);
        commit('EDIT_DEPO_SORUMLULARI',res.data[0])


    },

    async deleteDepoSorumlulari({commit},request){
       
        
        let res = await this.$axios.delete("/api/depo-sorumlulari/"+request); 
        commit('DELETE_DEPO_SORUMLU',request) 

    },

 


}