import Upload from "../../../components/inputs/Upload.jsx";
import Input from "../../../components/inputs/Input.jsx";
import Select from "../../../components/inputs/Select.jsx";
import {useEffect, useRef, useState} from "react";
import {allCategories, createApp} from "../../../requests/app.js";
import SubmitButton from "../../../components/inputs/SubmitButton.jsx";

const CreateSoftware = () => {

    const [categories, setCategories] = useState([])
    const hasFetchedCategories = useRef(false);

    useEffect(() => {
        if (!hasFetchedCategories.current) {
            allCategories().then(response => {
                if (response.success) {
                    response.result.forEach(res => {
                        setCategories(prevState =>
                            [...prevState, {id: res.categorie_id, name: res.categorie_name}]
                        );
                    });
                }
            });
            hasFetchedCategories.current = true;
        }
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
                console.log(response)
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