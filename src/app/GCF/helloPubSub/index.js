/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param event Event payload.
 * @param context Metadata for the event.
 */
exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'Hello, World';
  console.log(message);
};