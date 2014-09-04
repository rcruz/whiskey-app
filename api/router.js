var express = require("express"),
    v1_users = require("./routes/1/users");

var router = express.Router();

router.route("/1/users/:uid")
    .get(v1_users.findById)
    .put(v1_users.update)
    .delete(v1_users.remove);

router.route("/1/users/")
    .get(v1_users.findAll)
    .post(v1_users.add);

module.exports = router;
