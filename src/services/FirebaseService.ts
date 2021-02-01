import admin from 'firebase-admin';
import firebaseCredentials from '../../firebase-credentials.json';
import axios from 'axios';

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials as Object),
  databaseURL: process.env.FIREBASE_DATABASE_URL!
})

export async function createDynamicLink(userName: string) {
  const fallbackLink = `${process.env.WEBAPP_URL}/${userName}?showDownloadLinks=true`;
  const res = await axios.post(
    `${process.env.FIREBASE_WEB_API_URL}?key=${process.env.FIREBASE_WEB_API_KEY}`
    , 
    {
      dynamicLinkInfo: {
        domainUriPrefix: process.env.DYNAMIC_LINK_DOMAIN,
        link: fallbackLink,
        androidInfo: {
          androidPackageName: "com.mobile",
          androidFallbackLink: fallbackLink
        },
        iosInfo: {
          iosBundleId: "com.mobile",
          iosFallbackLink: fallbackLink
        },
        socialMetaTagInfo: {
          socialTitle: "Check my app!",
          socialDescription: "Stydying MERN stack"
        }
      }
    }  
  );
  return res.data;
}

export default admin;
