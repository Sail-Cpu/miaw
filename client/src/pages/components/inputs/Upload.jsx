import PropTypes from "prop-types";
import {useState} from "react";

const Upload = (props) => {

    const { name } = props;

    const [image, setImage] = useState("");

    return(
        <div className="form-input file-upload-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <div className="file-upload-container">
                <input name={name} type="file" onChange={(e) => setImage(e.target.value)}/>
                {!image ?
                    <>
                        <p>Drop your files here or <span>browse</span></p>
                        <p style={{color: "#9CA3AF"}}>Maximum size: 50MB</p>
                    </>
                    :
                    <>
                        <p>{image}</p>
                    </>
                }
            </div>
        </div>
    )
}

Upload.propTypes = {
    name: PropTypes.string.isRequired
};

export default Upload;