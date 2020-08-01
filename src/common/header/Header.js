import React, {Component} from 'react';
import './Header.css';
import '../common.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';



class Header extends Component {

    constructor() {
        super();

        console.log("xx" + sessionStorage.getItem('access-token') + "xx" )
        this.state = {
            searchBox: sessionStorage.getItem('access-token') == null ? "search-box-none" : "search-box-show"
        };


    }
    render() {
        return (
            <div className="flex-container header">
                <div className="logo">Image Viewer</div>
                <div className={this.state.searchBox}>
                    <div className="search">
                        <SearchIcon></SearchIcon>
                        <Input id="search" placeholder='Search...' type="text"  disableUnderline={true}/>
                    </div>
                    <IconButton >
                        <Avatar src='batmanprofile.jpg'/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default Header;