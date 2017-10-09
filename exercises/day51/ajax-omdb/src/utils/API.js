import axios from "axios";
const BASEURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&apikey=40e9cece";

export default {
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};
