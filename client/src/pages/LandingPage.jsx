import Logo from '../assets/logo.png';
import ButtonGroup from "../components/navigations/ButtonGroup.jsx";
import {useContext, useState} from "react";
import {ThemeContext} from "../context/ThemeContext";
//Images
import SoftwareItDark from '../assets/software_dark.png';
import SoftwareItLight from '../assets/software_light.png';
import KnowItDark from '../assets/know_dark.png';
import KnowItLight from '../assets/know_light.png';
import SpeedItDark from '../assets/speed_dark.png';
import SpeedItLight from '../assets/speed_light.png';
import CourseItLight from '../assets/course_light.png';
import CourseItDark from '../assets/course_dark.png';
import {Link} from "react-router-dom";

const Footer = () => {
    return(
        <div className="footer-container">
            <div className="footer-content">
                <Link to={"http://portfolio.sofianelasoa.fr/"} target="_blank" rel="noopener noreferrer">
                    <span>Designed & Built by Sofiane Lasoa</span>
                </Link>
            </div>
        </div>
    )
}


const labels = [
    {
        id: 1,
        name: 'Software',
        light: SoftwareItLight,
        dark: SoftwareItDark
    },
    {
        id: 2,
        name: 'Course',
        light: CourseItLight,
        dark: CourseItDark
    },
    {
        id: 3,
        name: 'Quiz',
        light: KnowItLight,
        dark: KnowItDark
    },
    {
        id: 4,
        name: 'Speed test',
        light: SpeedItLight,
        dark: SpeedItDark
    }
]

const LandingPage = () => {

    const [selected, setSelected] = useState(1);

    const {theme} = useContext(ThemeContext);

    return (
        <div className="landing-page">
            <div className="landing-page-head">
                <div className="badge-container">
                    <div className="badge">
                        {<img src={Logo} alt="logo"/>}
                        <span>MIAW</span>
                    </div>
                </div>
                <div className="title-container">
                    <h1>Increase your productivity by using your keyboard more effectively</h1>
                    <span>All the keyboard shortcuts for many software programs, quizzes, and a keyboard speed test.</span>
                </div>
                <div className="app-interface-container">
                    <div className="buttons-container">
                        <ButtonGroup labels={labels} setSelected={setSelected} selected={selected} />
                    </div>
                    <img src={theme === "light" ? labels[selected-1].dark : labels[selected-1].light} alt="interface"/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;