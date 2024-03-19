const showSwal = (title, icon, confirmButtonText, callback) => {
  swal
    .fire({
      title,
      icon,
      confirmButtonText,
    })
    .then((result) => {
      callback ? callback(result) : null;
    });
};
const showToast = async (title, icon, callback) => {
  swal
    .fire({
      position: "center",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
    .then(async (result) => {
      callback ? callback() : ''
    });
};
const setToLocalSt = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
const getFromLocalSt = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
const setToken = (token) => {
  return setToLocalSt("panel", { token });
};
const getToken = () => {
  return getFromLocalSt("panel")?.token || null;
};
export { showSwal, showToast, setToken, getToken };
