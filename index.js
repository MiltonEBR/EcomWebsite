const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'drs5645thg43dfghfhfg3321a' ]
	})
);

app.get('/signup', (req, res) => {
	res.send(`
	<div>
		Hello ${req.session.userId}!
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="Password"/>
            <input name="passwordConf" placeholder="Confirm password"/>
            <button>Sign up</button>
        </form>
    </div>
    `);
});

app.post('/signup', async (req, res) => {
	const { email, password, passwordConf } = req.body;

	const existingUser = await usersRepo.getOneBy({ email });

	if (existingUser) {
		return res.send('Email in use');
	}

	if (password !== passwordConf) {
		return res.send('Passwords must match');
	}

	const user = await usersRepo.create({ email, password });

	req.session.userId = user.id;

	res.send('Account created');
});

app.get('/signin', (req, res) => {
	res.send(`
	<div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="Password"/>
            <button>Sign in</button>
        </form>
    </div>
    `);
});

app.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });

	if (!user) {
		return res.send('Email not found');
	}

	if (user.password !== password) {
		return res.send('Invalid password');
	}

	req.session.userId = user.id;

	res.send('You are logged in!');
});

app.get('/signout', (req, res) => {
	req.session = null;
	res.send('Logged out');
});

app.listen(3000, () => {
	console.log('listening');
});
