class Auth {
  login = (res, callback) => {
    localStorage.setItem("token", res.data);
    callback();
  };

  logout = callback => {
    localStorage.clear();
    callback();
  };
}

export default new Auth();
