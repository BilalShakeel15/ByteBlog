const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const {Schema}=mongoose;

// const commentSchema = new Schema({
//     name: { type: String, required: true },
//     comment: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
//   });


const BlogUser=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        default:'General'
    },
    check:{
        type:Boolean,
        default:false
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[],
    author:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    image: {
        type: String
    }

})


module.exports=mongoose.model('bloguser',BlogUser)
