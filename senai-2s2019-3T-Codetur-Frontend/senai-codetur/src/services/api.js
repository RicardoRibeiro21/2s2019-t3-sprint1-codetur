import axios from 'axios';

export default {
  call(endpoint) {
    let urlApi = `http://localhost:5000/${endpoint}`;

    return {
      getOne: ({ id }) => axios.get(`${urlApi}/${id}`),
      getAll: () => axios.get(`${urlApi}`),
      update: (toUpdate) =>  axios.put(urlApi,toUpdate),
      create: (toCreate) =>  axios.post(urlApi,toCreate),
      delete: ({ id }) =>  axios.delete(`${urlApi}/${id}`)
    }
  }
}