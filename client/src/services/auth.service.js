import axios from '../utils/axios_client';
import Swal from "sweetalert2";

export const login = (model, cb) =>{
    axios.post('/api/login', model).
    then(({data}) =>{
        cb(data)
    }).
    catch(({response}) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data
          })
    })
}

export const signup  = (model, cb) =>{
    axios.post('/api/signup', model).
    then(({data}) =>{
        cb(data)
    }).
    catch(({response}) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data
          })
    })
}