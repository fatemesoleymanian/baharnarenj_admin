import axios from "axios";
axios.interceptors.response.use( (res) => {

  return res;
 },
 async (err) => {
     if (err.response.status === 500) {
         await HTTP.post('admin/logout')
             .then((res) => {
                 localStorage.removeItem('wugt');
                 localStorage.removeItem('vqmgp');
                 localStorage.removeItem('rgtokuukqp');
                 this.$notify({
                     title: "عملیات موفق!",
                     text: res.data.message,
                     type: 'success',
                 });
                 window.location = '/sign-in'
             })
             .catch((e) => {
                 return this.$notify({
                     title: "عملیات ناموفق!",
                     text: e.response.data.message,
                     type: 'error',
                 });
             });
     }
     return Promise.reject(err);
 });

axios.defaults.headers.common[ 'Content-Type' ] = 'application/json';
if (localStorage.getItem('vqmgp')) axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('vqmgp')}`}
export const HTTP = axios.create({
    baseURL : `https://api.photomimmarket.com/public/api/`

  });
