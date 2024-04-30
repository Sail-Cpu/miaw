import Button from "../components/Button.jsx";

const SpeedTest = () => {

    const startTest = () => {
        console.log("test");
    }

    return(
        <div className="speed-test-page-container">
            <h1>00:00</h1>
            <Button name={"Start"} onClick={() => startTest()} color={"#2563EB"} />
            <div className="speed-line"></div>
            <div className="error-block">
                <span>0</span>
            </div>
        </div>
    )
}

export default SpeedTest;