const express = require('express'),
	app = express()
const ipp = require('instagram-profile-picture')

app.get('/api/:user', async (req, res) => {
    const username = req.params.user
    await ipp(username)
		.then(link => res.json({ link: link }))
		.catch(error => {
			if (error.statusCode === 404) res.status(404).json({ error: { status: 404, title: 'User could not be found.' }})
    	})
})

const serializeError = (err) => new Object({ errors: [{ status: 500, title: err.message, stack: err.stack }] })
app.use((err, req, res, next) => {
	res.status(500).json(serializeError(err))
})

module.exports = app