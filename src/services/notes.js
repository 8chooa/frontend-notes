import axios from 'axios'
const baseURL = '/api/notes'

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseURL)
    const nonExisting = {
        id: 1000,
        content: 'This note is not saved to server',
        important: true
    }

    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {

    const config = {
        headers: { Authorization: token }
    };

    const request = axios.post(baseURL, newObject, config)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}