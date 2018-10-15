import axios from 'axios'

const apiFetch = ({ url,method,body,formData,callback,error }) => {


  const req = createReq({ method,url,body,formData });

  return req.then(res => {
    if(callback) callback(res.data);
  }).catch(err => {
    console.error(err)
    if(error) error(err.response);
  })

}

const createReq = ({ method,url,body,formData }) => {
  const config = {
    method,
    url,
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content'),
          'X-Requested-With': 'XMLHttpRequest'
      }
  };

  if (body) config.data = JSON.stringify(body);

  if (formData) {
    config.data = formData;
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return axios(config);
}

export const apiAll = ({ data,callback,error }) => {

  const reqs = data.map(elem => createReq(elem));

  axios.all(reqs)
    .then(axios.spread((...data)=>{
    if(callback) callback(data);
    })).catch(err => {
    console.error(err.response)
    if(error) error(err.response && err.response.data && err.response.data.description);
  });
}

export const apiPost = (data) => {
  data.method = "POST";
  return apiFetch(data);
}

export const apiGet = (data) => {
  data.method = "GET";
  return apiFetch(data);
}

export const apiPut = (data) => {
  data.method = "PUT";
  return apiFetch(data);
}

export const apiPatch = (data) => {
  data.method = "PATCH";
  return apiFetch(data);
}

export const apiDelete = (data) => {
  data.method = "DELETE";
  return apiFetch(data);
}