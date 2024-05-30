import PropTypes from "prop-types";
import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import {Link} from "react-router-dom";
import SwitchMode from "../SwitchMode.jsx";
import {ThemeContext} from "../../context/ThemeContext.jsx";
import {useContext, useState} from "react";
import Logo from "../../assets/logo.png";


const Hamburger = ({setToggle, toggle}) => {

    return(
        <div onClick={() => setToggle(!toggle)}>
            <label className={`nav-hamburger ${toggle && "active"}`}>
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    )
}

Hamburger.propTypes = {
    setToggle: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired
}

const HeaderNavRight = ({params, isVisible}) => {

    const {theme, toggleDarkTheme, toggleLightTheme} = useContext(ThemeContext);

    return(
        <div className="header-nav-right" style={{right: isVisible ? 0 : "-250px"}}>
            {
                params?.theme &&
                <SwitchMode checked={theme === 'dark'} onChange={theme === "light" ? toggleDarkTheme : toggleLightTheme} />
            }
            {
                params.tabs.map((tab, idx) => {
                    return <Link key={idx} to={tab.link}><div className="nav-tab">
                        {tab.name}
                    </div></Link>
                })
            }
            {params?.search &&
                <div className="search-icon">
                    <Icon path={allIcons.search} />
                </div>
            }
            <div className="buttons-container">
                {
                    params.buttons.map((button, idx) => {
                        return <Button key={idx} data={button} />
                    })
                }
            </div>
        </div>
    )
}

HeaderNavRight.propTypes = {
    params: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired
}

const Button = (props) => {
    const {data} = props;

    const {theme, colors} = useContext(ThemeContext);

    const style = () => {
        if(data?.background){
            return {
                border: "none",
                background: colors[theme].primary,
                color: "#fff",
            }
        }
        return {};
    }

    return <button style={style()} onClick={data.action} className={`header-nav-button ${!data?.background && 'btn-no-back'}`}>
            {data.icon && <Icon path={data.icon} color={colors[theme].text} width="18px"/>}
        <span>{data.name}</span>
    </button>
}

Button.propTypes = {
    data: PropTypes.object.isRequired
}

const HeaderNav = (props) => {
    const {params} = props;

    const {theme, toggleDarkTheme, toggleLightTheme} = useContext(ThemeContext);
    const [toggleNav, setToggleNav] = useState(false);

    return(
        <div className="header-nav-container">
            {params?.logo && <img className="header-nav-logo" src={Logo} alt="logo"/>}
            <div className="header-nav">
                {
                    params?.theme &&
                        <SwitchMode checked={theme === 'dark'} onChange={theme === "light" ? toggleDarkTheme : toggleLightTheme} />
                }
                {
                    params.tabs.map((tab, idx) => {
                        return <Link key={idx} to={tab.link}><div className="nav-tab">
                            {tab.name}
                        </div></Link>
                    })
                }
                {params?.search &&
                    <div className="search-icon">
                        <Icon path={allIcons.search} />
                    </div>
                }
                <div className="buttons-container">
                    {
                        params.buttons.map((button, idx) => {
                            return <Button key={idx} data={button} />
                        })
                    }
                </div>
            </div>
            <Hamburger setToggle={setToggleNav} toggle={toggleNav}/>
            <HeaderNavRight params={params} isVisible={toggleNav}/>
        </div>
    )
}

HeaderNav.propTypes = {
    params: PropTypes.object.isRequired
}

export default HeaderNav;