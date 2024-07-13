const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const path = require('path');
const Userblog = require('../models/Blogsuser');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');

// Route to fetch all blogs by the authenticated user
router.get('/fetchalluserblog', fetchuser, async (req, res) => {
    try {
        const userblog = await Userblog.find({ user: req.user.id });
        res.json(userblog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch all blogs
router.get('/fetchallblogs', async (req, res) => {
    try {
        const allblogs = await Userblog.find();
        res.json(allblogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/fetchlatestblogs', async (req, res) => {
    try {
        const allblogs = await Userblog.find().sort({ date: -1 }).limit(6);
        res.json(allblogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update likes
router.put('/updatelike/:id', async (req, res) => {
    try {
        let blog = await Userblog.findById(req.params.id);
        blog.likes += 1;
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update the check status
router.put('/updatecheck/:id', async (req, res) => {
    try {
        let blog = await Userblog.findById(req.params.id);
        blog.check = true;
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add comments to a blog
router.put('/updatecomments/:id', async (req, res) => {
    try {
        let blog = await Userblog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const { name, comment } = req.body;
        if (!comment || !name) {
            return res.status(400).json({ message: 'Comment and name are required' });
        }
        const temp = { name, comment };
        blog.comments.push(temp);
        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Route to get comments of a blog
router.get('/getcomments/:id', async (req, res) => {
    try {
        let blog = await Userblog.findById(req.params.id);
        res.json(blog.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update dislikes
router.put('/updatedislike/:id', async (req, res) => {
    try {
        let blog = await Userblog.findById(req.params.id);
        blog.likes -= 1;
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a new blog by the authenticated user
router.post('/addbloguser', fetchuser, upload, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 6 })
], async (req, res) => {
    try {
        console.log("Enter");
        const { title, description, category,check,author } = req.body;
        const image = req.file ? req.file.filename : null;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userblog = new Userblog({
            title,
            description,
            category,
            check,
            author,
            user: req.user.id,
            image
        });

        const savedBlog = await userblog.save();
        res.json({ savedBlog, success: true });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update a blog by the authenticated user
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newBlog = {};

        if (title) { newBlog.title = title; }
        if (description) { newBlog.description = description; }
        if (category) { newBlog.category = category; }

        let blog = await Userblog.findById(req.params.id);
        if (!blog) {
            return res.status(401).send('Not found.');
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(404).send('Not allowed');
        }

        blog = await Userblog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true });
        res.send(blog);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to delete a blog by the authenticated user
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        let blog = await Userblog.findById(req.params.id);
        if (!blog) {
            return res.status(401).send('Not found.');
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(404).send('Not allowed');
        }

        await Userblog.findByIdAndDelete(req.params.id);
        res.send('deleted');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
