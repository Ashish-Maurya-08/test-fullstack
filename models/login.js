const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const loginSchema = new Schema({
    f_sno: {
        type: Number,
        unique: true
    },
    f_userName: {
        type: String,
        required: true,
    },
    f_Pwd: {
        type: String,
        required: true
    }
});

loginSchema.plugin(AutoIncrement, { inc_field: 'f_sno' });

module.exports = mongoose.model('t_login', loginSchema);