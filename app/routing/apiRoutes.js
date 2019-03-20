var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    }); 

    app.post("/api/friends", function(req, res) {
        console.log(req.body);
        
        var userData = req.body;
        var userScores = userData.scores;
        var bestMatch = 0;
        var leastDifference = -1;

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            var totalDifference = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));    
            }

            if (leastDifference != -1 || totalDifference < leastDifference) {
                leastDifference = totalDifference;
                bestMatch = i;
            }
        }

        bestMatchJson = {
            name: friends[bestMatch].name,
            photo: friends[bestMatch].photo
        };

        res.json(bestMatchJson);

        friends.push(userData);
    });
};
