const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'Bilalisagoodb$oy';

let success = false;

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage
}).single('image');

router.post('/createuser', upload, [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with this email already exist" });
        }
        const salt = bcrypt.genSaltSync(10);
        const secpass = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
            image: req.file ? req.file.filename : null
        });
        const data = {
            id: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
//login
router.post('/login', ([
    body('email').isEmail(),
    body('password').exists()
  ]),async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const {email,password}=req.body;
          let user=await User.findOne({email});
          if(!user)
            {
              success=false;
              return res.status(400).json({success,error:"Please try with correct credintials"})
            }
          const comparepassword=await bcrypt.compare(password,user.password);
          if(!comparepassword)
            {
              success=false;
              return res.status(400).json({success,error:"Please try with correct credintials"})
            }
            const data={
              id:{
                id:user.id
              }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true;
            const temp=user.id
            // res.json(user)
            res.json({ success,authtoken,temp,user})
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
  })

module.exports = router;
