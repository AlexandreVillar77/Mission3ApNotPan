var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


// Retourne tout le fichier JSon
router.get('/', function (req, res, next) {
    fs.readFile(path.join(__dirname, 'songs.json'), 'utf8', function (err, songs) {
        if (err) { throw err; }

        liste = JSON.parse(songs);
        res.send(liste);
    });
});
/*
// Retourne les musiques du genre
router.get('/:genre', function (req, res, next) {
    var leGenre = req.params.genre;
    var nb = 0;
    fs.readFile(path.join(__dirname, 'songs.json'), 'utf8', function (err, songs) {
        if (err) {
            throw err;
        }
        var resultat = JSON.parse(songs);
        // Notre fichier contient en fait un objet… contenant d’autres objets
        var liste = resultat.songs;
        for (var i in liste) {
            if (liste[i].genre == leGenre) {
                nb = nb + 1;
            }
        }
        if (nb == 0) {
            res.send('il n\'y a pas de chansons du genre : ' + leGenre);
        } else {
            res.send('il y a ' + nb + ' chanson(s) de ce genre...');
        }
    });
});
*/
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    
    var name = "oui";
    var auteur = "";
    var genre = ""
    fs.readFile(path.join(__dirname, 'songs.json'), 'utf8', function (err, songs) {
        if (err) {
            throw err;
        }
        var resultat = JSON.parse(songs);
        // Notre fichier contient en fait un objet… contenant d’autres objets
        var liste = resultat.songs;
        for (var i in liste) {
            if (liste[i].id == id) {
                name = liste[i].titre;
                auteur = liste[i].auteur;
                genre = liste[i].genre;
            }
        }
        if (name != "oui") {
            res.send('La musique correspondant à cette id est : ' + name + ' de '+ auteur + ' le genre de cette musique est  '+ genre);
        } else {
            res.send('La musique demander a l\' id ' + id + ' n\'existe pas');
        }
    });
});

module.exports = router;