/*eslint-disable*/
import Vue from 'vue';
export const getters={

}
export const state = () => ({
    firmalar : [],
})
export const mutations = {
    SET_FIRMALAR(state,data){
        state.firmalar= data;
    },
    ADD_FIRMA(state,data){
        state.firmalar.push(data)
    },
    EDIT_FIRMA(state,data){
        const ogIndex = state.firmalar.findIndex(t => t.firma_id === data.firma_id)
        Vue.set(state.firmalar, ogIndex, data);
        //state.malzemeler[ogIndex] = data;
    },
    DELETE_FIRMA(state,data){
        const index = state.firmalar.findIndex(p => p.firma_id === data)
        state.firmalar.splice(index, 1)
    }
}
export const actions = {

    async getFirmalar({commit}){
        const firmalar = await this.$starWarsApi.$get('/firmalar');
        commit('SET_FIRMALAR',firmalar); 
    },
    async saveFirma ({commit}, request){

        var params = new URLSearchParams;
        params.append("firma_unvan",request.firma_unvan);
        params.append("firma_tip",request.firma_tip);
        params.append("firma_tur",request.firma_tur);

        var gidecek = {
            params: params
        };

        let res=await this.$starWarsApi.post("/firmalar",null, gidecek);
        commit('ADD_FIRMA',res.data);
    },

    async editFirma ({commit},request){

        var params = new URLSearchParams;
        params.append("firma_unvan",request.firma_unvan);
        params.append("firma_tip",request.firma_tip);
        params.append("firma_tur",request.firma_tur);

        var gidecek = {
            params:params
        }

        let res= await this.$starWarsApi.put("/firmalar/"+request.firma_id,null, gidecek);
        commit('EDIT_FIRMA',res.data)


    },

    async deleteFirma({commit},request){
       
        
        let res = await this.$starWarsApi.delete("/firmalar/"+request); 
        commit('DELETE_FIRMA',request) 

    }

}