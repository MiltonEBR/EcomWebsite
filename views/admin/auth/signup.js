const layout = require('../layout');

module.exports = ({ req }) => {
	return layout({
		content: `
        <div>
            Hello ${req.session.userId}!
            <form method="POST">
                <input name="email" placeholder="email"/>
                <input name="password" placeholder="Password"/>
                <input name="passwordConf" placeholder="Confirm password"/>
                <button>Sign up</button>
            </form>
        </div>
        `
	});
};
