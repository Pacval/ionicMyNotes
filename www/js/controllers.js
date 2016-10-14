angular.module('app.controllers', [])

.controller('allNotesCtrl', function ($scope, $state, TabNotes) {

        if (typeof $scope.notes === 'undefined') {
            $scope.notes = {
                tabNotes: TabNotes.all()
            };

            TabNotes.add("note1", "comment 1");
            TabNotes.add("note2", "comment 2");
            TabNotes.add("note3", "comment 3");
        }

    })
    .controller('noteCtrl', function ($scope, $state, $stateParams, TabNotes, $ionicActionSheet) {
        $scope.note = TabNotes.get($stateParams.noteId);

        $scope.noteOptions = function (note) {
            var actionSheet = $ionicActionSheet.show({
                buttons: [
                    {
                        text: 'Terminé / En cours'
                    }
                ],
                buttonClicked: function (index) {
                    if (index === 0) { //Bouton "Terminé"
                        note.done = !note.done;
                        return true;
                    }
                },

                destructiveText: 'Supprimer',
                destructiveButtonClicked: function () {
                    TabNotes.remove(note);

                    $state.go('allNotes');
                    return true;
                },

                cancelText: 'Annuler',
                cancel: function () {}
            })
        };
    })
    .controller('newNoteCtrl', function ($scope, TabNotes) {
        $scope.form = {};


    });
