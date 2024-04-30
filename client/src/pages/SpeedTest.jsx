import Button from "../components/Button.jsx";
import {useEffect, useState} from "react";

const text = [
    "It's a little bit funny",
    "This feelin' inside",
    "I'm not one of those who can easily hide",
    "I don't have much money, but boy if I did",
    "I'd buy a big house where we both could live",
    "If I was a sculptor, heh",
    "But then again, no",
    "Or a man who makes potions in a travelin' show, oh",
    "I know it's not much, but it's the best I can do",
    "My gift is my song and this one's for you"
]

const other = [
    "Shift",
    "Control",
    "AltGraph",
    "Alt",
    "CapsLock"
]

const SpeedTest = () => {

    const [start, setStart] = useState(false);
    const [lastLine, setLastLine] = useState(4)
    const [actualText, setActualText] = useState(text.slice(0, lastLine));
    const [actualLetter, setActualLetter] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [mistake, setMistake] = useState(0);


    const startTest = () => {
        setStart(!start);
    }

    const validate = () => {
        setLastLine(lastLine+1);
        setActualText(prevActualText =>
             [...prevActualText.slice(1), text[lastLine]]
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const keyPressed = event.key;
            if (other.includes(keyPressed)) return;
            if (actualText[0][actualLetter] === keyPressed) {
                setWrong(false)
                setActualLetter(actualLetter + 1);
                if (actualLetter === actualText[0].length - 1) {
                    setActualLetter(0);
                    validate();
                }
            }else{
                setWrong(true);
                setMistake(mistake+1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [actualText, actualLetter, mistake]);

    const setOpacity = (idx) => {
        const opacityMap = {
            0: 1,
            1: 0.25,
            2: 0.1,
        };
        return opacityMap[idx] || 0;
    };

    return(
        <div className="speed-test-page-container">
            <h1>00:00</h1>
            {
                !start ?
                    <Button name={"Start"} onClick={() => startTest()} color={"#2563EB"} />
                    :
                    <Button name={"Stop"} onClick={() => startTest()} color={"#DC2626"} />
            }
            <div className="speed-line">
                <div className="speed-text-container">
                    {
                        actualText.map((line, idx) => {
                            return(
                                <>
                                    {idx !== 0 ?
                                        <div key={idx} className="speed-text-line"
                                             style={{opacity: setOpacity(idx)}}>
                                            <span>{line}</span>
                                        </div>
                                        :
                                        <div key={idx} className="speed-text-line"
                                             style={{opacity: setOpacity(idx)}}>
                                            <span>
                                                <span style={{color: "blue"}}>
                                                    {line.slice(0, actualLetter)}
                                                </span>
                                                <span style={{color: wrong ? "red" : ""}}>
                                                    {line[actualLetter]}
                                                </span>
                                                {line.slice(actualLetter+1, line.length)}</span>
                                        </div>
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="error-block">
                <span>{mistake}</span>
            </div>
        </div>
    )
}

export default SpeedTest;