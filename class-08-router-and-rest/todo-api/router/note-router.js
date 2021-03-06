'use strict';

const storage = require('../lib/storage.js');
const Note = require('../model/note.js');

module.exports = function(router){

  router.post('/api/notes', function(req, res){
    // Step one: create a note
    // Step two: store note
    //   on success: send note back
    //   on failer: send error back
    if(!req.body.content || !req.body.title){
      console.error(err);
      res.statusCode = 400; // bad request
      res.end();
      return;
    }

    let note = new Note(req.body);

    storage.setItem('notes', note)
    .then(note => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      // make better errors
      console.error(err);
      res.statusCode = 500;
      res.end();
    });
  });

  router.get('/api/notes', function(req, res){
    let id = req.url.query.id;
    // TODO: put logic right here for a 400 if no id
    storage.getItem('notes', id)
    .then(note => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      // make better errors
      // TODO:  put logic in here for a 404 if getItem didnt find a note
      console.error(err);
      res.statusCode = 500;
      res.end();
    })
  })
};
