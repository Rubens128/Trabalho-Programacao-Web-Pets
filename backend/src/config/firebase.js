const admin = require("firebase-admin")
const keyFireBase = require("../../serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(keyFireBase),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
    admin,
    db,
    auth,
};