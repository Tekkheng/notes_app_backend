/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const getHomePage = ((req, h) => {
  const { username } = req.params;
  return h.response({
    status: 'success',
    data: {
      notes, username,
    },
  });
});

const postHandler = ((req, h) => {
  const { title, body, tags } = req.payload;
  const id = nanoid(10);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    id, title, body, tags, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((n) => n.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'note baru berhasil ditambahkan',
      data: {
        noteId: id,
      },
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'note baru gagal ditambahkan',
  }).code(500);
});

const getNoteById = ((req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return h.response({
      status: 'success',
      data: {
        note,
      },
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'gagal id tidak ditemukan!',
  }).code(404);

  // const index = notes.findIndex((n) => n.id === id);

  // if (index !== -1) {
  //   const note = notes[index];
  //   return h.response({
  //     status: 'success',
  //     data: {
  //       note,
  //     },
  //   });
  // }
  // return h.response({
  //   status: 'failed',
  //   message: 'gagal id tidak ditemukan',
  // });
});

const editNoteById = ((req, h) => {
  const { id } = req.params;
  const { title, body, tags } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index], id, title, body, tags, updatedAt,
    };
    return h.response({
      status: 'success',
      message: `note pada id=${id}, berhasil di edit!`,
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'gagal edit, id tidak ditemukan!',
  }).code(404);
});

const deletetNoteById = ((req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return h.response({
      status: 'success',
      message: `note dengan id=${id}, berhasil di hapus!`,
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'gagal hapus, id tidak ditemukan!',
  }).code(200);
});

module.exports = {
  getHomePage, postHandler, getNoteById, editNoteById, deletetNoteById,
};
