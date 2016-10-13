angular.module('app.controllers', [])

.controller('allNotesCtrl', function ($scope, $state, TabNotes) {

        $scope.notes = {
            tabNotes: TabNotes.all()
        };

        TabNotes.add("note1", "comment");

    })
    .controller('noteCtrl', function ($scope, $state, $stateParams) {
        $scope.note = $stateParams.noteId;

    });
