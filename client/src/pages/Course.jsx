import ButtonGroup from "../components/navigations/ButtonGroup";
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
        </div>
    )
}

export default Course;