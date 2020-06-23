// Error Messages //

const accessDenied = "You must be logged in before you can view that page.";

const alreadyVerified =
  "It looks like you have already been verified. You can log into your account at any time.";

const badCredentials =
  "There was a problem with your login credentials. Please make sure your username and password are correct.";

const emailAlreadyTaken =
  "That email is already in use and is associated with an active account.";

const emptyPassword =
  "You must supply a new password in order to reset the old. Please try again.";

const invalidEmail =
  "That email is not associated with an active account. Please make sure to supply a valid registered email in order to resend a verification!";

const invalidSignupEmail =
  "There was a problem authenticating your request. The authorized key that was supplied does not match the staff approved email.";

const invalidPassword =
  "The current password you've supplied does not match our records. Please try again.";

const invalidSession =
  "Your session has expired. Please sign into your account again.";

const invalidStatus =
  "Access to your account was revoked. The account you're trying to log into has been permanently suspended.";

const missingEmailCreds =
  "That email is not associated with an active account. Please make sure the email address is spelled correctly.";

const missingNames =
  "You must supply at least a username, a first name and a last name!";

const missingQuestionReqs =
  "Invalid request. You must supply at least a title and a body in order to create a new question.";

const missingPasswords =
  "You must supply both your current password and a new password.";

const missingSigninCredentials =
  "Invalid login request. You must supply a valid email and password!";

const missingSignupCreds =
  "Invalid sign up request. You must supply a valid: email, first name, last name and password.";

const notLoggedIn =
  "You must have an account and be signed in before you can do that.";

const titleIsTooLong =
  "Unable to save the question. The question title should be 250 characters or less.";

const unableToLocateQuestion =
  "Unable to locate the question because the URL does not contain a valid question id.";

const unableToLocateQuestions = "Unable to locate any questions.";

const unableToLocateTag =
  "Unable to locate the requested tag because the URL does not contain a valid tag name.";

const unableToLocateTaggedQuestions =
  "Unable to locate any questions associated with the requested tag. Please make sure the tag is valid.";

const unableToLocateUser = "Unable to locate the requested user.";

const usernameAlreadyTaken =
  "Uh oh, it appears that username is already taken. Please choose another name.";

export {
  accessDenied,
  alreadyVerified,
  badCredentials,
  emailAlreadyTaken,
  emptyPassword,
  invalidEmail,
  invalidPassword,
  invalidSession,
  invalidSignupEmail,
  invalidStatus,
  missingEmailCreds,
  missingNames,
  missingQuestionReqs,
  missingPasswords,
  missingSigninCredentials,
  missingSignupCreds,
  notLoggedIn,
  titleIsTooLong,
  unableToLocateQuestion,
  unableToLocateQuestions,
  unableToLocateTag,
  unableToLocateTaggedQuestions,
  unableToLocateUser,
  usernameAlreadyTaken,
};
