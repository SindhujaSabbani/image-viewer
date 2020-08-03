import React, {Component} from 'react';
import './Profile.css';
import Header from "../../common/header/Header";
import Fab from '@material-ui/core/Fab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import EditIcon from '@material-ui/icons/Edit';





class Profile extends Component {


    constructor() {
        super();
        let media_url = "https://graph.instagram.com/me/media?fields=id,caption&access_token="
            + sessionStorage.getItem('access-token');
        let post_url_prefix = "https://graph.instagram.com/";
        let post_url_postfix = "?fields=id,media_type,media_url,username,timestamp&access_token=" +
            sessionStorage.getItem('access-token');
        let post_data = [];
        fetch(media_url)
            .then(res => res.json())
            .then((result) => {
                    result.data.forEach(element => {
                        fetch(post_url_prefix + element.id + post_url_postfix)
                            .then(res => res.json())
                            .then((result) => {
                                let cap_tags = element.caption.split("\n");
                                result.caption = cap_tags[0];
                                result.tags = cap_tags[1];
                                result.comments = [];
                                result.timestamp = new Date(result.timestamp).toLocaleString();
                                post_data.push(result);
                                this.setState({
                                    post_data: post_data
                                })
                            });
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        this.state = {
            post_data: post_data,
            posts_count: post_data.length,
            following_count: 5,
            followers_count: 5,
            fullname: "Sindhuja Sabbani",
            handle: "sindhuja_sabbani"
        };

    }


    render() {
        return (
            <div>
                <Header showSearch={false} showProfileLink={false} onSearchTextChange={this.onSearchTextChange}/>

                <div className="profile">
                    <img className="profile-image" src='batmanprofile.jpg' />

                    <div className="profile-body">
                        <div className="profile-handle">
                            {this.state.handle}
                        </div>
                        <div className="profile-counts">
                           <div className="profile-count">{"Posts:" + this.state.posts_count}</div>
                           <div className="profile-count">{"Follows:" + this.state.following_count}</div>
                           <div className="profile-count">{"Followed By:" + this.state.followers_count}</div>
                        </div>
                        <div className="profile-name">
                            <div className="profile-full-name">{this.state.fullname}</div>
                            <Fab color="secondary" variant="fab">
                                <EditIcon />
                            </Fab>
                        </div>
                    </div>
                </div>

                <div className="posts">
                    <GridList  cellHeight={300}  cols={3}>
                        {this.state.post_data.map((image) => (
                            <GridListTile key={image.media_url} cols={image.cols || 1}>
                                <img src={image.media_url} alt={image.caption} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

            </div>
        )
    }
}

export default Profile;