const showSwal = (title, icon, [confirmButtonText, cancelButtonText], callback) => {
    swal
        .fire({
            title,
            icon,
            confirmButtonText,
            cancelButtonText,
            showCancelButton: true,
        })
        .then((result) => {
            callback ? callback(result) : null;
        });
};
const showToast = (title, icon, callback) => {
    swal
        .fire({
            position: "center",
            icon,
            title,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        .then((result) => {
            setTimeout(() => {
                callback ? callback(result) : null;
            }, 500);
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
export {
    showSwal, showToast, setToken,
    getToken
}