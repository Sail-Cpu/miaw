import Button from "../components/Button.jsx";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, appShortcutsByChapterSelector } from "../redux/app/selector";
import { getApp } from "../redux/app/action.js";
import Shortcut from "../components/Shortcut.jsx";


export const AppDetails = () => {
    const { app_id, app_name, app_description } = useSelector(appSelector);
    const { shortcuts } = useSelector(appShortcutsByChapterSelector(1));
    const navigate = useNavigate();

    const logoPath = "/images/app/logo";
    const interfacePath = "/images/app/interface";

    return(
        <>
            <div className="software-head">
                <img src={`${logoPath}/${app_id}.png`} alt="logo" />
            </div>
            <div className="software-hero-banner">
                <div className="software-hero-banner-content software-hero-banner-left">
                    <div>
                        <h1>{app_name}</h1>
                        <p>{app_description}</p>
                    </div>
                    <div className="software-hero-banner-bottom">
                        <Button name="Course" onClick={() => navigate(`/software/${app_id}/course`)} color="#33D3C1" />
                        <Button name="Knowledge Test" onClick={() => navigate(`/software/${app_id}/test`)} color="#33D3C1" />
                    </div>
                </div>
                <div className="software-hero-banner-content software-hero-banner-right">
                    <img src={`${interfacePath}/${app_id}.png`} alt="vs code" />
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