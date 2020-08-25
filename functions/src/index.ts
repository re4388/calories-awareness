// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// const db = admin.firestore();

// Sendgrid Config
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);



/* Send welcome mail when user subscribe daily reminder */
export const newSubscriber = functions.firestore
  .document('subscribeUsers/{subscribeUsersId}')
  .onCreate(async (change, context) => {

    const userSnapshots = await admin
      .firestore()
      .collection(`userSummary`)
      .get();
    const displayName = userSnapshots.docs.map(
      (snap) => snap.data().displayName
    );

    const msg = {
      to: change.data().email,
      from: 're4388@muenai.com',
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        subject: `Welcome to join our Daily Reminder`,
        name: displayName,
        text: `do you record your diet today?
                Do it and keep fit!`,
      },
    };
    // Send it
    return sgMail.send(msg);
  });

/* run weekly to aggregate and update the userSummary collection */
export const updateUserSummary = functions.pubsub
  .schedule('every friday 17:25')
  .timeZone('Asia/Taipei')
  .onRun(async (context) => {
    functions.logger.log('updateUserSummary function is alive checking');

    // TODO you will summary data in `calories` into `userSummary`
    // const userSnapshots = await admin.firestore().collection('users').get();
    // const emails = userSnapshots.docs.map((snap) => snap.data().email);
  });

/* send Weekly Summary for user in subscribeUsers collection */
export const weeklySummary = functions.pubsub
  .schedule('every friday 17:30')
  .timeZone('Asia/Taipei')
  .onRun(async (context) => {
    const userSnapshots = await admin.firestore()
      .collection(`userSummary`).get();
    const emails = userSnapshots.docs.map((snap) => snap.data().email);

    // TODO get summary data for below mail sending
    // const recordSnap = await admin
    //   .firestore()
    //   .collectionGroup().select

    const msg = {
      to: emails,
      from: 're4388@muenai.com',
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        subject: `Calories Awareness: Your Weekly Summary`,
        text: `Time to record your Calories!
        Summary functionality is still in beta testing..`,
      },
    };
    return sgMail.send(msg);
  });

/* send daily mail for user in subscribeUsers collection */
export const dailyNotice = functions.pubsub
  .schedule('20 17 * * *') // everyday at 5:20 PM
  .timeZone('Asia/Taipei')
  .onRun(async (context) => {
    const collection = `subscribeUsers`;

    const subscribeUsersSnapshots = await admin
      .firestore()
      .collection(collection)
      .get();

    const emails = subscribeUsersSnapshots.docs.map(
      (snap) => snap.data().email
    );

    const msg = {
      to: emails,
      from: 're4388@muenai.com',
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        subject: `Calories Awareness: Daily Notice: do you record your Calories? ❤`,
        text: 'Time to record your Calories! Insert summary here...',
      },
    };

    return sgMail.send(msg);
  });





/* Below code are reference code */



/**
 * 1. Sends email to user after sign up
 */



// export const welcomeEmail = functions.auth.user().onCreate((user) => {
//   const msg = {
//     to: user.email,
//     from: 're4388@muenai.com',
//     templateId: TEMPLATE_ID,
//     dynamic_template_data: {
//       subject: 'Welcome to my awesome app!',
//       name: user.displayName,
//     },
//   };

//   return sgMail.send(msg);
// });

/* ends email via HTTP. Can be called from frontend code. */
// export const genericEmail = functions.https.onCall(async (data, context) => {
//   // validate that the user is logged in with an email
//   if (!context.auth && !context.auth.token.email) {
//     throw new functions.https.HttpsError(
//       'failed-precondition',
//       'Must be logged with an email address'
//     );
//   }

//   const msg = {
//     to: context.auth.token.email,
//     from: 're4388@muenai.com',
//     templateId: TEMPLATE_ID,
//     dynamic_template_data: {
//       subject: data.subject,
//       name: data.text,
//     },
//   };

//   await sgMail.send(msg);

// Handle errors here

// Response must be JSON serializable
//   return {
//     success: true,
//   };
// });



/* 3. Send mail trigger by firestore */

// export const newComment = functions.firestore
//   .document('posts/{postId}/comments/{commentId}')
//   .onCreate(async (change, context) => {

//     // Read the post document
//     const postSnap = await db
//       .collection('posts')
//       .doc(context.params.postId).get();

//     // Raw Data
//     const post = postSnap.data();
//     const comment = change.data();

//     // Email
//     const msg = {
//       to: post.authorEmail,
//       from: 're4388@muenai.com',
//       templateId: TEMPLATE_ID,
//       dynamic_template_data: {
//         subject: `New Comment on ${post.title}`,
//         name: post.displayName,
//         text: `${comment.user} said... ${comment.text}`,
//       },
//     };

//     // Send it
//     return sgMail.send(msg);

// });



/* add new field and copy old field to new field,
trigger once only */

// export const batchUpdate = functions.firestore
//   .document('calories/{caloriesId}')
//   .onCreate(async (change, context) => {
//     const allDocs = await admin.firestore()
//       .collection(`calories`).get();
//     allDocs.forEach((doc) => {
//       const ref = doc.ref;
//       return ref.update({
//         dateSelected: doc.data().createdAt,
//       });
//     });
//   });
