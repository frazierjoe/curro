// https://stackoverflow.com/questions/60909911/how-do-i-deploy-a-static-react-app-to-heroku?fbclid=IwAR3qVxxn3qBbKs6TuY-hu5jvd-5CVonENxKOQZd7VYQDT5914YgAY8BqzcE
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// Serve our static React site
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Heroku auto loads in a PORT
app.listen(process.env.PORT || 5000);