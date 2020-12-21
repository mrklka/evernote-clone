const router = require('express').Router();
let Trash = require('../models/trashSchema');
const checkAuth = require('../authenticate')

router.route('/').get(checkAuth, (req, res) => {
    Trash.find({userId: req.user.id})
        .then(trash => res.json(trash))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(checkAuth, (req, res) => {
    const notebook = req.body.notebook;
    const title = req.body.title;
    const body = req.body.body;
    const date = Date.parse(req.body.date);
    const userId = req.user.id

    const newTrashNote = new Trash({
        notebook,
        title,
        body,
        date,
        userId
    });

    newTrashNote.save()
        .then(() => res.json('Note added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(checkAuth, (req, res) => {
    Trash.findById(req.params.id)
        .then(trash => res.json(trash))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').delete(checkAuth, (req, res) => {
    Trash.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted'))
        .catch(err => res.status(400).json('Error' + err))

})

router.route('/update/:id').post(checkAuth, (req, res) => {
    Trash.findById(req.params.id)
        .then(trash => {
            trash.username = req.body.username;
            trash.title = req.body.title;
            trash.body = req.body.body;
            trash.date = Date.parse(req.body.date);

            trash.save()
                .then(() => res.json('Note updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;

