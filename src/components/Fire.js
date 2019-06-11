import firebase from 'firebase'

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