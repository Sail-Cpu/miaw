import {useSelector} from "react-redux";
import {appShortcutsSelector} from "../redux/app/selector.js";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {useContext, useEffect, useMemo, useReducer, useState} from "react";
import PropTypes from "prop-types";
import Input from "../components/inputs/Input.jsx";
import Button from "../components/Button.jsx";
import {StatBlock, EndModal} from "./keyboard/SpeedTest.jsx";
import {ThemeContext} from "../context/ThemeContext.jsx";

const CustomizedTimeline = (props) => {

    const {shortcuts, actualShortcuts, position} = props;

    const setOpacity = (idx) => {
        return  idx === actualShortcuts ? 1 :
            idx > actualShortcuts && idx < actualShortcuts + 5 ? 0.3 : 0
    };

    return (
        <Timeline position="right">
            {
                shortcuts.map((shortcut, idx) => {
                    return(
                        <TimelineItem
                            key={idx}
                            sx={{opacity: setOpacity(idx), top: position+"px"}}>
                            <div className="timeline-left">
                                {idx+1}
                            </div>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '20px', px: 2 }}>
                                <Typography variant="h6" component="span" color="#1F2937" fontWeight="700">
                                    {shortcut.shortcut_name}
                                </Typography>
                                <Typography color="#6B7280">
                                    {shortcut.shortcut_desc}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        )
                })
            }
        </Timeline>
    );
}

CustomizedTimeline.propTypes = {
    shortcuts: PropTypes.array.isRequired,
    actualShortcuts: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired
}

const convertKey = [
    {
        toConvert: "Control",
        converted: "ctrl"
    },
    {
        toConvert: "Home",
        converted: "home / end"
    },
    {
        toConvert: "End",
        converted: "home / end"
    },
    {
        toConvert: "ArrowLeft",
        converted: "left / right"
    },
    {
        toConvert: "ArrowRight",
        converted: "left / right"
    },
    {
        toConvert: "ArrowUp",
        converted: "up / down"
    },
    {
        toConvert: "ArrowDown",
        converted: "up / down"
    },
    {
        toConvert: "Escape",
        converted: "esc"
    },
    {
        toConvert: " ",
        converted: "space"
    },
]

const initialState = {
    actualShortcuts: 0,
    pressed: [],
    position: 0,
    stat: {error: 0, success: 0},
    wrong: false,
    start: false,
    finished: false
}

const actionTypes = {
    START: "Start",
    STOP: "Stop",
    RESET: "Reset",
    PRESS: "Press",
    WRONG: "Wrong",
    SUPPR: "Suppr",
    TIME_ELAPSED: "Time_Elapsed",
    VALIDATE: "Validate",
    FINISHED: "Finished"
}

const number = 20;

const reducer = (state, action) => {
    switch (action.type){
        case actionTypes.START:
            return {...state, start: true}
        case actionTypes.STOP:
            return {...state, start: false}
        case actionTypes.PRESS:
            return {...state, pressed: [...state.pressed, action.payload]}
        case actionTypes.WRONG:
            return {...state, wrong: true}
        case actionTypes.SUPPR:
            return {...state, pressed: []}
        case actionTypes.VALIDATE:
            if(state.actualShortcuts === number-1){
                return {
                    ...state,
                    position: state.position - 110,
                    stat: {...state.stat, success: state.stat.success + 1},
                    actualShortcuts: state.actualShortcuts + 1,
                    pressed: [],
                    wrong: false,
                    start: false,
                    finished: true
                }

            }else{
                return {
                    ...state,
                    position: state.position - 110,
                    stat: {...state.stat, success: state.stat.success + 1},
                    actualShortcuts: state.actualShortcuts + 1,
                    pressed: [],
                    wrong: false
                }
            }
        case actionTypes.TIME_ELAPSED:
            console.log(state.actualShortcuts, number)
            if(state.actualShortcuts === number-1){
                return {
                    ...state,
                    position: state.position - 110,
                    actualShortcuts: state.actualShortcuts + 1,
                    pressed: [],
                    stat: {...state.stat, error: state.stat.error + 1},
                    start: false,
                    finished: true
                }
            }else{
                return {
                    ...state,
                    position: state.position - 110,
                    actualShortcuts: state.actualShortcuts + 1,
                    pressed: [],
                    stat: {...state.stat, error: state.stat.error + 1}
                }
            }
        case actionTypes.FINISHED:
            return {
                ...state,
                start: false,
                finished: true
            }
        case actionTypes.RESET:
            return initialState;
        default:
            return state;
    }
}

const KnowledgeTest = () => {

    const {colors, theme} = useContext(ThemeContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    const allShorcuts = useSelector(appShortcutsSelector())

    const [timeLeft, setTimeLeft] = useState(5)
    const [intervalId, setIntervalId] = useState(null);

    const reset = () => {
        setTimeLeft(5);
        setIntervalId(null)
        dispatch({type: actionTypes.RESET});
    }


    const pickRandomShortcuts = useMemo(() =>{
        if(number > allShorcuts.length-5) return [];
        const res = [];
        for(let i = 0; i < number; i++){
            let end = false;
            while(!end){
                const random = Math.floor(Math.random() * (allShorcuts.length))
                if(!res.includes(allShorcuts[random])){
                    res.push(allShorcuts[random])
                    end=true;
                }
            }
        }
        return res;
    }, [])

    useEffect(() => {

        const handleKeyDown = (e) => {
            e.preventDefault();
            let keyPressed = e.key;

            for(let i = 0; i < convertKey.length; i++){
                if(convertKey[i].toConvert.toLowerCase() === keyPressed.toLowerCase()){
                    keyPressed = convertKey[i].converted;
                }
            }
            if(state.start && !state.pressed.includes(keyPressed)){
                dispatch({type: actionTypes.PRESS, payload: keyPressed})
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [state.pressed, state.start])

    useEffect(() => {
        if(state.start){
            const id = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        dispatch({type: actionTypes.TIME_ELAPSED})
                        return 5;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
    }, [state.start])

    const formatPress = useMemo(() => {
        let res = "";
        state.pressed.forEach(press => {
            res += press + " + "
        })
        return res.substring(0, res.length-3);
    }, [state.pressed])

    const checkIfExact = () => {
        let exist = true;
        const shorcuts = pickRandomShortcuts[state.actualShortcuts].shortcuts_keys[0];
        if(shorcuts.length !== state.pressed.length) return false;
        for (let i=0; i < state.pressed.length; i++){
            let j = 0
            let end = false;
            while(j <= shorcuts.length +1 && end===false){
                if(state.pressed[i].toLowerCase() === shorcuts[j].toLowerCase()){
                    end=true;
                }else if (j > shorcuts.length){
                    exist = false;
                }
                j++;
            }
        }
        return exist;
    }

    const validate = () => {
        console.log(pickRandomShortcuts[state.actualShortcuts].shortcuts_keys[0])
        if(checkIfExact()){
            dispatch({type: actionTypes.VALIDATE})
            setTimeLeft(5);
            if(state.actualShortcuts === number){
                dispatch({type: actionTypes.FINISHED})
            }
            return;
        }
        dispatch({type: actionTypes.WRONG})

    }

    return(
        <div className="knowledge-test-container">
            <div className="knowledge-test-left">
                <div className="knowledge-test-start-container">
                    {
                        !state.start &&
                            <Button
                                name={"Start"}
                                onClick={() => dispatch({type: actionTypes.START})}
                                color={colors[theme].primary} />
                    }
                </div>
                <CustomizedTimeline
                    actualShortcuts={state.actualShortcuts}
                    shortcuts={pickRandomShortcuts}
                    position={state.position}
                />
            </div>
            <div className="knowledge-test-right">
                <h1>{timeLeft}</h1>
                <div className="keyboard-input-container">
                    <Input name="Keyboard Keys" type="text" value={formatPress} wrong={state.wrong}/>
                    <Button name="Click"
                            onClick={() => !state.pressed.includes("click") && dispatch({type: actionTypes.PRESS, payload: "click"})}
                            color="#2563EB" />
                </div>
                <div className="knowledge-test-right-bottom">
                    <Button name="suppr"
                            onClick={() => {
                                dispatch({type: actionTypes.SUPPR})
                            }}
                            color="#EF4444" />
                    <Button name="Validate"
                            onClick={() => validate()}
                            color="#14B8A6" />
                </div>
                <div className="knowledge-test-right-stat">
                    <StatBlock name="error" color="#EF4444" number={state.stat.error} />
                    <StatBlock name="Success" color="#2563EB" number={state.stat.success} />
                </div>
            </div>
            {
                state.finished &&
                <div className="end-modal-container">
                    <EndModal
                        percentage={100 * state.stat.success / number}
                        error={state.stat.error}
                        label1="Errors"
                        success={state.stat.success}
                        label2="Success"
                        reset={() => reset()}
                    />
                </div>
            }
        </div>
    )
}

export default KnowledgeTest;