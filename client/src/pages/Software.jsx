import Button from "../components/Button.jsx";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, appShortcutsByChapterSelector } from "../redux/app/selector";
import { getApp } from "../redux/app/action.js";
import Shortcut from "../components/Shortcut.jsx";
import {ThemeContext} from "../context/ThemeContext.jsx";


export const AppDetails = () => {

    const {colors, theme} = useContext(ThemeContext);
    const { app_id, app_name, app_description, app_logo, app_interface } = useSelector(appSelector);
    const { shortcuts } = useSelector(appShortcutsByChapterSelector(1));
    const navigate = useNavigate();

    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/uploads`;

    return(
        <>
            <div className="software-head">
                <img src={`${BASE_URL}/logo_${app_logo}`} alt="logo" />
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
                    <div
                        className="software-interface"
                        style={{backgroundImage: `url(${BASE_URL}/interface_${app_interface})`}}>
                    </div>
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getApp(appId));
            setLoading(false);
        }
        fetchData();
    }, [dispatch, appId]);

   if(app_id === 0){
       return <div>error</div>
   }

   if(loading){
       return <div></div>
   }

    return (
        <div className="software-page-container">
            {<Outlet />}
        </div>
    );
};

export default Software;