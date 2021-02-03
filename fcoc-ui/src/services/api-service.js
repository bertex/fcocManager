import http from "../http-common";

class ApiData {
  getAll() {
    return http.get("/maps");
  }
  getMapById (id) {
    return http.get("/map/"+ id);
  }
  getMapsByUserId (id) {
    return http.get ("/maps/" +id);
  }
  addMap (map) {
    return http.post("/map/create",map)
  }
  updateMap(id) {
    return http.put("/map/" + id)
  }
  deleteMap(id) {
    return http.delete("/map/" + id)
  }
  signin(user) {
    return http.post( "/signin", user)
  }
  signup (user) {
    return http.post("/signup",user)
  }

}
export default new ApiData();
