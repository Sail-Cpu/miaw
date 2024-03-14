import PropTypes from 'prop-types';

const Icon = ({ path, width, height, color }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={width}
            height={height}
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

Icon.defaultProps = {
    width: '24',
    height: '24',
    color: '#1F2937',
};

export default Icon;