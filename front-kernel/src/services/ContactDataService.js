import http from "../http-common";

class ContactDataService {
  getAll() {
    return http.get("/contacts");
  }

  get(id) {
    return http.get(`/contacts/${id}`);
  }

  create(data) {
    return http.post("/contacts/add", data);
  }

  update(id, data) {
    return http.put(`/contacts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contacts/${id}`);
  }

  deleteMany(data) {
    return http.post(`/contacts/delete`,data);
  }

  findByLastName(nom) {
    return http.get(`/contacts?nom=${nom}`);
  }
}

export default new ContactDataService();
