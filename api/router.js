var express = require("express"),
    v1_users = require("./routes/1/users"),
    v1_drinkreviews = require("./routes/1/drinkreviews");

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

module.exports = router;
