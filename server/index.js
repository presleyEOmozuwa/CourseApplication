const express = require('express');
const path = require('path');
const port = process.env.PORT || 4260;
const app = express();

const destinationDir = path.join(__dirname, '../dist/course-app');

// Hosting from dist folder
app.use(express.static(destinationDir));
console.log(`express hosting from ${destinationDir}`);

// Serving index.html file to the Client
app.get('*', (req, res) =>{
   res.sendFile(path.join(destinationDir, 'index.html'));
});
console.log(`Serving index.html file to the client`);

// Initialize app and listens on specified port
app.listen(port, () => {
    console.log(`Server is running from port ${port}`);
})
