// Example using fetch
fetch(`${process.env.REACT_APP_API_URL}/api/users`)
  .then(res => res.json())
  .then(data => console.log(data));
