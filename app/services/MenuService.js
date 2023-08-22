import axios from "axios";
import ConstantList from "../appConfig";
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
  }
}
class MenuService {
  async getListMenuItem (){
    let url = ConstantList.API_ENPOINT + "/api/menuitem/getallroot";
    return await axios.get(url);
  };

  async getAllMenuItemByRoleList (){
    let url = ConstantList.API_ENPOINT + "/api/menuitem/getmenubyuser";
    return axios.get(url);
  };
}

export default new MenuService();
