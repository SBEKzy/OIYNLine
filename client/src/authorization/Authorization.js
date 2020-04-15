import axios from "axios";


export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export function logout(setAuth) {
  setAuthorizationToken(false);
  localStorage.clear();
  setAuth("LOGOUT");
}

export const login = (reg, setAuth) => {
  axios.post("http://localhost:8080/api/login", reg).then((response) => {
    console.log(response);
    console.log(response.data.response.token);
    localStorage.setItem("token", response.data.response.token);
    localStorage.setItem("user_data", JSON.stringify(response.data.response));
    setAuthorizationToken(response.data.response.token);
    //const { Auth, setAuth } = valueContext;
    setAuth("LOGIN");
    console.log("LOGIN SUCCess");
  });
};

export const register = (reg,regResult) => {
  let r;
 const t = axios
    .post("http://localhost:8080/api/register", JSON.stringify(reg))
    .then((response) => {      
      if(response.status == 201){
        console.log("Success");
        regResult("SUCCESS")
      }
      
    })
    .catch((error) => {
      if(error.response.data.code == "5"){
        console.log("Error");
        regResult("ERROR")       
      }
    });
    
    
    
    return r;
};

