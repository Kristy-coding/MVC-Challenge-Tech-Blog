
async function commentFormHandler(event) {
    event.preventDefault();

    // what will we need to make a post request?
    // we need post_id, comment_text, and user_id 
    // we will get user_id from the session and we already told the route to do that in api comment-routes

  // <textarea name="comment-body"></textarea>
  // const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  //<textarea class="form-control" aria-label="With textarea"></textarea>
  
  // grabbing my text area comment 
    const comment_text = document.querySelector('textarea').value.trim();
  
    // here we are just turning the route into a string and then splitting the tring into an arrya at '/' and then we are taking the last index of the array .length-1 which is the id number of the post 
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    //console.log(comment_text, post_id);

    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
}
  
document.querySelector('.comment-form').addEventListener('click', commentFormHandler);