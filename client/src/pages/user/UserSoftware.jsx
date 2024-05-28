import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, appShortcutsSelector} from "../../redux/app/selector.js";
import Table from "../../components/Table";
import {getApp} from "../../redux/app/action.js";
import {currentUserSelector} from "../../redux/auth/selector.js";
import {getImage} from "../../requests/app.js";


const UserSoftware = () => {

    const {appId} = useParams();
    const dispatch = useDispatch();

    const { app_id } = useSelector(appSelector);
    const {app_name} = useSelector(appSelector);
    const shortcuts = useSelector(appShortcutsSelector());
    const { shortcuts: userShortcuts } = useSelector(currentUserSelector);

    const [logoPathName, setLogoPathName] = useState("")

    useEffect(() => {
        const fetchImage = async () => {
            let response = await getImage("logo", app_name);
            if(response.success){
                setLogoPathName(response.result);
            }
        }
        fetchImage();
    }, [app_name]);

    const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/uploads`;

    useEffect(() => {
        if(app_id !== appId){
            const fetchData = async () => {
                await dispatch(getApp(appId));
            }
            fetchData();
        }
    }, [dispatch, appId])

    const visibleShortcuts = useMemo(() => {
        let res = [];
        for(let i = 0; i < shortcuts.length; i++){
            for(let j = 0; j < userShortcuts.length; j++){
                if(shortcuts[i].shortcut_id === userShortcuts[j].shortcut_id){
                    res.push(shortcuts[i]);
                }
            }
        }
        return res;
    }, [app_id])

    return(
        <div className="course-page-container">
            {visibleShortcuts.length > 0 ?
                <>
                    <div className="user-course-page-header">
                        <img src={`${BASE_URL}/logo_${logoPathName}`} />
                        <h1>{app_name}</h1>
                    </div>
                    <Table data={visibleShortcuts} />
                </>
                : <> Application introuvable </>
            }
        </div>
    )
}

export default UserSoftware;