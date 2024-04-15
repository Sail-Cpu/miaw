import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, appShortcutsSelector} from "../../redux/app/selector.js";
import Table from "../../components/Table";
import {getApp} from "../../redux/app/action.js";
import {currentUserSelector} from "../../redux/auth/selector.js";


const UserSoftware = () => {

    const {appId} = useParams();
    const dispatch = useDispatch();

    const { app_id } = useSelector(appSelector);
    const {app_name} = useSelector(appSelector);
    const shortcuts = useSelector(appShortcutsSelector());
    const { shortcuts: userShortcuts } = useSelector(currentUserSelector);

    useEffect(() => {
        if(app_id !== appId){
            const fetchData = async () => {
                await dispatch(getApp(appId));
            }
            fetchData();
        }
    }, [dispatch, appId])

    const visibleShortcuts = () => {
        let res = [];
        for(let i = 0; i < shortcuts.length; i++){
            for(let j = 0; j < userShortcuts.length; j++){
                if(shortcuts[i].shortcut_id === userShortcuts[j].shortcut_id){
                    res.push(shortcuts[i]);
                }
            }
        }
        return res;
    }

    const logoPath = "/images/app/logo";

    return(
        <div className="course-page-container">
            <div className="user-course-page-header">
                <img src={`${logoPath}/${app_id}.png`} />
                <h1>{app_name}</h1>
            </div>
            <Table data={visibleShortcuts()} />
        </div>
    )
}

export default UserSoftware;