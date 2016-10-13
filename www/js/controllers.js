angular.module('app.controllers', [])

.controller('allNotesCtrl', function ($scope, $state) {

    console.log("Hello");

    $scope.notes = {
        tabNotes: [{
            titre: "note1",
            comment: "comment1"
        }]
    };

    console.log($scope.notes);

})
