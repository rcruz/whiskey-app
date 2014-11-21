var express = require("express"),
    v1_users = require("./routes/1/users"),
    v1_drinkreviews = require("./routes/1/drinkreviews"),
    v1_articles = require("./routes/1/articles");
    v1_drinks = require("./routes/1/drinks");

var router = express.Router();

router.route("/1/users/:uid")
    .get(v1_users.findById)
    .put(v1_users.update)
    .delete(v1_users.remove);

router.route("/1/users/")
    .get(v1_users.findAll)
    .post(v1_users.add);

router.route("/1/drinkreviews/:drid")
    .get(v1_drinkreviews.findById)
    .put(v1_drinkreviews.update)
    .delete(v1_drinkreviews.remove);

router.route("/1/drinkreviews/")
    .get(v1_drinkreviews.findAll)
    .post(v1_drinkreviews.add);

router.route("/1/articles/:aid")
    .get(v1_articles.findById)
    .put(v1_articles.update)
    .delete(v1_articles.remove);

router.route("/1/articles/")
    .get(v1_articles.findAll)
    .post(v1_articles.add);

router.route("/1/drinks/")
    .get(v1_drinks.findAll)
    .post(v1_drinks.add);

router.route("/1/drinks/:did")
    .get(v1_drinks.findByID)
    .put(v1_drinks.update)
    .delete(v1_drinks.remove);

module.exports = router;
