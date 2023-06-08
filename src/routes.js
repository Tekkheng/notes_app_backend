/* eslint-disable linebreak-style */
const {
  getHomePage, postHandler, getNoteById, editNoteById, deletetNoteById,
} = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: getHomePage,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: postHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteById,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deletetNoteById,
  },
];
module.exports = Routes;
