import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

const login = async (credentials) => {
    const res = await api.post('/login', credentials)
        .catch((error) => {
            return error;
        });
    if (res.status === 200) {
        return true;
    }
};

const getEmployees = async () => {
    const res = await api.get('/db/getList')
        .catch((error) => {
            return error;
        });
    if (res.status === 200) {
        return res.data;
    }
};

const createEmployee = async (employee) => {

    const formData = new FormData();
    for (const key in employee) {
        if (key === 'image') {
            formData.append('image', employee[key], employee[key].name);
        } else if (key === 'course') {
            employee[key].forEach(course => formData.append('course[]', course));
        } else {
            formData.append(key, employee[key]);
        }
    }
    

    try {
        const res = await api.post('/db/addEmployee', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch((error) => {
            return error;
        });
        console.log(res.status);

        if (res.status === 201) {
            return res.data;
        }
        else if (res.status === 400) {
            return false;
        }
    } catch (error) {
        console.error('Error creating employee:', error);
        return error;
    }
};

const deleteEmployee = async (id) => {
    await api.delete(`/db/deleteEmployee/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
};

const updateEmployee = async (id, employee) => {
    const formData = new FormData();
    for (const key in employee) {
        if (key === 'image' && employee[key] instanceof File) {
            formData.append('image', employee[key], employee[key].name);
        } else if (key === 'course') {
            employee[key].forEach(course => formData.append('course[]', course));
        } else {
            formData.append(key, employee[key]);
        }
    }
    

    try {
        const response = await api.put(`/db/updateEmployee/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

const register = async (credentials) => {
    const res = await api.post('/login/register', credentials)
        .catch((error) => {
            return error;
        });
    if (res.status === 201) {
        return true;
    }
};


const checkLogin = async () => {
    const res = await api.get('/login/checkEmpty')
        .catch((error) => {
            return error;
        })
    if (res.status === 200) {
        return true;
    }

};


export { login, getEmployees, createEmployee, deleteEmployee, updateEmployee, register, checkLogin };