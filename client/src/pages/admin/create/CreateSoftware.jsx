import Upload from "../../../components/inputs/Upload.jsx";
import Input from "../../../components/inputs/Input.jsx";
import Select from "../../../components/inputs/Select.jsx";
import {useEffect, useState} from "react";
import {allCategories, createApp} from "../../../requests/app.js";
import SubmitButton from "../../../components/inputs/SubmitButton.jsx";
import {toast} from "sonner";

const CreateSoftware = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        allCategories().then(response => {
            if (response.success) {
                const cat = response.result.map(res => ({
                    id: parseInt(res.categorie_id),
                    name: res.categorie_name
                }));
                setCategories(cat);
            }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const appData = {
            name: formData.get('name'),
            description: formData.get("description"),
            categorie: formData.get("categorie"),
            logo: formData.get("logo"),
            inter: formData.get("interface")
        }
        createApp(appData).then(response => {
            if (response.success) {
                console.log("ok")
                toast.success("Software created successfully");
            }
        })
    }

    return(
        <div className='admin-page create-software-container'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="image-container">
                    <Upload name="logo" />
                    <Upload name="interface" />
                </div>
                <Input name="name" type="text" />
                <textarea
                    name="description"
                    style={{marginTop: "20px"}}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}
                />
                <Select name="categorie" options={categories} />
                <SubmitButton name="Submit" />
            </form>
        </div>
    )
}

export default CreateSoftware;