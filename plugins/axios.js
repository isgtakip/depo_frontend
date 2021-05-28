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
  starWarsApi.setBaseURL('http://localhost:8000/api/')
 

   starWarsApi.onResponse((response) => {
  

  })



  inject('starWarsApi', starWarsApi)
}
