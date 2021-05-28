/*eslint-disable*/
export default function (ctx, inject) {
  let {                                                                                                                                                                                  
    app: { $cookies, $axios,$gates },                                                                                                                                                           
    res,                                                                                                                                                                                 
    req,                                                                                                                                                                                 
    store,                                                                                                                                                                               
    redirect,                                                                                                                                                                            
  } = ctx;

       
  



  const starWarsApi = $axios.create()
  starWarsApi.setBaseURL(process.env.apiURL)
   starWarsApi.onResponse((response) => {
  

  })



  inject('starWarsApi', starWarsApi)
}
