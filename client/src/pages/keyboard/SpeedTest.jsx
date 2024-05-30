import Button from "../../components/Button.jsx";
import {useContext, useEffect, useReducer, useState} from "react";
import { CircularProgress } from '@chakra-ui/react'
import PropTypes from "prop-types";
import {ThemeContext} from "../../context/ThemeContext.jsx";

/*const text = [
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
]*/

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

export const StatBlock = (props) => {

    const {name, color, number} = props;

    return(
        <div className="stat-block" style={{borderColor: color}}>
            <h3>{number}</h3>
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

export const EndModal = (props) => {

    const {percentage, error, label1, label2, success, reset} = props;

    return(
        <div className="end-modal">
            <div className="end-modal-content">
                <div className="end-modal-left">
                    <CircularProgress value={percentage} color='#14B8A6' size={200} thickness='6px' />
                    <div className="circular-progress-content">
                        <h1>{percentage.toFixed(0)}%</h1>
                        <span>Completed</span>
                    </div>
                </div>
                <div className="end-modal-right">
                    <StatBlock number={error.toFixed(0)} color="#EF4444" name={label1}/>
                    <StatBlock number={success.toFixed(1)} color="#2563EB" name={label2} />
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
    label1: PropTypes.string.isRequired,
    label2: PropTypes.string.isRequired,
    success: PropTypes.number.isRequired,
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

const originalTime = 30;

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

    const [text, setText] = useState([]);
    const {theme, colors} = useContext(ThemeContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    const [timeLeft, setTimeLeft] = useState(originalTime);
    const [intervalId, setIntervalId] = useState(null);

    const reset = () => {
        setTimeLeft(30);
        setIntervalId(null)
        getData();
        dispatch({type: actionTypes.RESET});
    }

    const getData = async () => {
        fetch(`${import.meta.env.VITE_APP_API_URL}/speed-line`, {
            headers: {
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        }).
        then(res => res.json())
            .then(data => {
                let allLine = [];
                data.result.forEach(line => {
                    allLine.push(line.line);
                })
                setText(allLine);
            });
    }

    useEffect(() => {
        getData();
    }, []);



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
                    if (state.textStep.actualLine === text.length-1){
                        dispatch({type: actionTypes.SET_END})
                    }
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
        console.log(timeLeft)
        if(userNumber < textLetters){
            return{
                percentage: Math.floor((userNumber * 100) / textLetters),
                persec: (userNumber / originalTime)
            }
        }
        const lastTime = originalTime - timeLeft;
        return{
            percentage: 100,
            persec: (userNumber / lastTime)
        }
    }

    return(
        <div className="speed-test-page-container">
            <h1>{timeLeft}</h1>
            {
                !state.start ?
                    <Button
                        name={"Start"}
                        onClick={() => dispatch({type: actionTypes.CHANGE_START, payload: true})}
                        color={colors[theme].primary} />
                    :
                    <Button
                        name={"Stop"}
                        onClick={() => dispatch({type: actionTypes.CHANGE_START, payload: false})}
                        color={colors[theme].error} />
            }
            <div className="speed-line">
                <div className="speed-text-container" style={{top: state.position+"px"}}>
                    {text &&
                        text.map((line, idx) => {
                            return(
                                <div key={idx}>
                                    {idx !== state.textStep.actualLine ?
                                        <div key={idx} className="speed-text-line"
                                             style={{opacity: setOpacity(idx)}}>
                                            <span>{line}</span>
                                        </div>
                                        :
                                        <div key={idx} className="speed-text-line"
                                             style={{opacity: setOpacity(idx)}}>
                                            <span>
                                                <span style={{color: colors[theme].primary}}>
                                                    {line.slice(0, state.textStep.actualLetter)}
                                                </span>
                                                <span style={{color: state.error.wrong ? colors[theme].error : ""}}>
                                                    {line[state.textStep.actualLetter]}
                                                </span>
                                                {line.slice(state.textStep.actualLetter+1, line.length)}</span>
                                        </div>
                                    }
                                </div>
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
                            label1="Errors"
                            success={getStats().persec}
                            label2="per/sec"
                            reset={() => reset()}
                            />
                    </div>
            }
        </div>
    )
}

export default SpeedTest;