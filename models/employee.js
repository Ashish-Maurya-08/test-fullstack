const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new Schema({
    f_Id:{
        type: Number,
        unique: true,
    },
    f_Image:{
        type: String,
        required: true,
    },
    f_Name:{
        type: String,
        required: true,
    },
    f_Email:{
        type: String,
        required: true,
    },
    f_Mobile:{
        type: Number,
        required: true,
    },
    f_Designation:{
        type: String,
        required: true,
    },
    f_gender:{
        type: String,
        required: true,
    },
    f_Course:{
        type: Array,
        required: true,
    },
    f_CreateDate:{
        type: Date,
        required: true,
        default: Date.now,
    }

});

employeeSchema.plugin(AutoIncrement, { inc_field: 'f_Id' });

module.exports = mongoose.model('t_Employee', employeeSchema);