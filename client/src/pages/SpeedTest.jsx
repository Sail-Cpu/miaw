import Button from "../components/Button.jsx";
import {useEffect, useState} from "react";
import { CircularProgress } from '@chakra-ui/react'

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
    "CapsLock",
    "Tab",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    'ArrowDown'
]

const StatBlock = (props) => {

    const {name, color, number} = props;

    return(
        <div className="stat-block" style={{borderColor: color}}>
            <h1>{number}</h1>
            <span>{name}</span>
            <div className="stat-block-back" style={{backgroundColor: color}}></div>
        </div>
    )
}

const EndModal = () => {
    return(
        <div className="end-modal">
            <div className="end-modal-content">
                <div className="end-modal-left">
                    <CircularProgress value={40} color='#14B8A6' size={200} thickness='6px' />
                    <div className="circular-progress-content">
                        <h1>40%</h1>
                        <span>Completed</span>
                    </div>
                </div>
                <div className="end-modal-right">
                    <StatBlock number={2} color="#EF4444" name="Error"/>
                    <StatBlock number={15} color="#2563EB" name="per/min"/>
                </div>
            </div>
            <div className="end-modal-bottom">
                <Button name="Retry" onClick={() => console.log("retry")} color="#2563EB" />
            </div>
        </div>
    )
}

const SpeedTest = () => {

    const [start, setStart] = useState(false);
    const [actualLine, setActualLine] = useState(0);
    const [actualLetter, setActualLetter] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [mistake, setMistake] = useState(0);
    const [position, setPosition] = useState(-50);
    const [timeLeft, setTimeLeft] = useState(30);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            e.preventDefault();
            const keyPressed = e.key;
            if (other.includes(keyPressed)) return;
            if (!start) return;
            if (text[actualLine][actualLetter] === keyPressed) {
                setWrong(false)
                setActualLetter(actualLetter + 1);
                if (actualLetter === text[actualLine].length - 1) {
                    setActualLetter(0);
                    validate();
                }
            }else{
                if(wrong)return;
                setWrong(true);
                setMistake(mistake+1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [text, actualLetter, mistake, start]);

    const validate = () => {
        setPosition(position-50);
        setActualLine(actualLine+1);
    };

    useEffect(() => {
        if (start) {
            const id = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(id);
                        setStart(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
    }, [start]);

    const setOpacity = (idx) => {
        return  idx === actualLine - 1 ? 0.15 :
                idx === actualLine ? 1 :
                idx === actualLine + 1 ? 0.25 :
                    idx === actualLine + 2 ? 0.10 : 0;
    };

    return(
        <div className="speed-test-page-container">
            <h1>{timeLeft}</h1>
            {
                !start ?
                    <Button name={"Start"} onClick={() => setStart(true)} color={"#2563EB"} />
                    :
                    <Button name={"Stop"} onClick={() => setStart(false)} color={"#DC2626"} />
            }
            <div className="speed-line">
                <div className="speed-text-container" style={{top: position+"px"}}>
                    {
                        text.map((line, idx) => {
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
            <div className="end-modal-container">
                <EndModal />
            </div>
        </div>
    )
}

export default SpeedTest;