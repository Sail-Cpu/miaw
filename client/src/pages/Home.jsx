import Button from "../components/Button.jsx";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext.jsx";

const Home = () => {

    const {theme, colors} = useContext(ThemeContext)

    return(
        <div className="home-container">
            <div className="home-content">
                <h1>Miaw</h1>
                <p>Enhance your productivity with our comprehensive
                    keyboard improvement platform. Discover an extensive
                    list of keyboard shortcuts for all your favorite software,
                    take engaging quizzes to reinforce your learning, and
                    challenge yourself with our speed typing tests. Elevate
                    your efficiency and become a keyboard shortcut pro today!</p>
                <Button name="Go" color={colors[theme].primary} onClick={() => console.log("ok")} />
            </div>
        </div>
    )
}

export default Home;