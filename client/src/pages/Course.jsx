import ButtonGroup from "../components/navigations/ButtonGroup";
import Table from "../components/Table";
import {useState} from "react";
import {useSelector} from "react-redux";
import {appShortcutsByChapterSelector} from "../redux/app/selector.js";

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