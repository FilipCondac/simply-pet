// Route handler for forum web app

module.exports = function (app, forumData) {

    // Handle our routes

    // Home page
    app.get('/', function (req, res) {
        res.render('index.ejs', forumData)
    });
}