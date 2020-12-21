const router = require('express').Router();
let Notebook = require('../models/notebookSchema');
let Users = require('../models/userModel')
const checkAuth = require('../authenticate')

router.route('/').get(checkAuth,(req, res) => {
    Notebook.find({userId: req.user.id})
        .then(notebooks => res.json(notebooks))
        .catch(err => res.statusMessage(400).json('Error: ' + err));
})

router.route('/add').post(checkAuth,(req, res) => {
    const name = req.body.notebook;
    const userId = req.user.id
    var email = ''
    Users.findById(req.user.id).then(user => {
        email = user.email
        const newNoteBook = new Notebook({ 
            name,userId,email })
    
        newNoteBook.save()
            .then(() => res.json('Notebook Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
})

router.route('/:id').delete(checkAuth,(req, res) => {
    Notebook.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted'))
        .catch(err => res.status(400).json('Error' + err))

})

module.exports = router;