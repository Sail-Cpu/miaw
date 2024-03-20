import Key from "./Key.jsx";

const Shortcut = () => {
    return(
        <div className="shortcut-container">
            <div className="shortcut-nav">
                <div className="tab" style={{borderRight: "1px solid #E5E7EB"}}>
                    Windows / Linux
                </div>
                <div className="tab" style={{borderLeft: "1px solid #E5E7EB"}}>
                    Mac OS
                </div>
            </div>
            <div className="shortcut-content">
                <h3>Copier</h3>
                <p>Permet de copier les element d’une selection</p>
                <div className="all-keys-container">
                    <Key name="ctrl"/>
                    <span className="more">+</span>
                    <Key name="c"/>
                </div>
            </div>
        </div>
    )
}

export default Shortcut;