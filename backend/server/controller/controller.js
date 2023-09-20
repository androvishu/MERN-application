const Person = require("../models/personInfo")

exports.findALL = async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
        console.log(err.message)
    }
}

exports.create = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        const info = new Person({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gmail: req.body.email,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            gender: req.body.gender,
            dob: req.body.dateOfBirth,
        })

        await info.save()
        res.status(201).json({ message: "Data created!" })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
        console.log(err.message)
    }
}