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
    .controller('noteCtrl', function ($scope, $state, $stateParams, TabNotes, $ionicActionSheet, $ionicPopup) {
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
                    $ionicPopup
                        .confirm({
                            title: 'Supprimer cette note',
                            template: 'Voulez vous supprimer cette note ?'
                        })
                        .then(function (res) {
                            if (res) {
                                TabNotes.remove(note);
                                $state.go('allNotes');
                                return true;
                            }
                        });
                    return true;
                },

                cancelText: 'Annuler',
                cancel: function () {}
            })
        };
    })
    .controller('newNoteCtrl', function ($scope, TabNotes, $ionicPopup, $state) {

        $scope.form = {};

        $scope.form.titre = "";
        $scope.form.comment = "";
        $scope.form.importance = "Normale";

        $scope.quitter = function () {
            $ionicPopup
                .confirm({
                    title: 'Quitter ?',
                    template: 'Vos données seront perdues'
                })
                .then(function (res) {
                    if (res) {
                        $state.go('allNotes');
                    }
                });
        }

        $scope.createNote = function () {
            if ($scope.form.titre !== "" &&
                $scope.form.comment !== "" &&
                $scope.form.importance !== "") {

                TabNotes.add($scope.form.titre, $scope.form.comment, $scope.form.importance);

                $state.go('allNotes');

            } else {
                $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Veuillez remplir tous les champs'
                });
            }
        };
    });
