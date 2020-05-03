const { Router } = require('express');
const router = Router();
//exportando las funciones para las peticiones desde "controllers"
const { getNotes, 
        createNotes, 
        getNote, 
        updateNotes, 
        deleteNotes } = require('../controllers/notes.controller');


router.route('/')
            .get(getNotes)
            .post(createNotes);

router.route('/:id')
            .get(getNote)
            .put(updateNotes)
            .delete(deleteNotes);

module.exports = router;