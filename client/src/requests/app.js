import axios from "axios";

const BASE_LINK = import.meta.env.VITE_APP_API_URL;
export const allApps = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/apps`, {
            headers:{
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data;
    }catch (error) {
        return error.response.data
    }
}

export const appById = async (appId) => {
    try{
        const request = await axios.get(`${BASE_LINK}/app/${appId}`, {
            headers:{
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data;
    }catch (error) {
        return error.response.data
    }
}
export const allCategories = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/categories`, {
            headers:{
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data;
    }catch (error) {
        return error.response.data
    }
}

function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export const createApp = async (appData) => {
    const {name, description, categorie, logo, inter, token} = appData;
    try {
        if(!name || !description || !categorie || !logo || !inter || !token) throw new Error('All fields are required');
        const request = await axios.post(`${BASE_LINK}/app`, {
            name,
            description,
            categorie
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const formData = new FormData();
        const renamedLogo = new File([logo], `logo_${name.replaceAll(' ', '_').toLowerCase()}.${getFileExtension(logo.name)}`);
        const renamedInterface = new File([inter], `interface_${name.replaceAll(' ', '_').toLowerCase()}.${getFileExtension(inter.name)}`);
        formData.append('image', renamedLogo)
        let imageResponse = await axios.post(`${BASE_LINK}/upload`, formData, {
            headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
            }
        });
        formData.delete('image');
        formData.append('image', renamedInterface)
        imageResponse = await axios.post(`${BASE_LINK}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return request.data;
    } catch (error) {
        return error
    }
}

export const createShortcut= async (softwareData) => {
    const {name, description, chapter_id, app_id, keys, token} = softwareData;
    try{
        if(!name || !description || !chapter_id || !app_id || !keys || !token) throw new Error('All fields are required');
        const addShortcut = await axios.post(`${BASE_LINK}/shortcut`, {
            name,
            description,
            chapter_id,
            app_id,
            keys,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return addShortcut.data;
    }catch (error) {
        return error
    }
}

export const getImage = async (imageType, imageName) => {
    try {
        const request = await axios.get(`${BASE_LINK}/image/${imageType}/${imageName}`, {
            headers:{
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data;
    } catch (error) {
        return error
    }
}

export const getAllKeys = async () => {
    try {
        const request = await axios.get(`${BASE_LINK}/keys`, {
            headers:{
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        });
        return request.data;
    } catch (error) {
        return error
    }
}