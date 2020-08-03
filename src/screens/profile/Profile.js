import React, {Component} from 'react';
import './Profile.css';
import Header from "../../common/header/Header";
import Fab from '@material-ui/core/Fab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {fetchPostData, getPostData} from "../../common/common.js";
import {updateComment, updateLike} from "../../common/common";


class Profile extends Component {


    constructor() {
        super();

        this.state = {
            post_data: [],
            posts_count: 0,
            following_count: 3,
            followers_count: 10,
            fullname: "Sindhuja Sabbani",
            handle: "sindhuja_sabbani",
            editModalOpen: false,
            fullnameRequired: "hidden",
            newFullname: "",
            imageModalId: "",
            image: null
        };

    }

    componentDidMount() {
        fetchPostData(this);
    }

    handleEditClose = () => {
        this.setState({editModalOpen: false})
    }

    handleEditClick = () => {
        this.setState({editModalOpen: true})
    }

    handleNameChange = (e) => {
        this.setState({newFullname: e.target.value});
        let fullname = this.state.newFullname;
        if (fullname === "") {
            this.setState({fullnameRequired: "visible"});
        }
    }

    handleNameUpdate = () => {
        let fullname = this.state.newFullname;
        if (fullname == "") {
            this.setState({fullnameRequired: "visible"});
        } else {
            this.setState({
                fullnameRequired: "hidden",
                fullname: fullname,
                newFullname: ""
            });
            this.handleEditClose();
        }
    }

    handleImageClick = (image) => {

        this.setState({
            image: image,
            imageModalId: image.id
        });
    }

    handleImageClose = () => {
        this.setState({
            imageModalId: "",
            image: null
        });
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
                <Header showSearch={false} showProfileLink={false} onSearchTextChange={this.onSearchTextChange}/>

                <div className="profile">
                    <img className="profile-image" src='batmanprofile.jpg'/>

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
                                <EditIcon id="edit-icon" onClick={this.handleEditClick}/>
                            </Fab>
                            <div>
                                <Modal className="edit-modal" open={this.state.editModalOpen}
                                       onClose={this.handleEditClose}
                                       onBackdropClick={this.handleEditClose}>
                                    <Card>
                                        <CardContent className="edit-content">
                                            <FormControl>
                                                <span className="title">Edit</span>
                                            </FormControl>
                                            <FormControl required>
                                                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                                <Input id="fullname" type="text" onChange={this.handleNameChange}/>
                                                <FormHelperText className={this.state.fullnameRequired}>
                                                    <span className="red">required</span>
                                                </FormHelperText>
                                            </FormControl>
                                            <Button variant="contained" color="primary"
                                                    onClick={this.handleNameUpdate}>UPDATE</Button>
                                        </CardContent>
                                    </Card>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="posts">
                    <GridList cellHeight={300} cols={3}>
                        {this.state.post_data.map((image) => (
                            <GridListTile key={image.media_url} cols={image.cols || 1}
                                          onClick={() => this.handleImageClick(image)}>
                                <img src={image.media_url} alt={image.caption}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

                {this.state.imageModalId === "" ?
                    "" :
                    <Modal className="image-modal" open={this.state.imageModalId === "" ? false : true}
                     onClose={this.handleImageClose} onBackdropClick={this.handleImageClose}>
                        <Card className="image-modal-card">
                            <img src={this.state.image.media_url} alt={this.state.image.caption} className="modal-image"/>
                            <div className="image-modal-content">
                                <CardHeader
                                    avatar={
                                        <Avatar >
                                            <img src='batmanprofile.jpg' alt="batman"/>
                                        </Avatar>
                                    }
                                    title={this.state.image.username}/>

                                <CardContent>
                                    <hr/>
                                    <Typography>{this.state.image.caption}</Typography>
                                    <Typography color='primary'>
                                        {this.state.image.tags}
                                    </Typography>
                                    <div>
                                        <IconButton className="like-button" aria-label="like-button"
                                                    onClick={() => this.handleLikeButton(this.state.image.id)}>
                                            {this.state.image.liked ?
                                                <FavoriteIcon color="secondary" fontSize="large"/> :
                                                <FavoriteBorderIcon fontSize="large"/>}
                                        </IconButton>
                                        {(this.state.image.likes_count && this.state.image.likes_count > 0) ? this.state.image.likes_count + " Likes" : ""}
                                    </div>

                                    <br/><br/>
                                    {this.state.image.comments.map(comment => (
                                        <div className="comments">
                                            <Typography style={{fontWeight: 'bold'}}>
                                                {this.state.image.username}:
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
                                            <InputLabel htmlFor={"imagecomment" + this.state.image.id}>Add a
                                                Comment</InputLabel>
                                            <Input id={"imagecomment" + this.state.image.id} type="text"/>
                                        </FormControl>
                                        <div className="add-button"></div>
                                        <Button id="addedcomment" variant="contained" color="primary"
                                                onClick={() => this.handleAddComment(this.state.image.id)}>ADD</Button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Modal>
                }

            </div>
        )
    }
}

export default Profile;