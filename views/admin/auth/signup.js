const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
	return layout({
		content: `
        <div>
            Hello ${req.session.userId}!
            <form method="POST">
                <input name="email" placeholder="email"/>
                ${getError(errors, 'email')}
                <input name="password" placeholder="Password"/>
                ${getError(errors, 'password')}
                <input name="passwordConf" placeholder="Confirm password"/>
                ${getError(errors, 'passwordConf')}
                <button>Sign up</button>
            </form>
        </div>
        `
	});
};
