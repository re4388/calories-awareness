const {google} = require('googleapis');
const {auth} = require('google-auth-library');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billing = google.cloudbilling('v1').projects;

exports.stopBilling = async (pubsubEvent, context) => {
  const pubsubData = JSON.parse(
    Buffer.from(pubsubEvent.data, 'base64').toString()
  );

  console.log(`pubsubData`, pubsubData);
  console.log(`pubsubData.budgetAmount: `, pubsubData.budgetAmount);
  console.log(`pubsubData.costAmount: `, pubsubData.costAmount);

  if (pubsubData.costAmount <= pubsubData.budgetAmount) {
    console.log(`No action necessary. (Current cost: ${pubsubData.costAmount})`);
    return `No action necessary. (Current cost: ${pubsubData.costAmount})`;
  }

  if (!PROJECT_ID) {
    console.log(`No project specified`);
    return `No project specified`;
  }

  /* Set Global Credentials */
  await _setAuthCredential();

  const billingEnabled = await _isBillingEnabled(PROJECT_NAME);
  if (billingEnabled) {
    console.log(`billingEnabled Info: `, _disableBillingForProject(PROJECT_NAME));
    return _disableBillingForProject(PROJECT_NAME);
  } else {
    console.log(`Billing already disabled`);
    return 'Billing already disabled';
  }
};


////////////////////////////////////////////
/* Below are helper function */
////////////////////////////////////////////


/**
 * @return {Promise} Credentials set globally
 */
const _setAuthCredential = async () => {
  const res = await auth.getApplicationDefault();

  let client = res.credential;
  if (client.hasScopes && !client.hasScopes()) {
    client = client.createScoped([
      'https://www.googleapis.com/auth/cloud-billing',
      'https://www.googleapis.com/auth/cloud-platform',
    ]);
  }

  // Set credential globally for all requests
  google.options({
    auth: client,
  });
};

/**
 * Determine whether billing is enabled for a project
 * @param {string} projectName Name of project to check if billing is enabled
 * @return {bool} Whether project has billing enabled or not
 */
const _isBillingEnabled = async (projectName) => {
  try {
    const res = await billing.getBillingInfo({name: projectName});
    console.log(`getBillingInfo: `, res)
    return res.data.billingEnabled;
  } catch (e) {
    console.log('Unable to determine if billing is enabled on specified project, assuming billing is enabled');
    return true;
  }
};

/**
 * Disable billing for a project by removing its billing account
 * @param {string} projectName Name of project disable billing on
 * @return {string} Text containing response from disabling billing
 */
const _disableBillingForProject = async (projectName) => {
  const res = await billing.updateBillingInfo({
    name: projectName,
    resource: {billingAccountName: ''}, // Disable billing
  });
  console.log(`Billing disabled: ${JSON.stringify(res.data)}`)
  return `Billing disabled: ${JSON.stringify(res.data)}`;
};
