import axios from '../utils/axios_client';

export const login = (model, cb) =>{
    axios.post('/api/login', model).
    then((data) =>{
        console.log(data)
        cb()
    }).
    catch(err => {
        console.log(err)
    })
}