// firebaseConfig.js

const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "tccinfo-317d5",
  "private_key_id": "5f0f15f7995f0793276317c6838a5b487c6819e6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/Szyh2AC+KPUh\nsBM2pYt6ZN8lp4FTi8Lu/doTui3pbwSvcnzE71mvYyn6GNGmJ+68WXuSLKFlPO4S\nCSsZraUBVmnBLlK7PVj50wxNBF3yOlq4VrWlbds2xEbWecz9ohnet31rYHX4Uy6n\nGmpzuiQDWlGqZ4sRfBYBPvgRuTk4wsiOojZQhFvpowhQ8wIpgQ6ixidkyfZvvL5+\nFKsX3gZIx6ySSLq1S73HwWd1tbusrZzSk99p6SrXWLAfXRk0xAsQZb5AvYcKFeL/\nFEYfp26lHsca9V1Vjs1hXurOICMdGLaLjQHd+HbRW92eZZSd80I22nRTZadc37rF\noAW5S+U1AgMBAAECggEAAybm7P/DJIOPZU8iaMTQrIfAG9ACnRWoBwoVwam+GxC0\nhFgf3wiNcwrL9vv9/g/iqrgdBY+2aafqEpkmE170YX9ncB4mkWXQ8xKSdFC0P5Q6\n201KdKRbLnke42arPCoRLjNIFML/ag0RZiad/Y+Y5uJiPc/Xz3zxgHLlmF0qhBAr\nZaUViIxU1B3dMCsN8gEU9jXjGZnm7/fhYf/1YnO54j7jrZAPQng0yQKswd4zLsHp\n2PdaVbMDcutTVkEb+6H0KQD4CDhB9SIs1gqhWZTy5yUok820pzqxxQfbmnKtfA4r\nlfpgI3W8nLNVMG1I3+VpOOtOkPCIN8P9F/7TzGLegQKBgQDv7mhsACnlTBkg3oJp\nlgRDsR2XLlsbZnXJ4QNvlcukYUvWBleKa2WeDz4TQlOmW5ksGBytM4N4Y6NVjn1x\nmtpcwcLclH15oHTo9BeZ34FTYAY181yamYoy2nhcWBNZBNTXMWoZoQdZV8UO5RsC\nJu/S7dlVO7wSj+pNN2uijAH3lQKBgQDMGvJsn6JOroLa8UgZHvqVILxEm4Z3+O3E\nuGJ9WYHCQyXEOBUHLytJmL0GhE0kOm8YF+QKcLwxIVRvBP/FonZYbkVvKHBwpst8\npm1bXCdYpfmCVHiUltnuewACc1d7YjXvxrkLolXIzjxOsjPPUJMR7/pvq86Pew2t\nF/XIUhRPIQKBgBCB6aNMm5VQGAZ/6J8VGDQEEpIdOV14PjBmj9L0jm8/1nTiONGo\nM/Sc/dtbW9/9O1uiSQ7NlYUJ7ensBMt1KQLqvdppSPy+QmzoplsK2p3+5E5/8OYe\nHDkFePR5htNAFti7aJ5cyuGlvUQaFTKftS5g+Ov5USZBypAHeRtU4KnFAoGAT65B\nb/iOE6t7OGAzpmL6rpdeCGazA0kyAbd987OqvZ0bNFQ0mV5nxs6TFOU3fGo3jq9c\n/lpujbuWS9UmyRAYpYM/JhsickgbbqlGTgFW9vuswZ2aiV+u6rQoF8zRnUCFD/uD\nqDASz1b8IjjdkxTApaMLIOdwt4DxoN6WvEKW3SECgYEApI7TyQqB4TwIy9aiYmtF\nwHsD39KajVkZu4Lr67cAMQmQbgCosCNe2PxlUTIGqUuhX9gMdgduv8/dTw1Bb1HN\nZgRobc1PbIX4Z2Irl4HLyoMfFsxepsVGWpSDJrJiUY+LyZQx6+Ak6oM/6g5tf4oz\n802IjR85Ca5xeIW47G00Myw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-dtgbi@tccinfo-317d5.iam.gserviceaccount.com",
  "client_id": "108477836940584440815",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dtgbi%40tccinfo-317d5.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tccinfo-317d5.firebaseio.com" // URL do seu banco de dados Firebase
});

module.exports = admin;

const admin = require('./firebaseConfig'); // Caminho para o arquivo firebaseConfig.js

// Agora você pode usar o Firestore ou outros serviços do Firebase Admin SDK
const db = admin.firestore();


