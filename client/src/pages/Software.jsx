import NavButton from "../components/NavButton.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectApp} from "../redux/app/action.js";
import Shortcut from "../components/Shortcut.jsx";

const Software = () => {

    const { appId } = useParams();
    const dispatch = useDispatch();
    const {app_id, app_name, app_description} = useSelector(state => state.app.actualApp.data);
    const {shortcuts} = useSelector(state => state.app.actualApp.chapters[0]);

    const fetchApp = async () => {
        return await dispatch(selectApp(appId))
    }

    useEffect(() => {
        fetchApp()
    }, [appId])

    const logoPath = "/images/app/logo";
    const interfacePath = "/images/app/interface";

    return(
        <div className="software-page-container">
            <div className="software-head">
                <img src={`${logoPath}/${app_id}.png`} alt="logo"/>
                <NavButton name="All Shortcuts" link="/software" color="#2563EB" />
            </div>
            <div className="software-hero-banner">
                <div className="software-hero-banner-content software-hero-banner-left">
                    <div>
                        <h1>{app_name}</h1>
                        <p>{app_description}</p>
                    </div>
                    <div className="software-hero-banner-bottom">
                        <NavButton name="Course" link="/software" color="#33D3C1" />
                        <NavButton name="Knowledge Test" link="/software" color="#33D3C1" />
                    </div>
                </div>
                <div className="software-hero-banner-content software-hero-banner-right">
                    <img src={`${interfacePath}/${app_id}.png`} alt="vs code"/>
                </div>
            </div>
            <div className="shortcuts-list">
                <h1>Keyboard Shortcuts</h1>
                {
                    shortcuts.map((shortcut, idx) => {
                        return(
                            <Shortcut key={idx} data={shortcut}/>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Software;