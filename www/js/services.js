angular.module('starter.services', []).factory('Runs', function () {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var runs = [{
    id: 0,
    title: 'History of Silo City',
    description: 'Wake up human for food at 4am swat at dog curl into a furry donut for step on your keyboard while you\'re gaming and then turn in a circle yet mark territory, for use lap as chair stares at human while pushing stuff off a table.',
    image: 'https://placekitten.com/400/250'
  }, {
    id: 1,
    title: 'Culture of Silo City',
    description: 'Wake up human for food at 4am swat at dog curl into a furry donut for step on your keyboard while you\'re gaming and then turn in a circle yet mark territory, for use lap as chair stares at human while pushing stuff off a table.',
    image: 'https://placekitten.com/400/250'
  }, {
    id: 2,
    title: 'A crazy boat story!',
    description: 'Wake up human for food at 4am swat at dog curl into a furry donut for step on your keyboard while you\'re gaming and then turn in a circle yet mark territory, for use lap as chair stares at human while pushing stuff off a table.',
    image: 'https://placekitten.com/400/250'
  }];

  return {
    all: function () {
      return runs;
    },
    get: function (runId) {
      for (var i = 0; i < runs.length; i++) {
        if (runs[i].id === parseInt(runId)) {
          return runs[i];
        }
      }
      return null;
    }
  };
});