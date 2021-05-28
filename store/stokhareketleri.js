/*eslint-disable*/
import Vue from 'vue';
export const getters={
}
export const state = () => ({
    stok_hareketleri : [],
    temp:[],
})
export const mutations = {
    SET_STOK_HAREKETLERI(state,data){
        state.stok_hareketleri= data;
    },
    ADD_STOK_HAREKETI(state,data)
    {
    
        let temp1=data;
        state.temp=data
        state.stok_hareketleri = state.stok_hareketleri.concat(state.temp);
    },
}

export const actions = {

    async getStokHareketleri({commit}){
        const res = await this.$starWarsApi.$get('/stok-hareketleri');
        commit('SET_STOK_HAREKETLERI',res); 
    },
    async saveStokHareketi ({commit}, request){

        await this.$starWarsApi.post("/stok-hareketleri", request).then(res => {
            commit('ADD_STOK_HAREKETI',res.data);
    });
       
    },



}