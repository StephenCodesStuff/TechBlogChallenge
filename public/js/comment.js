const newCommentHandler = async (event) => {
    event.preventDefault();
    const post_id = "nothing"
  
    const comment_text = document.querySelector('#comment-form').value.trim();


    if (comment_text && post_id) {
      const response = await fetch(`../api/comment/:postId/`, {

        method: 'POST',
        body: JSON.stringify({ comment_text, post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create a comment');
      }
    }
  };

 
  document
    .querySelector("#post-comment")
    .addEventListener("click", newCommentHandler);