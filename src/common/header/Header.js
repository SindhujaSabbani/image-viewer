import React, {Component} from 'react';
import './Header.css';
import '../common.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            menuOpen: false,
            searchBox: sessionStorage.getItem('access-token') == null ? "search-box-none" : "search-box-show"
        };


    }

    handleOpenMenu = () => {
        this.setState({menuOpen: true})
    }

    getProfileButton = () => {
        document.getElementById("profile-icon")
    }
    handleMyAccount = () => {
        this.setState({menuOpen: false})
    }
    handleLogout = () => {
        this.setState({menuOpen: false})
        sessionStorage.removeItem("access-token");
    }
    handleLoginStatus = () => {
        if (sessionStorage.getItem("access-token") == null) {
            return <Redirect to="/"/>;
        }
    }

    handleClose = () => {
        this.setState({menuOpen: false})
    }

    handleSearchTextChange = (event) => {
        this.props.onSearchTextChange(event.target.value);
    }

    render() {
        return (
            <div className="flex-container header">
                {this.handleLoginStatus()}
                <Link className="logo" style={{textDecoration: 'none'}} to='/home'>Image Viewer</Link>
                <div className={this.state.searchBox}>
                    {this.props.showSearch != false ?
                        <div className="search">
                            <SearchIcon></SearchIcon>
                            <Input id="search" placeholder='Search...' type="text" disableUnderline={true}
                                   onChange={this.handleSearchTextChange}/>
                        </div>
                        : ""
                    }

                    <IconButton id="profile-icon">
                        <Avatar src='batmanprofile.jpg' onClick={this.handleOpenMenu}/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.getProfileButton}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        open={this.state.menuOpen}
                        onClose={this.handleClose}>


                        {this.props.showProfileLink != false ?
                            <MenuItem component={Link} to='/profile'
                                      onClick={this.handleMyAccount}>My account</MenuItem>
                            :""}
                        {this.props.showProfileLink != false ? <hr/>:""}

                        <MenuItem component={Link} to='/' onClick={this.handleLogout}>Logout</MenuItem>

                    </Menu>
                </div>
            </div>
        )
    }
}

export default Header;