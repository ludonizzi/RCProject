module.exports = {
	'facebookAuth' : {
		clientID: process.env.FB_ID,
		clientSecret: process.env.FB_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
		//profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name']
    }
}
