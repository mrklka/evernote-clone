const router = require('express').Router();
let Note = require('../models/noteSchema');
const checkAuth = require('../authenticate')

router.route('/').get(checkAuth, (req, res) => {
    Note.find({userId: req.user.id})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(checkAuth, (req, res) => {
    const notebook = req.body.notebook;
    const title = req.body.title;
    const body = req.body.body;
    const date = Date.parse(req.body.date);
    const userId = req.user.id

    const newNote = new Note({
        notebook,
        title,
        body,
        date,
        userId
    });

    newNote.save()
        .then(() => res.json('Note added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(checkAuth, (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').delete(checkAuth, (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note added'))
        .catch(err => res.status(400).json('Error' + err))

})

router.route('/update/:id').post(checkAuth, (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.username = req.body.username;
            note.title = req.body.title;
            note.body = req.body.body;
            note.date = Date.parse(req.body.date);

            note.save()
                .then(() => res.json('Note updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;

