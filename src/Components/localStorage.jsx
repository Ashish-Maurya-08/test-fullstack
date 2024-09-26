const key = "user";

const getUser = () => {
    return JSON.parse(localStorage.getItem(key));
}

const setUser = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const removeUser = () => {
    localStorage.removeItem(key);
}

const checkUser = () => {
    const user = getUser(key);
    if(user){
        return true;
    }
    return false;
}

export { getUser, setUser, removeUser, checkUser };