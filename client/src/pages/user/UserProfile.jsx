import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";

const UserProfile = () => {

    const {username, email, job, os, picture} = useSelector(currentUserSelector);

    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/uploads`;

    return (
        <div className="user-profile-page">
            <div className="user-profile-header">
                <div className="user-profile-header-left">
                    <div className="picture-profile" style={{backgroundImage: `url(${BASE_URL}/${picture})`}}></div>
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