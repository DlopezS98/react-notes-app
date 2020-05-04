//creando el objeto de funciones para las peticioes (get, post, put, delete)
const notesCtrl = {};
const Note = require('../models/Note');


//Obteniendo todas las notas...  {GET}
notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
}

//Obteniendo una sola nota... {GET} --> ('/:id')
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

//Creando una nota...  {POST}
notesCtrl.createNotes = async (req, res) => {
    //destructurando para obtener los datos
    const {title, content, date, author} = req.body;
    //Creando una nueva nota
    const newNote = new Note({
        title:title,
        content:content,
        author: author,
        date: date
    });
    //Guardando la nota en la base de datos
    await newNote.save();
    res.json({message: 'note saved'});
}

//Actualizando una nota...  {PUT} --> ('/:id')
notesCtrl.updateNotes = async (req, res) => {
    const {title, content, author, date} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title: title,
        content: content,
        author: author,
        date: date
    });
    res.json({message: 'notes updated successfuly'});
}

//Eliminando una nota...   {DELETE} --> ('/:id')
notesCtrl.deleteNotes = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'notes deleted successfuly'});
}

module.exports = notesCtrl;