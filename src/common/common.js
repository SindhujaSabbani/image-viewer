//function to fetch the posts data
function fetchPostData(component) {
    let post_data = sessionStorage.getItem("post_data");
    console.log(post_data);
    if (post_data == null) {
        let media_url = "https://graph.instagram.com/me/media?fields=id,caption&access_token="
            + sessionStorage.getItem('access-token');
        let post_url_prefix = "https://graph.instagram.com/";
        let post_url_postfix = "?fields=id,media_type,media_url,username,timestamp&access_token=" +
            sessionStorage.getItem('access-token');
        post_data = []
        fetch(media_url)
            .then(res => res.json())
            .then((result) => {
                    result.data.forEach(post => {
                        fetch(post_url_prefix + post.id + post_url_postfix)
                            .then(res => res.json())
                            .then((result) => {
                                let cap_tags = post.caption.split("\n");
                                result.caption = cap_tags[0];
                                result.tags = cap_tags[1];
                                result.comments = [];
                                result.timestamp = new Date(result.timestamp).toLocaleString();
                                post_data.push(result);
                                updatePostData(post_data);
                                component.setState({
                                    post_data: post_data,
                                    posts_count: post_data.length,
                                });
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
    } else {
        post_data = JSON.parse(post_data)
        component.setState({
            post_data: post_data,
            posts_count: post_data.length,
        });
    }
}
//fuction to update the post data
function updatePostData(post_data) {
    sessionStorage.setItem("post_data", JSON.stringify(post_data));
}
//function to get the post data
function getPostData() {
    let post_data = sessionStorage.getItem("post_data");
    if (post_data == null) {
        post_data = [];
    } else {
        post_data = JSON.parse(post_data);
    }
    return post_data;
}

//updating post like
function  updatePostLike(post) {
    post.liked = !post.liked;
    if (!post.likes_count) {
        post.likes_count = 0;
    }
    if (post.liked) {
        post.likes_count++;
    } else {
        post.likes_count--;
    }
}

//updating post list like.
function updatePostsLike(component, post_data, image_id) {
    let i = 0;
    for (; i < post_data.length; i++) {
        if (post_data[i].id === image_id) {
            let post = component.state.image;
            if (post != null) {
                updatePostLike(post);
            }
            updatePostLike(post_data[i]);
            break;
        }
    }
}

//updating post like in session store and component state
function updateLike(component, image_id) {
    let post_data = getPostData();

    updatePostsLike(component, post_data, image_id);
    updatePostData(post_data);
    if (component.state.post_data != null) {
        let post_data = component.state.post_data;
        updatePostsLike(component, post_data, image_id);
        component.setState({post_data: post_data});
    } else {
        component.setState({post_data: post_data});
    }
}

// updating post comment
function updatePostsComment(component, post_data, comment, image_id) {
    let i = 0;
    for (; i < post_data.length; i++) {
        if (post_data[i].id === image_id) {
            if (comment && comment != "") {
                post_data[i].comments.push(comment);
            }
            break;
        }
    }
}

// updating post comment in session store and component state
function updateComment(component, input_text, image_id) {
    let post_data = getPostData();
    let comment = input_text.value;
    updatePostsComment(component, post_data, comment, image_id)
    updatePostData(post_data);
    if (input_text) {
        input_text.value = "";
    }
    if (component.state.post_data != null) {
        let post_data = component.state.post_data;
        updatePostsComment(component, post_data, comment, image_id);
        component.setState({post_data: post_data});
    } else {
        component.setState({post_data: post_data});
    }
}

export {
    fetchPostData,
    updatePostData,
    getPostData,
    updateLike,
    updateComment
};