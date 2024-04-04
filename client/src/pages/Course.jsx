import ButtonGroup from "../components/navigations/ButtonGroup";
import Table from "../components/Table";
const Course = () => {

    const labels = [
        "Essential",
        "Intermediate",
        "Advanced",
        "Professional",
        "Expert"
    ]

    return(
        <div className="course-page-container">
            <ButtonGroup labels={labels}/>
            <Table />
        </div>
    )
}

export default Course;