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

function updatePostData(post_data) {
    sessionStorage.setItem("post_data", JSON.stringify(post_data));
}

function getPostData() {
    let post_data = sessionStorage.getItem("post_data");
    if (post_data == null) {
        post_data = [];
    } else {
        post_data = JSON.parse(post_data);
    }
    return post_data;
}

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
function updateLike(component, image_id) {
    let post_data = getPostData();
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
    updatePostData(post_data);
    component.setState({post_data: post_data});
}

function updateComment(component, input_text, image_id) {
    let post_data = getPostData();
    let i = 0;
    for (; i < post_data.length; i++) {
        if (post_data[i].id === image_id) {
            if (input_text) {
                post_data[i].comments.push(input_text.value);
                if (component.state.image != null) {
                    component.state.image.comments.push(input_text.value);
                }
                input_text.value = "";
            }
            break;
        }
    }
    updatePostData(post_data);
    component.setState({post_data: post_data});
}

export {
    fetchPostData,
    updatePostData,
    getPostData,
    updateLike,
    updateComment
};