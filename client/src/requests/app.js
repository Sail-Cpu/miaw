import axios from "axios";

const BASE_LINK = `http://localhost:3000`;
export const allApps = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/apps`)
        return request.data;
    }catch (error) {
        return error.response.data
    }
}

export const appById = async (appId) => {
    try{
        const request = await axios.get(`${BASE_LINK}/app/${appId}`)
        return request.data;
    }catch (error) {
        return error.response.data
    }
}
export const allCategories = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/categories`)
        return request.data;
    }catch (error) {
        return error.response.data
    }
}

function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export const createApp = async (appData) => {
    const {name, description, categorie, logo, inter} = appData;
    try {
        if(!name || !description || !categorie || !logo || !inter) throw new Error('All fields are required');
        const request = await axios.post(`${BASE_LINK}/app`, {
            name,
            description,
            categorie
        })
        const formData = new FormData();
        const renamedLogo = new File([logo], `logo_${name.replaceAll(' ', '_').toLowerCase()}.${getFileExtension(logo.name)}`);
        const renamedInterface = new File([inter], `interface_${name.replaceAll(' ', '_').toLowerCase()}.${getFileExtension(inter.name)}`);
        formData.append('image', renamedLogo)
        const imageResponse = await axios.post(`${BASE_LINK}/upload`, formData, {
            headers: {
                    'Content-Type': 'multipart/form-data'
            }
        });
        formData.delete('image');
        formData.append('image', renamedInterface)
        imageResponse = await axios.post(`${BASE_LINK}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return request.data;
    } catch (error) {
        return error
    }
}

export const createShortcut= async (softwareData) => {
    const {name, description, chapter_id, app_id, keys, categorie_id} = softwareData;
    try{
        if(!name || !description || !chapter_id || !app_id || !keys) throw new Error('All fields are required');
        const addShortcut = await axios.post(`${BASE_LINK}/shortcut`, {
            name,
            description,
            chapter_id,
            app_id,
            keys,
        })
        return addShortcut.data;
    }catch (error) {
        return error
    }
}

export const getImage = async (imageType, imageName) => {
    try {
        const request = await axios.get(`${BASE_LINK}/image/${imageType}/${imageName}`)
        return request.data;
    } catch (error) {
        return error
    }
}

export const getAllKeys = async () => {
    try {
        const request = await axios.get(`${BASE_LINK}/keys`);
        return request.data;
    } catch (error) {
        return error
    }
}