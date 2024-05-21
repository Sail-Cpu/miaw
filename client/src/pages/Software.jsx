import Button from "../components/Button.jsx";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, appShortcutsByChapterSelector } from "../redux/app/selector";
import { getApp } from "../redux/app/action.js";
import Shortcut from "../components/Shortcut.jsx";
import {ThemeContext} from "../context/ThemeContext.jsx";
import {getImage} from "../requests/app.js";


export const AppDetails = () => {

    const {colors, theme} = useContext(ThemeContext);
    const { app_id, app_name, app_description } = useSelector(appSelector);
    const { shortcuts } = useSelector(appShortcutsByChapterSelector(1));
    const navigate = useNavigate();

    const [appPathName, setAppPathName] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await getImage("logo", app_name);
            if(response.success){
                setAppPathName(app_name.replaceAll(' ', '_').toLowerCase());
            }
        }
        fetchImage();
    }, [app_name]);

    const BASE_URL = "http://localhost:3000/uploads";

    return(
        <>
            <div className="software-head">
                <img src={`${BASE_URL}/logo_${appPathName}.png`} alt="logo" />
            </div>
            <div className="software-hero-banner">
                <div className="software-hero-banner-content software-hero-banner-left">
                    <div>
                        <h1>{app_name}</h1>
                        <p>{app_description}</p>
                    </div>
                    <div className="software-hero-banner-bottom">
                        <Button name="Course" onClick={() => navigate(`/software/${app_id}/course`)} color={colors[theme].green} />
                        <Button name="Knowledge Test" onClick={() => navigate(`/software/${app_id}/test`)} color={colors[theme].green} />
                    </div>
                </div>
                <div className="software-hero-banner-content software-hero-banner-right">
                    <img src={`${BASE_URL}/interface_${appPathName}.png`} alt="vs code" />
                </div>
            </div>
            <div className="shortcuts-list">
                <h1>Keyboard Shortcuts</h1>
                {shortcuts.slice(0, 5).map((shortcut, idx) => (
                    <Shortcut key={idx} data={shortcut} />
                ))}
            </div>
        </>
    )
}



const Software = () => {
    const { appId } = useParams();
    const { app_id } = useSelector(appSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getApp(appId));
        }
        fetchData();
    }, [dispatch, appId]);

   if(app_id === 0){
       return <div>error</div>
   }

    return (
        <div className="software-page-container">
            {<Outlet />}
        </div>
    );
};

export default Software;