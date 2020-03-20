const axios = require("axios")
const inquirer = require("inquirer")
const pdf = require("html-pdf")
const fs = require("fs")

var html =fs.readFileSync("./index.html","utf8")
var options = {
    format:"Letter"
}

inquirer.prompt([
    {
        messeage: "Enter github user name?",
        name: "UserName"
    },
    {
        messeage: "what is you favor color?",
        name: "ColorName"
    }
])
.then (function({UserName, ColorName}){const URL = `https://api.github.com/users/${UserName}`;

axios.get(URL).then(function(res){
    var bio = res.data.bio;
    var blog = res.data.blog;
    var pic = res.data.avatar_url;
    var url = res.data.html_url;
    var repo = res.data.public_repos;
    var follower = res.data.followers;
    var following = res.data.follwing;
    var location = res.data.location;
    var currentlocation = `https://www.google.com/search?q=google+maps+${location}`
    fs.writeFile("index.html",`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background: ${ColorName};">
    <h1>${UserName}</h1>
    <img src="${pic}" alt="bio-pic">
        <H2><a href="${url}"></a></H2>
        <p>Numer of repos ${repo}</p>
        <P>Numer of followers ${follower}</P>
        <P>Numer of following ${following}</P>
        <P>bio ${bio}</P>
        <H2><a href="${currentlocation}"></a></H2>  
</body>
</html>`, function(){
    pdf.create(html, options).toFile("./index.pdf", function(data){console.log(data)})
})
});
})