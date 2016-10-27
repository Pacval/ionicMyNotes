//Structure note :
//    id            (auto)
//    titre
//    comment
//    importance
//    couleur
//    dateButoir    (can be null)
//    done          (auto)
//    dateDone      (auto)

angular.module('app.services', [])

.factory('Importances', function(){
    var importances = [
    {value: 'Faible', couleur: '#00ff00'}, //vert
    {value: 'Normale', couleur: '#ffae00'}, //jaune
    {value: 'Forte', couleur: '#ff0000'} //rouge
    ];

    var neutral = 1; // neutral = Normale

    return {
        all: function(){
            return importances;
        },
        getNeutral: function(){
            return importances[neutral];
        },
        getCouleur: function(value){
            for (var i = 0; i < importances.length; i++) {
                if (importances[i].value === value) {
                    return importances[i].couleur;
                }
            }
            return null;
        }
    };

})
.factory('NoteDatabase', function($cordovaSQLite, $ionicPlatform){
    var db, dbName = "myNotes.db"

    function useWebSql() {
        db = window.openDatabase(dbName, "1.0", "Note database", 200000)
        console.info('Using webSql')
    }

    function useSqlLite() {
        db = $cordovaSQLite.openDB({name: dbName})
        console.info('Using SQLITE')
    }

    function initDatabase(){
        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS T_NOTE (id integer primary key, titre text, comment text, importance text, couleur text, dateButoir text, done text, dateDone text)')
        .then(function(res){

        }, onErrorQuery)
    }

    $ionicPlatform.ready(function () {
        if(window.cordova){
            useSqlLite()
        } else {
            useWebSql()
        }
        initDatabase()
    })

    function onErrorQuery(err){
      console.error(err)
    }


    return {
        createNote: function (note) {
            return $cordovaSQLite.execute(db, 'INSERT INTO T_NOTE (titre, comment, importance, couleur, dateButoir, done, dateDone) VALUES(?, ?, ?, ?, ?, ?, ?)', [note.titre, note.comment, note.importance, note.couleur, note.dateButoir, "false", null])
        },
        updateNote: function(note){
            return $cordovaSQLite.execute(db, 'UPDATE T_NOTE set titre = ?, comment = ?, importance = ?, couleur = ?, dateButoir = ?, done = ?, dateDone = ? where id = ?', [note.titre, note.comment, note.importance, note.couleur, note.dateButoir, note.done, note.dateDone, note.id])
        },
        getAll: function(callback){
            $ionicPlatform.ready(function () {
                $cordovaSQLite.execute(db, 'SELECT * FROM T_NOTE').then(function (results) {
                    var data = []

                    for (i = 0, max = results.rows.length; i < max; i++) {
                        data.push(results.rows.item(i))
                    }

                    callback(data)
                }, onErrorQuery)
            })
        },

        deleteNote: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM T_NOTE where id = ?', [id])
        },  

        getById: function(id, callback){
            $ionicPlatform.ready(function () {
                $cordovaSQLite.execute(db, 'SELECT * FROM T_NOTE where id = ?', [id]).then(function (results) {
                    callback(results.rows.item(0))
                })
            })
        }
    }

});
