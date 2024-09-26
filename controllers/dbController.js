const employee = require('../models/employee');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const upload = multer({
    dest: "../pics/"
});

exports.getEmployee = async (req, res) => {
    try {
        const employees = await employee.find();
        console.log(employees);
        
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createEmployee = [upload.single('image'), async (req, res) => {
    const newEmployee = new employee({
        f_Name: req.body.name,
        f_Email: req.body.email,
        f_Mobile: req.body.phone,
        f_Designation: req.body.designation,
        f_gender: req.body.gender,
        f_Course: req.body.course
    });

    console.log(newEmployee);
    

    const emailExists = await employee.findOne({ f_Email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        if (req.file) {
            // console.log('File received:', req.file);
            const newFileName = `${newEmployee.f_Name}_${newEmployee._id}${path.extname(req.file.originalname)}`;
            const newFilePath = path.join(__dirname, '../pics/', newFileName);
            // console.log('Attempting to save file to:', newFilePath);
            fs.renameSync(req.file.path, newFilePath);
            // console.log('File saved successfully');
            newEmployee.f_Image = newFileName;
        }
        const savedEmployee = await newEmployee.save();
        console.log('Saved employee:', savedEmployee);

        res.status(201).json(savedEmployee);
    } catch (err) {
        console.error('Error saving file:', err);
        return err;
    }
}];

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await employee.findByIdAndDelete(req.params.id);
        console.log(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateEmployee = [upload.single('image'), async (req, res) => {
    const newData = {
        f_Name: req.body.name,
        f_Email: req.body.email,
        f_Mobile: req.body.phone,
        f_Designation: req.body.designation,
        f_gender: req.body.gender,
        f_Course: req.body.course
    };

    console.log(newData);
    console.log(req.body);
    
    const id = parseInt(req.params.id);

    const emailExists = await employee.findOne({ f_Email: req.body.email, f_Id: { $ne: id } });
    if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        const existingEmployee = await employee.findOne({ f_Id: id });
        if (!existingEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (req.file) {
            const newFileName = `${newData.f_Name}_${newData._id}${path.extname(req.file.originalname)}`;
            const newFilePath = path.join(__dirname, '../pics/', newFileName);

            if (existingEmployee.f_Image) {
                const oldFilePath = path.join(__dirname, '../pics/', existingEmployee.f_Image);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            fs.renameSync(req.file.path, newFilePath);
            newData.f_Image = newFileName;
        }

        const updatedEmployee = await employee.updateOne({ f_Id: id }, newData);
        res.json(updatedEmployee);
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(400).json({ message: err.message });
    }
}];
