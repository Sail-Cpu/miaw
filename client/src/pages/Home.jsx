import {useContext, useEffect, useMemo, useState} from "react";
import {ThemeContext} from "../context/ThemeContext.jsx";
import Icon from "../components/Icon.jsx";
import allIcons from "../utils/allIcons.js";
import {useDispatch, useSelector} from "react-redux";
import {allAppsNoCatSelector} from "../redux/app/selector.js";
import PropTypes from "prop-types";
import {currentUserSelector} from "../redux/auth/selector.js";
import {addAppToCollection} from "../redux/auth/action.js";
import Button from "../components/Button.jsx";
import {getImage} from "../requests/app.js";
import {useNavigate} from "react-router-dom";

const AppCard = ({app}) => {

    const {theme, colors} = useContext(ThemeContext);
    const [logoPathName, setLogoPathName] = useState(null);

    const navigate = useNavigate();

    const BASE_URL = "http://localhost:3000/uploads";

    useEffect(() => {
        const fetchImage = async () => {
            let response = await getImage("logo", app.app_name);
            if(response.success){
                setLogoPathName(`${BASE_URL}/logo_${response.result}`);
            }
        }
        fetchImage();
    }, [app]);

        return(
            <div className="app-card-container" style={{backgroundColor: colors[theme].background}}>
                <div className="app-card-header">
                    <h1>{app.app_name}</h1>
                </div>
                <div className="app-card-footer">
                    <div className="app-card-footer-left">
                        <img src={logoPathName} alt="logo" />
                        <span>{app.app_name}</span>
                    </div>
                    <div className="app-card-footer-right">
                        <Button name="View" onClick={() => navigate(`/software/${app.app_id}`)} color={colors[theme].primary} />
                    </div>
                </div>
            </div>
        )

}

AppCard.propTypes = {
    app: PropTypes.object.isRequired
}

const AppTab = ({app}) => {

    const {theme, colors} = useContext(ThemeContext);
    const dispatch = useDispatch();
    const {user_id, apps} = useSelector(currentUserSelector);

    const selectApp = (app) => {
        dispatch(addAppToCollection({
            userId: user_id,
            appId: app.app_id,
            add: true
        }));
    }

    const removeApp = (app) => {
        dispatch(addAppToCollection({
            userId: user_id,
            appId: app.app_id,
            add: false
        }));
    }

    const isAppInUserApps = useMemo(() => apps.some(userApp => userApp.app_id === app.app_id), [apps]);

    return(
        <>
            {isAppInUserApps ?
                <div className="app-tab"
                     onClick={() => removeApp(app)}
                     style={{backgroundColor: colors[theme].tabHover}}>
                    <Icon path={allIcons.less} color={colors[theme].text} width="20px"/>
                    <span>{app.app_name}</span>
                </div>
                :
                <div className="app-tab" onClick={() => selectApp(app)}>
                    <Icon path={allIcons.more} color={colors[theme].text} width="20px"/>
                    <span>{app.app_name}</span>
                </div>
            }
        </>
    )
}

AppTab.propTypes = {
    app: PropTypes.object.isRequired
};

const Modal = ({close}) => {

    const {theme, colors} = useContext(ThemeContext);

    const  allApps = useSelector(allAppsNoCatSelector);

    return(
        <div className="app-modal-container">
            <div className="modal-content">
                <div className="modal-header">
                    <div onClick={close}>
                        <Icon path={allIcons.close} color={colors[theme].text} width="30px"/>
                    </div>
                </div>
                <div className="modal-content-all-app">
                    {
                        allApps.map((app, idx) => {
                            return(
                                <AppTab key={idx} app={app}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    close: PropTypes.func.isRequired
};

const Home = () => {

    const {theme, colors} = useContext(ThemeContext);

    const [showModal, setShowModal] = useState(false);

    const {apps} = useSelector(currentUserSelector);

    return(
        <div className="home-container">
            <div className="home-content">
                <div className="add-to-fav-container" onClick={() => setShowModal(true)}>
                    <Icon path={allIcons.more}  color={colors[theme].primary} width="70px"/>
                </div>
                {
                    apps.map((app, idx) => {
                        return(
                            <AppCard key={idx} app={app}/>
                        )
                    })
                }
                {showModal && <Modal close={() => setShowModal(false)}/>}
            </div>
        </div>
    )
}

export default Home;