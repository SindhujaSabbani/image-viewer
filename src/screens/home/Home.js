import React, {Component} from 'react';
import './Home.css';
import Header from "../../common/header/Header";
import {
    fetchPostData, getPostData, updateLike, updateComment
} from "../../common/common.js";
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            post_data: [],
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            invalidLogin: "dispNone"
        };

    }

    componentDidMount() {
        fetchPostData(this);
    }

    onSearchTextChange = (keyword) => {
        if (keyword === "") {
            this.setState({post_data: getPostData()});
        } else {
            let post_data = [];
            getPostData().forEach((element) => {
                let caption = element.caption.toLowerCase();
                if (caption.includes(keyword)) {
                    post_data.push(element);
                }
            });
            this.setState({post_data: post_data});
        }
    }

    handleLikeButton = (image_id) => {
        updateLike(this, image_id);
    }

    handleAddComment = (image_id) => {
        let input_text = document.getElementById("imagecomment" + image_id);
        updateComment(this, input_text, image_id);
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
                                        <img src='batmanprofile.jpg' alt="batman"/>
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
                                <div>
                                    <IconButton className="like-button" aria-label="like-button"
                                                onClick={() => this.handleLikeButton(image.id)}>
                                        {image.liked ?
                                            <FavoriteIcon color="secondary" fontSize="large"/> :
                                            <FavoriteBorderIcon fontSize="large"/>}
                                    </IconButton>
                                    {(image.likes_count && image.likes_count > 0) ? image.likes_count + " Likes" : ""}
                                </div>

                                <br/><br/>
                                {image.comments.map(comment => (
                                    <div className="comments">
                                        <Typography style={{fontWeight: 'bold'}}>
                                            {image.username}:
                                        </Typography>
                                        <Typography>
                                            {comment}
                                        </Typography>
                                    </div>
                                ))}

                                <br/>
                                <br/>
                                <div className="comment-container">
                                    <FormControl className="comment">
                                        <InputLabel htmlFor={"imagecomment" + image.id}>Add a Comment</InputLabel>
                                        <Input id={"imagecomment" + image.id} type="text"/>
                                    </FormControl>
                                    <div className="add-button"></div>
                                    <Button id="addedcomment" variant="contained" color="primary"
                                            onClick={() => this.handleAddComment(image.id)}>ADD</Button>
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