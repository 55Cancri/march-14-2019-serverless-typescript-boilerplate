import axios from 'axios';

// attach headers to every request
export const axiosGuard = axios.create();
axiosGuard.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation, immutable/no-mutation
  config.headers.jwt = localStorage.getItem('jwt');
  return config;
});

export default {
  user: {
    login: credentials => axios.post('/login', { credentials }).then(res => res.data.user),

    signup: user => axios.post('/signup', { user }).then(res => res.data.user),

    refresh: user => axios.post('/refresh', { user }).then(res => res.data.user),
  },
};
