

async function newFormHandler(event) {
    event.preventDefault();
  
    // to make a request to the database to post this new blog we need to supply the title, blog_text, and the user_id ... the user id will be grabbed from the session which we already told this api route to do 
    const title = document.querySelector('input').value;
    const blog_text = document.querySelector('textarea').value;
  

    ////On form submission, this will grab the post-title and post-url values from the form and send them with a POST request to /api/posts. Remember, though, that the /api/posts endpoint requires a third property: the user ID. Like the other routes, this can be obtained from the session
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        blog_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
        // if the response from the database is good then we are redirected to the dashboard where we can see our new post was created/ added to the database and displayed on the dashboard 
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

 