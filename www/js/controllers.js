angular.module('app.controllers', [])

.controller('allNotesCtrl', function ($scope, NoteDatabase) {
    //$scope.$on('$ionicView.enter', function(){
        NoteDatabase.getAll(function(data){
            $scope.notes = data;
        });
    //});

})
.controller('noteCtrl', function ($scope, $state, $stateParams, $filter, $ionicActionSheet, $ionicPopup, NoteDatabase) {
    NoteDatabase.getById($stateParams.noteId, function(item){
        $scope.note = item;
        $scope.note.done = ($scope.note.done == 'true');
    });

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
                    $scope.doneTriggered();
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
                        NoteDatabase.deleteNote($scope.note.id);
                        $state.go('allNotes');
                        return true;
                    }
                });
                return true;
            },

            cancelText: 'Annuler',
            cancel: function () {}
        });
    };

    $scope.doneTriggered = function(){
        if ($scope.note.done){
            $scope.note.dateDone = $filter('date')(new Date(), 'dd/MM HH:mm:ss');
        } else {
            $scope.note.dateDone = null;
        }
    };

    $scope.saveAndBack = function(){
        NoteDatabase.updateNote($scope.note).then($state.go('allNotes'));
    }

})
.controller('newNoteCtrl', function ($scope, $ionicPopup, $state, Importances, NoteDatabase) {

    $scope.form = {};
    $scope.enums = {};

    $scope.enums.importances = Importances.all();

    $scope.form.titre = "";
    $scope.form.comment = "";
    $scope.form.importance = Importances.getNeutral().value;

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
        if ($scope.form.titre !== "" && $scope.form.importance !== "") {
            $scope.form.couleur = Importances.getCouleur($scope.form.importance);
            NoteDatabase.createNote($scope.form);
            $state.go('allNotes');

        } else {
            $ionicPopup.alert({
                title: 'Erreur',
                template: 'Veuillez remplir tous les champs'
            });
        }
    };

    $scope.dateButoirTriggered = function(){
        if (!$scope.form.hasDateButoir){
            $scope.form.dateButoir = "";
        }
    };
});
