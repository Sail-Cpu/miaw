import Upload from "../../../components/inputs/Upload.jsx";
import Input from "../../../components/inputs/Input.jsx";
import Select from "../../../components/inputs/Select.jsx";
import {useEffect, useRef, useState} from "react";
import {allCategories, createApp} from "../../../requests/app.js";
import SubmitButton from "../../../components/inputs/SubmitButton.jsx";
import {toast} from "sonner";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../../redux/auth/selector.js";

const CreateSoftware = () => {

    const [categories, setCategories] = useState([])
    const {token} = useSelector(currentUserSelector);

    const formRef = useRef(null);

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
            inter: formData.get("interface"),
            token: token
        }
        createApp(appData).then(response => {
            console.log(response)
            if (response.success) {
                toast.success("Software created successfully");
                handleReset(e)
            }
        })
    }

    const handleReset = (e) => {
        e.preventDefault();
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return(
        <div className='admin-page create-software-container'>
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
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