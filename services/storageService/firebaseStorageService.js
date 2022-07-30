const admin = require('firebase-admin')
const serviceAccount = require('./minisocialmedia-1c24f-firebase-adminsdk-8oxlt-e2cd95dedb.json')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://minisocialmedia-1c24f.appspot.com"
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}