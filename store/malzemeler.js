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
    }
}
export const actions = {

      async getMalzemeler ({commit}) {
      const malzemeler = await this.$axios.$get('http://127.0.0.1:8000/api/malzemeler')
      commit('SET_MALZEMELER',malzemeler)            
            
    },
   
}
