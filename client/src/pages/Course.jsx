import ButtonGroup from "../components/navigations/ButtonGroup";
import Table from "../components/Table";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getApp} from "../redux/app/action.js";
import {appSelector, appShortcutsByChapterSelector} from "../redux/app/selector.js";

export const labels = [
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

const Course = () => {

    const [chapter, setChapter] = useState(1);

    const { shortcuts } = useSelector(appShortcutsByChapterSelector(chapter));

    return(
        <div className="course-page-container">
            <ButtonGroup labels={labels} setSelected={setChapter} selected={chapter}/>
            <Table data={shortcuts}/>
        </div>
    )
}

export default Course;