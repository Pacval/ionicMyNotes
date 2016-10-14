angular.module('app.services', [])

.factory('TabNotes', function () {
    var tabNotes = [];

    var id = 1;

    return {
        all: function () {
            return tabNotes;
        },
        add: function (titre, comment) {
            tabNotes.push({
                id: id,
                titre: titre,
                comment: comment,
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
});
