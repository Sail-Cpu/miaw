import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, appShortcutsSelector} from "../../redux/app/selector.js";
import ButtonGroup from "../../components/navigations/ButtonGroup.jsx";
import Table from "../../components/Table";
import {labels} from "../Course.jsx";
import {getApp} from "../../redux/app/action.js";
import {currentUserSelector} from "../../redux/auth/selector.js";


const UserSoftware = () => {

    const [chapter, setChapter] = useState(1);

    const {appId} = useParams();
    const dispatch = useDispatch();

    const { app_id } = useSelector(appSelector);
    const { shortcuts } = useSelector(appShortcutsSelector(chapter));
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

    return(
        <div className="course-page-container">
            <ButtonGroup labels={labels} setSelected={setChapter} selected={chapter}/>
            <Table data={visibleShortcuts()} />
        </div>
    )
}

export default UserSoftware;