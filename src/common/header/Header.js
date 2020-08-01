import React, {Component} from 'react';
import './Header.css';
import '../common.css';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <div className="flex-container header">
                <span className="logo">Image Viewer</span>
            </div>
        )
    }
}

export default Header;