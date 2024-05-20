import Upload from "../../../components/inputs/Upload.jsx";
import Input from "../../../components/inputs/Input.jsx";
import Select from "../../../components/inputs/Select.jsx";

const categories = [
    "tech"
]

const CreateSoftware = () => {



    return(
        <div className='admin-page create-software-container'>
            <div className="image-container">
                <Upload name="icon" />
                <Upload name="interface" />
            </div>
            <Input name="name" type="text" />
            <textarea name="description" style={{marginTop: "20px"}}/>
            <Select name="category" options={categories}/>
        </div>
    )
}

export default CreateSoftware;