import ButtonGroup from "../components/navigations/ButtonGroup";
import Table from "../components/Table";
import {useState} from "react";
const Course = () => {

    const labels = [
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

    const [chapter, setChapter] = useState(1);

    return(
        <div className="course-page-container">
            <ButtonGroup labels={labels} setSelected={setChapter} selected={chapter}/>
            <Table step={chapter}/>
        </div>
    )
}

export default Course;