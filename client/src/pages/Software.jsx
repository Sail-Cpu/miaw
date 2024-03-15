import VsCode from "../assets/vscodelogo.png";
import NavButton from "../components/NavButton.jsx";
import vsCodeInterface from "../assets/vscodeinteface.png"

const Software = () => {
    return(
        <div className="software-page-container">
            <div className="software-head">
                <img src={VsCode} alt="software logo"/>
                <NavButton name="All Shortcuts" link="/software" color="#2563EB" />
            </div>
            <div className="software-hero-banner">
                <div className="software-hero-banner-content software-hero-banner-left">
                    <h1>Visual Studio Code</h1>
                    <p>Visual Studio Code (VS Code) est un éditeur de code source léger
                        mais puissant, développé par Microsoft. Il offre une interface
                        utilisateur intuitive.</p>
                    <div className="software-hero-banner-bottom">
                        <NavButton name="Course" link="/software" color="#33D3C1" />
                        <NavButton name="Knowledge Test" link="/software" color="#33D3C1" />
                    </div>
                </div>
                <div className="software-hero-banner-content software-hero-banner-right">
                    <img src={vsCodeInterface} alt="vs code"/>
                </div>
            </div>
        </div>
    )
}

export default Software;