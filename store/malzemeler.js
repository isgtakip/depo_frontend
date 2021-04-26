/*eslint-disable*/
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
    }
   
}
