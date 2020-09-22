import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as ROUTES from '../../constants/routes';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInAnonymously = () => 
    this.auth.signInAnonymously();

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut();
    window.localStorage.setItem("nesta_progress", "");
    window.localStorage.setItem("nesta_pro_skills", "");
    window.localStorage.setItem("nesta_con_skills", "");
    window.localStorage.setItem("nesta_pro_attitudes", "");
    window.localStorage.setItem("nesta_con_attitudes", "");
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: "https://nesta-skills.netlify.app" + ROUTES.VERIFIED,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doLinkWithCredential = (credential) => 
    this.auth.currentUser.linkWithCredential(credential);

  getEmailAuthProviderCredential = (email, password) => 
    this.emailAuthProvider.credential(email, password)

    

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            let dbUser = snapshot.val();

            if(dbUser === null) {
              dbUser = {}
            }
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Page data ***

  roles = () => this.db.ref('roles');
}

export default Firebase;
