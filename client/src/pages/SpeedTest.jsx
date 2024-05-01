import Button from "../components/Button.jsx";
import {useEffect, useState} from "react";

const text = [
    "The",
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
    const [actualText, setActualText] = useState(text);
    const [actualLine, setActualLine] = useState(0);
    const [actualLetter, setActualLetter] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [mistake, setMistake] = useState(0);
    const [position, setPosition] = useState(-50);


    const startTest = () => {
        setStart(!start);
    }

    const validate = () => {
        setPosition(position-50);
        setActualLine(actualLine+1);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const keyPressed = event.key;
            if (other.includes(keyPressed)) return;
            if (actualText[actualLine][actualLetter] === keyPressed) {
                setWrong(false)
                setActualLetter(actualLetter + 1);
                if (actualLetter === actualText[actualLine].length - 1) {
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
        let res = 0;
        switch (idx){
            case actualLine-1:
                res=0.15;
                break;
            case actualLine:
                res=1;
                break;
            case actualLine+1:
                res=0.25;
                break;
            case actualLine+2:
                res=0.10;
                break;
            default:
                res=0;
        }
        return res;
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
                <div className="speed-text-container" style={{top: position+"px"}}>
                    {
                        actualText.map((line, idx) => {
                            return(
                                <>
                                    {idx !== actualLine ?
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