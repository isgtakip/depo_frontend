/*eslint-disable*/
export const state = () => ({
    permissions: [],
    rules:[],
})
export const mutations = {

    SET_PERMISSIONS(state,data){
        state.permissions= data;
    },

}
export const actions={

    //kullanıcı ilk girdiğinde ve sayfa yenilendiğinde artı route değiştiğinde çalışacak 
    async getPermissions ({commit}, request){
        const res = await this.$starWarsApi.$get('/getAllPermissionsAttribute')
        commit('SET_PERMISSIONS',res)   
    }
}