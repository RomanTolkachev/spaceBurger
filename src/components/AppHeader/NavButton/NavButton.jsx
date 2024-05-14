import styles from './NavButton.module.css'
import PropTypes from 'prop-types';

const NavButton = (props) => {
    return (
        <a href="#" className={`${styles.navButton} pl-5 pr-5 pb-3 pt-3`}>{props.icon}{props.children}</a>
    )
}

NavButton.propTypes = {
    icon: PropTypes.object,
    children: PropTypes.node
}

export default NavButton

