import SubmitButton from "../components/inputs/SubmitButton.jsx";

const SpeedTest = () => {

    const startTest = () => {
        console.log("test");
    }

    return(
        <div className="speed-test-page-container">
            <h1>00:00</h1>
            <SubmitButton name="start" onClick={() => startTest()}/>
        </div>
    )
}

export default SpeedTest;