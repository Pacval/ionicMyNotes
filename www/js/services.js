//Structure note :
//    id            (auto)
//    titre
//    comment
//    importance
//    dateButoir    (can be null)
//    done          (auto)

angular.module('app.services', [])

.factory('TabNotes', function () {
    var tabNotes = [];

    var id = 1;

    return {
        all: function () {
            return tabNotes;
        },
        add: function (titre, comment, importance, dateButoir) {
            tabNotes.push({
                id: id,
                titre: titre,
                comment: comment,
                importance: importance,
                dateButoir: dateButoir,
                done: false
            });
            id = id + 1;
        },
        remove: function (note) {
            tabNotes.splice(tabNotes.indexOf(note), 1);
        },
        get: function (noteId) {
            for (var i = 0; i < tabNotes.length; i++) {
                if (tabNotes[i].id === parseInt(noteId)) {
                    return tabNotes[i];
                }
            }
            return null;
        }
    };
})
.factory('Importances', function(){
    var importances = [
    {value: 'Faible', couleur: '#00ff00'}, //vert
    {value: 'Normale', couleur: '#ffff00'}, //jaune
    {value: 'Forte', couleur: '#ff0000'} //rouge
    ];

    var neutral = 1; // neutral = Normale

    return {
        all: function(){
            return importances;
        },
        getNeutral: function(){
            return importances[neutral];
        }
        getCouleur: function(value){
            for (var i = 0; i < importances.length; i++) {
                if (importances[i].value === value) {
                    return tabNotes[i];
                }
            }
            return null;
        }
    };

});
