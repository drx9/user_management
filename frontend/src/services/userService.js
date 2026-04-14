import api from './api';

export const userService = {
  getAllUsers: (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    return api.get(`/users?${params}`);
  },

  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },

  createUser: (userData) => {
    return api.post('/users', userData);
  },

  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },
};

export default userService;
