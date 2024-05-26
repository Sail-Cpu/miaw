import {useEffect, useState} from "react";
import {getImage} from "../../requests/app.js";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";

const UserProfile = () => {

    const [pictureProfile, setPictureProfile] = useState(null);

    const {username, email, job, os} = useSelector(currentUserSelector);

    const BASE_URL = "http://localhost:3000/uploads";

    useEffect(() => {
        const fetchImage = async () => {
            let response = await getImage("user", username);
            if(response.success){
                setPictureProfile(`${BASE_URL}/${response.result}`);
            }
        }
        fetchImage();
    }, []);

    return (
        <div className="user-profile-page">
            <div className="user-profile-header">
                <div className="user-profile-header-left">
                    <div className="picture-profile" style={{backgroundImage: `url(${pictureProfile})`}}></div>
                </div>
                <div className="user-profile-header-right">
                    <h1>{username}</h1>
                </div>
            </div>
            <div className="user-profile-content">
                <h3>Email: {email}</h3>
                <h3>job: {job}</h3>
                <h3>os: {os}</h3>
            </div>
        </div>
    );
}

export default UserProfile;