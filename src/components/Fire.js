import firebase from 'firebase'

/* 
It's fine to expose this stuff, but make sure you have security rules setup server-side in Firebase. 
Otherwise, anyone can whatever they want to your DB.

Read this craptastic article -- the 2 steps outlined are what you should do
https://medium.com/@impaachu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843 
https://firebase.google.com/docs/reference/security/database/
*/

const config = {
	apiKey: "AIzaSyCfRNMojIm31NBzNqvRpyrtgXBV4l3NpLM",
	authDomain: "guild-recruit.firebaseapp.com",
	databaseURL: "https://guild-recruit.firebaseio.com",
	projectId: "guild-recruit",
	storageBucket: "guild-recruit.appspot.com",
	messagingSenderId: "39854529631",
	appId: "1:39854529631:web:84a8510aaaa11a1f"
};
firebase.initializeApp(config);
firebase.database()

export default firebase