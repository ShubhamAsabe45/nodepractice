const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;

        // Find the user by username
        const user = await Person.findOne({ username: username });

        // If the user dose not exists or password does not match return error
        if (!user || (await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        res.json({ token })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/', jwtAuthMiddleware,async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Recived');
        res.status(200).json(data); // Send the response with status

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work; // Extract the work type f

        // Assuming you already have a Person model and MongoDB conn
        const persons = await Person.find({ work: workType });
        // Send the list of persons with the specified work type as 
        res.json(persons);
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId, updatePersonData, {
            new: true,
            runValidators: true
        }
        );
        if (!response) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            ``
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Person deleted' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Serverer Error' })
    }
})

// Module export
module.exports = router;
