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
        const request = await axios.post(`${BASE_LINK}/app`, {
            name,
            description,
            categorie
        })
        const formData = new FormData();
        const renamedLogo = new File([logo], `logo_${name}.${getFileExtension(logo.name)}`);
        const renamedInterface = new File([inter], `interface_${name}.${getFileExtension(inter.name)}`);
        //const images = [renamedLogo, renamedInterface];
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