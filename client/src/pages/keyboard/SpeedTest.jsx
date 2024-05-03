import Button from "../../components/Button.jsx";
import {useEffect, useReducer, useState} from "react";
import { CircularProgress } from '@chakra-ui/react'
import PropTypes from "prop-types";

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
    "Backspace",
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

StatBlock.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
}

const EndModal = (props) => {

    const {percentage, error, persec, reset} = props;

    return(
        <div className="end-modal">
            <div className="end-modal-content">
                <div className="end-modal-left">
                    <CircularProgress value={percentage} color='#14B8A6' size={200} thickness='6px' />
                    <div className="circular-progress-content">
                        <h1>{percentage}%</h1>
                        <span>Completed</span>
                    </div>
                </div>
                <div className="end-modal-right">
                    <StatBlock number={error} color="#EF4444" name="Error"/>
                    <StatBlock number={persec} color="#2563EB" name="per/sec"/>
                </div>
            </div>
            <div className="end-modal-bottom">
                <Button name="Retry" onClick={reset} color="#2563EB" />
            </div>
        </div>
    )
}

EndModal.propTypes = {
    percentage: PropTypes.number.isRequired,
    error: PropTypes.number.isRequired,
    persec: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired
}

const initialState = {
    textStep: {
        actualLine: 0,
        actualLetter: 0,
    },
    error: {
        wrong: false,
        mistake: 0,
    },
    position: -50,
    timeLeft: 30,
    start: false,
    end: false
};

const actionTypes = {
    CHANGE_START: 'START',
    UPDATE_TEXT_STEP: 'UPDATE_TEXT_STEP',
    SET_WRONG: 'SET_WRONG',
    SET_TIME_LEFT: 'SET_TIME_LEFT',
    SET_END: 'SET_END',
    RESET: 'RESET'
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_START:
            return { ...state, start: action.payload };
        case actionTypes.UPDATE_TEXT_STEP:
            return {
                ...state,
                textStep: action.payload,
                position: action.position
            };
        case actionTypes.SET_WRONG:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.SET_TIME_LEFT:
            return{
                ...state,
                timeLeft: action.payload
            };
        case actionTypes.SET_END:
            return{
                ...state,
                end: true,
                start: false
            };
        case actionTypes.RESET:
            return initialState;
        default: return state;
    }
}

const SpeedTest = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [timeLeft, setTimeLeft] = useState(30);
    const [intervalId, setIntervalId] = useState(null);

    const reset = () => {
        setTimeLeft(30);
        setIntervalId(null)
        dispatch({type: actionTypes.RESET});
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            e.preventDefault();
            const keyPressed = e.key;
            if (other.includes(keyPressed)) return;
            if (!state.start) return;
            if (text[state.textStep.actualLine][state.textStep.actualLetter] === keyPressed) {
                dispatch({
                    type: actionTypes.SET_WRONG,
                    payload: {
                        wrong: false,
                        mistake: state.error.mistake
                    }
                })
                dispatch({type: actionTypes.UPDATE_TEXT_STEP, payload: {
                        actualLine: state.textStep.actualLine,
                        actualLetter: state.textStep.actualLetter+1
                }, position: state.position})
                if (state.textStep.actualLetter === text[state.textStep.actualLine].length - 1) {
                    dispatch({type: actionTypes.UPDATE_TEXT_STEP, payload: {
                            actualLine: state.textStep.actualLine+1,
                            actualLetter: 0
                        }, position: state.position-50})
                }
            }else{
                if(state.error.wrong) return;
                dispatch({
                    type: actionTypes.SET_WRONG,
                    payload: {
                        wrong: true,
                        mistake: state.error.mistake+1
                    }
                })
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [text, state.textStep, state.textStep,  state.error, state.start]);

    useEffect(() => {
        if (state.start) {
            const id = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(id);
                        dispatch({type: actionTypes.SET_END})
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
    }, [state.start]);

    const setOpacity = (idx) => {
        return  idx === state.textStep.actualLine - 1 ? 0.15 :
                idx === state.textStep.actualLine ? 1 :
                idx === state.textStep.actualLine + 1 ? 0.25 :
                    idx === state.textStep.actualLine + 2 ? 0.10 : 0;
    };

    const getStats = () => {
        let textLetters = 0;
        text.forEach(line => textLetters += line.length);
        let userNumber = 0;
        for (let i = 0; i < state.textStep.actualLine; i++){
            userNumber += text[i].length;
        }
        userNumber += state.textStep.actualLetter;
        userNumber += 1;
        return{
            percentage: Math.floor((userNumber * 100) / textLetters),
            persec: Math.floor((userNumber / 30))
        }
    }

    return(
        <div className="speed-test-page-container">
            <h1>{timeLeft}</h1>
            {
                !state.start ?
                    <Button name={"Start"} onClick={() => dispatch({type: actionTypes.CHANGE_START, payload: true})} color={"#2563EB"} />
                    :
                    <Button name={"Stop"} onClick={() => dispatch({type: actionTypes.CHANGE_START, payload: false})} color={"#DC2626"} />
            }
            <div className="speed-line">
                <div className="speed-text-container" style={{top: state.position+"px"}}>
                    {
                        text.map((line, idx) => {
                            return(
                                <>
                                    {idx !== state.textStep.actualLine ?
                                        <div key={idx} className="speed-text-line"
                                             style={{opacity: setOpacity(idx)}}>
                                            <span>{line}</span>
                                        </div>
                                        :
                                        <div key={idx} className="speed-text-line"
                                             style={{opacity: setOpacity(idx)}}>
                                            <span>
                                                <span style={{color: "blue"}}>
                                                    {line.slice(0, state.textStep.actualLetter)}
                                                </span>
                                                <span style={{color: state.error.wrong ? "red" : ""}}>
                                                    {line[state.textStep.actualLetter]}
                                                </span>
                                                {line.slice(state.textStep.actualLetter+1, line.length)}</span>
                                        </div>
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="error-block">
                <span>{state.error.mistake}</span>
            </div>
            {
                state.end &&
                    <div className="end-modal-container">
                        <EndModal
                            percentage={getStats().percentage}
                            error={state.error.mistake}
                            persec={getStats().persec}
                            reset={() => reset()}
                            />
                    </div>
            }
        </div>
    )
}

export default SpeedTest;