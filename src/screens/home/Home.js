import React, {Component} from 'react';
import './Home.css';
import Header from "../../common/header/Header";
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

class Home extends Component {

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
                    console.log(result);
                    result.data.forEach(element => {
                        fetch(post_url_prefix + element.id + post_url_postfix)
                            .then(res => res.json())
                            .then((result) => {
                                let cap_tags = element.caption.split("\n");
                                result.caption = cap_tags[0];
                                result.tags = cap_tags[1];
                                result.timestamp = new Date(result.timestamp).toLocaleString();
                                post_data.push(result);
                                this.setState({
                                    post_data_orig: post_data,
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
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            invalidLogin: "dispNone"
        };

    }

    onSearchTextChange = (keyword) => {
        if (keyword == "") {
            this.setState({post_data:this.state.post_data_orig});
        } else {
            let post_data = [];
            this.state.post_data_orig.forEach((element) => {
                let caption = element.caption.toLowerCase();
                if (caption.includes(keyword)) {
                    post_data.push(element);
                }});
            this.setState({post_data: post_data});
        }
    }

    render() {
        return (
            <div>
                <Header onSearchTextChange={this.onSearchTextChange}/>
                <div className="postlist">


                    {this.state.post_data.map(image => (

                        <Card className="card">
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <img src='batmanprofile.jpg'/>
                                    </Avatar>
                                }
                                title={image.username}
                                subheader={image.timestamp}/>

                            <CardContent>
                                <img src={image.media_url} alt={image.caption} className="image"/>
                                <hr/>
                                <Typography>{image.caption}</Typography>
                                <Typography color='primary'>
                                    {image.tags}
                                </Typography>
                                <IconButton className="like-button" aria-label="like-button"
                                            onClick={() => this.likeBtnHandler(image.id)}>
                                    {/* Based on the condition of the icon will be filled red or only the border */}
                                    {image.user_has_liked ?
                                        <FavoriteIcon className="image-liked-icon" fontSize="large"/> :
                                        <FavoriteBorderIcon className="image-like-icon" fontSize="large"/>}
                                </IconButton>
                                <br/><br/>
                                <FormControl>
                                    <FormHelperText className={this.state.addComment}>
                                        <div><Typography>: {this.state.addedComment}</Typography></div>
                                    </FormHelperText>
                                </FormControl>
                                <br/>
                                <br/>
                                <div className="comment-container">
                                    <FormControl className="comment">
                                        <InputLabel htmlFor="imagecomment">Add a Comment</InputLabel>
                                        <Input id="imagecomment" type="text"
                                               onChange={this.imageCommentOnChangeChangeHandler}/>
                                    </FormControl>
                                    <div className="add-button"></div>
                                    <Button id="addedcomment" variant="contained" color="primary"
                                            onClick={this.addCommentOnClickHandler}>ADD</Button>
                                </div>

                            </CardContent>

                        </Card>
                    ))}

                </div>

            </div>
        )
    }
}

export default Home;