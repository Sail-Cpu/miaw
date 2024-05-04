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



const CustomizedTimeline = (props) => {

    const {shortcuts, actualShortcuts} = props;

    return (
        <Timeline position="right">
            {
                shortcuts.map((shortcut, idx) => {
                    return(
                        <TimelineItem>
                            <div className="timeline-left">
                                {actualShortcuts+1+idx}
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
    actualShortcuts: PropTypes.number.isRequired
}

const KnowledgeTest = () => {

    const allShorcuts = useSelector(appShortcutsSelector());
    const [actualShortcuts, setActualShortcuts] = useState(0);
    const [number, setNumber] = useState(20)
    const [pressed, setPressed] = useState([]);

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
            const keyPressed = e.key;
            if(!pressed.includes(keyPressed)){
                setPressed([...pressed, keyPressed]);
            }
        }

        const handleKeyUp = (e) => {
            e.preventDefault();
            const keyPressed = e.key;
            if(pressed.includes(keyPressed)){
                setPressed(pressed.filter(press => press !== keyPressed));
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressed])

    const formatPress = () => {
        let res = "";
        pressed.forEach(press => {
            res += press + " + "
        })
        return res.substring(0, res.length-3);
    }

    return(
        <div className="knowledge-test-container">
            <div className="knowledge-test-left">
                <CustomizedTimeline actualShortcuts={actualShortcuts} shortcuts={pickRandomShortcuts.slice(actualShortcuts, actualShortcuts+5)}/>
            </div>
            <div className="knowledge-test-right">
                <h1>1:35</h1>
                <Input name="Keyboard Keys" type="text" value={formatPress()}/>
                <Button name="Validate" onClick={() => console.log('validate')} color="#2563EB" />
            </div>
        </div>
    )
}

export default KnowledgeTest;