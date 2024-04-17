import PropTypes from "prop-types";
import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import {Link} from "react-router-dom";

const Button = (props) => {
    const {data} = props;

    const style = () => {
        if(data?.background){
            return {
                border: "none",
                background: "#2563EB",
                color: "#fff",
            }
        }
        return {};
    }

    return <button style={style()} onClick={data.action} className={`header-nav-button ${!data?.background && 'btn-no-back'}`}>
            {data.name}
        </button>
}

Button.propTypes = {
    data: PropTypes.object.isRequired
}

const HeaderNav = (props) => {
    const {params} = props;

    return(
        <div className="header-nav-container">
            <div className="header-nav">
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
        </div>
    )
}

HeaderNav.propTypes = {
    params: PropTypes.object.isRequired
}

export default HeaderNav;