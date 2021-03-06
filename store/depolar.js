/*eslint-disable*/
import Vue from 'vue';
export const getters={

}
export const state = () => ({
    depolar : [],
})
export const mutations = {
    SET_DEPOLAR(state,data){
        state.depolar= data;
    },
    ADD_DEPO(state,data){
        state.depolar.push(data)
    },
    EDIT_DEPO(state,data){
        const ogIndex = state.depolar.findIndex(t => t.depo_id === data.depo_id)
        //alert(ogIndex)
        Vue.set(state.depolar, ogIndex, data);
        //state.malzemeler[ogIndex] = data;
    },
    DELETE_DEPO(state,data){
        const ogIndex = state.depolar.findIndex(t => t.depo_id === data)
        state.depolar.splice(ogIndex, 1)
    }
}
export const actions = {

    async getDepolar({commit}){
        const depolar = await this.$starWarsApi.$get('/depolar');
        commit('SET_DEPOLAR',depolar); 
    },

    async saveDepo ({commit}, request){

        var params = new URLSearchParams;
        params.append("depo_adi",request.depo_adi);

        var gidecek = {
            params: params
        };

        let res=await this.$starWarsApi.post("/depolar",null, gidecek);
        commit('ADD_DEPO',res.data);
    },

    async editDepo ({commit},request){

        var params = new URLSearchParams;
        params.append("depo_adi",request.depo_adi);

        var gidecek = {
            params:params
        }

        let res= await this.$starWarsApi.put("/depolar/"+request.depo_id,null, gidecek);
        commit('EDIT_DEPO',res.data)


    },

    async deleteDepo({commit},request){
       
        
        let res = await this.$starWarsApi.delete("/depolar/"+request); 
        commit('DELETE_DEPO',request) 

    }

}