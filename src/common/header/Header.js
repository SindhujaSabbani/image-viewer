import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <span className="logo">Image Viewer</span>
            </div>
        )
    }
}

export default Header;