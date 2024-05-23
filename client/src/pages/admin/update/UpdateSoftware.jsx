import Select from "../../../components/inputs/Select.jsx";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {allApps, createShortcut, getAllKeys, getImage} from "../../../requests/app.js";
import Input from "../../../components/inputs/Input.jsx";
import Button from "../../../components/Button.jsx";
import {ThemeContext} from "../../../context/ThemeContext.jsx";
import SubmitButton from "../../../components/inputs/SubmitButton.jsx";
import {getApp} from "../../../redux/app/action.js";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, appShortcutsSelector} from "../../../redux/app/selector.js";
import Table from "../../../components/Table.jsx";
import {toast} from "sonner";

export const chapters = [
    {
        id: 1,
        name: "Essential"
    },
    {
        id: 2,
        name: "Intermediate"
    },
    {
        id: 3,
        name: "Advanced"
    },
    {
        id: 4,
        name: "Professional"
    },
    {
        id: 5,
        name: "Expert"
    }
]

const UpdateSoftware = () => {

    const {theme, colors} = useContext(ThemeContext)

    const dispatch = useDispatch();

    const formRef = useRef(null);

    const [initialAllKeys, setInitialAllKeys] = useState([]);
    const [allKeys, setAllKeys] = useState([]);
    const [allSoftware, setAllSoftware] = useState([]);
    const [selectedKey, setSelectedKey] = useState([]);
    const allShortcuts = useSelector(appShortcutsSelector())
    const {app_id} = useSelector(appSelector)

    useEffect(() => {
        getAllKeys().then(response => {
            if (response.success) {
                const keys = response.result.map(res => ({
                    id: parseInt(res.key_id),
                    name: res.key_win
                }));
                setInitialAllKeys(keys);
                setAllKeys(keys);
            }
        })
        allApps().then(response => {
            if (response.success) {
                setAllSoftware(response.result);
            }
        })
    }, [])

    const formatApps = useMemo(() => {
        return allSoftware.flatMap(categorie => {
            return categorie.apps.map(app => {
                return {
                    id: app.app_id,
                    name: app.app_name
                }
            })
        })
    }, [allSoftware])

    const change = (e) => {
        if(parseInt(e.target.value) === 0) return;
        setSelectedKey(prevState => [...prevState, parseInt(e.target.value)])
        setAllKeys(allKeys.filter(key => key.id !== parseInt(e.target.value)));
    }

    const suppr = (e) => {
        e.preventDefault();
        setAllKeys(initialAllKeys)
        setSelectedKey([])
    }

    const translateKey = useMemo(() => {
        return selectedKey.map(key =>
            initialAllKeys.find(k => k.id === key).name
        )
    }, [selectedKey])

    const changeApp = (e) => {
        if(parseInt(e.target.value) === 0) return;
        const fetchData = async () => {
            await dispatch(getApp(parseInt(e.target.value)));
        }
        fetchData();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        //const actualApp = formatApps.filter(app => app.id === parseInt(formData.get("software")))
        const softwareData = {
            name: formData.get("name"),
            description: formData.get("description"),
            chapter_id: formData.get("chapter"),
            app_id: app_id,
            keys: selectedKey,
        }
        createShortcut(softwareData).then(response => {
            if (response.success) {
                toast.success("The form has been sent successfully");
                handleReset(e)
                const fetchData = async () => {
                    await dispatch(getApp(app_id));
                }
                fetchData();
            }
        })
    }

    const handleReset = (e) => {
        e.preventDefault();
        if (formRef.current) {
            formRef.current.reset();
            setAllKeys(initialAllKeys);
            setSelectedKey([]);
        }
    };



    return(
        <div className="admin-page update-software-container">
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <Select change={(e) => changeApp(e)} name="software" options={formatApps} />
                <Input name="name" type="text" />
                <Select name="chapter" options={chapters} />
                <textarea name="description" style={{marginTop: "20px"}}></textarea>
                <Select name="Key" options={allKeys} change={(e) => change(e)}/>
                <div className="show-key-container">
                    <Input name="Selected Keys" type="text" value={translateKey}/>
                    <Button name="suppr" onClick={(e) => suppr(e)} color={colors[theme].error} />
                </div>
                <SubmitButton name="Submit" />
            </form>
            <Table data={allShortcuts} />
        </div>
    )
}

export default UpdateSoftware;