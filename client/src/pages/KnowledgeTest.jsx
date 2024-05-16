import {useSelector} from "react-redux";
import {appShortcutsSelector} from "../redux/app/selector.js";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import Input from "../components/inputs/Input.jsx";
import Button from "../components/Button.jsx";
import {StatBlock} from "./keyboard/SpeedTest.jsx";

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
]

const KnowledgeTest = () => {

    const allShorcuts = useSelector(appShortcutsSelector());
    const [actualShortcuts, setActualShortcuts] = useState(0);
    const [number, setNumber] = useState(20)
    const [pressed, setPressed] = useState([]);
    const [position, setPosition] = useState(0);
    const [stat, setStat] = useState({error: 0, success: 0});
    const [wrong, setWrong] = useState(false)
    const [start, setStart] = useState(false)
    const [timeLeft, setTimeLeft] = useState(5)
    const [intervalId, setIntervalId] = useState(null);


    const pickRandomShortcuts = useMemo(() =>{
        if(number > allShorcuts.length-10) return;
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
            console.log(keyPressed);
            for(let i = 0; i < convertKey.length; i++){
                if(convertKey[i].toConvert.toLowerCase() === keyPressed.toLowerCase()){
                    keyPressed = convertKey[i].converted;
                }
            }
            if(start && !pressed.includes(keyPressed)){
                setPressed([...pressed, keyPressed]);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [pressed, start])

    useEffect(() => {
        if(start){
            const id = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        end();
                        return 5;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
    }, [start])

    const formatPress = useMemo(() => {
        let res = "";
        pressed.forEach(press => {
            res += press + " + "
        })
        return res.substring(0, res.length-3);
    }, [pressed])

    const checkIfExact = () => {
        let exist = true;
        const shorcuts = pickRandomShortcuts[actualShortcuts].shortcut_keys;
        if(shorcuts.length !== pressed.length) return false;
        for (let i=0; i < pressed.length; i++){
            let j = 0
            let end = false;
            while(j <= shorcuts.length +1 && end===false){
                if(pressed[i].toLowerCase() === shorcuts[j].toLowerCase()){
                    end=true;
                }else if (j > shorcuts.length){
                    exist = false;
                }
                j++;
            }
        }
        return exist;
    }

    const end = () => {
        setPosition(prevPosition => prevPosition - 110);
        setActualShortcuts(prevActualShortcuts => prevActualShortcuts + 1);
        setPressed([]);
        setStat(prevStat => ({...prevStat, error: prevStat.error + 1}));
    }

    const validate = () => {
        console.log(pressed, pickRandomShortcuts[actualShortcuts].shortcut_keys)
        if(checkIfExact()){
            setPosition(prevPosition => prevPosition - 110);
            setStat(prevStat => ({...prevStat, success: prevStat.success+1}));
            setActualShortcuts(prevActualShortcuts => prevActualShortcuts + 1);
            setPressed([]);
            setWrong(false);
            setTimeLeft(5);
            return;
        }
        setWrong(true);

    }

    return(
        <div className="knowledge-test-container">
            <div className="knowledge-test-left">
                <div className="knowledge-test-start-container">
                    {
                        !start ?
                            <Button
                                name={"Start"}
                                onClick={() => setStart(true)}
                                color={"#2563EB"} />
                            :
                            <Button
                                name={"Stop"}
                                onClick={() => setStart(false)}
                                color={"#DC2626"} />
                    }
                </div>
                <CustomizedTimeline
                    actualShortcuts={actualShortcuts}
                    shortcuts={pickRandomShortcuts}
                    position={position}
                />
            </div>
            <div className="knowledge-test-right">
                <h1>{timeLeft}</h1>
                <div className="keyboard-input-container">
                    <Input name="Keyboard Keys" type="text" value={formatPress} wrong={wrong}/>
                    <Button name="Click"
                            onClick={() => !pressed.includes("click") && setPressed([...pressed, "click"])}
                            color="#2563EB" />
                </div>
                <div className="knowledge-test-right-bottom">
                    <Button name="suppr"
                            onClick={() => {
                                setPressed([])
                                setWrong(false)
                            }}
                            color="#EF4444" />
                    <Button name="Validate"
                            onClick={() => validate()}
                            color="#14B8A6" />
                </div>
                <div className="knowledge-test-right-stat">
                    <StatBlock name="error" color="#EF4444" number={stat.error} />
                    <StatBlock name="Success" color="#2563EB" number={stat.success} />
                </div>
            </div>
        </div>
    )
}

export default KnowledgeTest;