module.exports = {
	'facebookAuth' : {
		clientID: '396507620905530',
		clientSecret: 'ab708980377ab4dcdb3a764470ddc1e6',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
		//profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name']
    }
}
