import Upload from "../../../components/inputs/Upload.jsx";
import Input from "../../../components/inputs/Input.jsx";
import Select from "../../../components/inputs/Select.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {allCategories} from "../../../requests/app.js";
import Button from "../../../components/Button.jsx";
import {ThemeContext} from "../../../context/ThemeContext.jsx";
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

    return(
        <div className='admin-page create-software-container'>
            <form>
                <div className="image-container">
                    <Upload name="icon" />
                    <Upload name="interface" />
                </div>
                <Input name="name" type="text" />
                <textarea
                    name="description"
                    style={{marginTop: "20px"}}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}
                />
                <Select name="categories" options={categories} />
                <SubmitButton name="Submit" />
            </form>
        </div>
    )
}

export default CreateSoftware;