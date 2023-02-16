import http from "../http-common";

const getAll = () => {
  return http.get("/notes");
};

const get = (id) => {
  return http.get(`/notes/${id}`);
};

const create = (data) => {
  return http.post("/notes", data);
};

const update = (id, data) => {
  console.log(id, data);
  return http.put(`/notes/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/notes/${id}`);
};

const removeAll = () => {
  return http.delete(`/notes`);
};

const findByTitle = (title) => {
  return http.get(`/notes?title=${title}`);
};

const NoteServices = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default NoteServices;
