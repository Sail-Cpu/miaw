import PropTypes from 'prop-types';

const Icon = ({ path, width, color }) => {

    return (
        <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            style={{ width: width ? width : "24px"}}
            strokeWidth={1.5}
            stroke={color}
        >
            <path d={path} />
        </svg>
    );
};

Icon.propTypes = {
    path: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
};

export default Icon;