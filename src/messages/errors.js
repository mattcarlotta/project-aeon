// Error Messages //

const accessDenied = "You must be logged in before you can view that page.";

const alreadyVerified =
  "It looks like you have already been verified. You can log into your account at any time.";

const alreadyVoted =
  "Unable to count the vote as it looks like you've have already voted on this before.";

const badCredentials =
  "There was a problem with your login credentials. Please make sure your username and password are correct.";

const cantVoteOnOwnComment =
  "Unable to count the vote as it looks like you tried to vote on your own comment!";

const cantVoteOnOwnQuestion =
  "Unable to count the vote as it looks like you tried to vote on your own question!";

const emailAlreadyTaken =
  "That email is already in use and is associated with an active account.";

const emptyPassword =
  "You must supply a new password in order to reset the old. Please try again.";

const invalidCommentLength =
  "Invalid request. You must supply at least a comment body longer than 5 and less than 500 characters in order to leave a comment.";

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

const missingCommentId =
  "Invalid request. Unable to update the comment because the request is missing a valid comment id.";

const missingCommentReqs =
  "Invalid request. Unable to create a new comment because the request is missing an associated table id.";

const missingNames =
  "Invalid request. You must supply at least a username, a first name and a last name!";

const missingQuestionReqs =
  "Invalid request. You must supply at least a title, tags, and a body in order to create a question.";

const missingQuestionUpdateReqs =
  "Invalid request. You must supply at least a title, tags and a body in order to update a question.";

const missingPasswords =
  "Invalid request. You must supply both your current password and a new password.";

const missingSigninCredentials =
  "Invalid request. You must supply a valid email and password!";

const missingSignupCreds =
  "Invalid request. You must supply a valid: email, first name, last name and password.";

const notLoggedIn =
  "Invalid request. You must have an account and be signed in before you can do that.";

const titleIsTooLong =
  "Unable to save the question. The question title should be 250 characters or less.";

const unableToLocateComment =
  "Invalid request. Unable to locate the comment because the request does not contain a valid comment id.";

const unableToLocateQuestion =
  "Invalid request. Unable to locate the question because the request does not contain a valid question id.";

const unableToLocateQuestions =
  "Invalid request. Unable to locate any questions.";

const unableToLocateTag =
  "Invalid request. Unable to locate the requested tag because the request does not contain a valid tag name.";

const unableToLocateTaggedQuestions =
  "Invalid request. Unable to locate any questions associated with the requested tag. Please make sure the tag is valid.";

const unableToLocateUser = "Unable to locate the requested user.";

const unableToRemoveComment =
  "Invalid request. Unable to remove the comment because the request is missing a valid comment id.";

const unableToRemoveQuestion =
  "Invalid request. Unable to remove the question because the request is missing a valid question id.";

const unableToRestoreQuestion =
  "Invalid request. Unable to restore the question because the request is missing a valid question id.";

const unableToRemoveVote =
  "Invalid request. Unable to locate the vote to be removed as it looks like you haven't voted on this question yet.";

const usernameAlreadyTaken =
  "Uh oh, it appears that username is already taken. Please choose another name.";

export {
  accessDenied,
  alreadyVerified,
  alreadyVoted,
  badCredentials,
  cantVoteOnOwnComment,
  cantVoteOnOwnQuestion,
  emailAlreadyTaken,
  emptyPassword,
  invalidCommentLength,
  invalidEmail,
  invalidPassword,
  invalidSession,
  invalidSignupEmail,
  invalidStatus,
  missingCommentId,
  missingCommentReqs,
  missingEmailCreds,
  missingNames,
  missingQuestionReqs,
  missingQuestionUpdateReqs,
  missingPasswords,
  missingSigninCredentials,
  missingSignupCreds,
  notLoggedIn,
  titleIsTooLong,
  unableToLocateComment,
  unableToLocateQuestion,
  unableToLocateQuestions,
  unableToLocateTag,
  unableToLocateTaggedQuestions,
  unableToLocateUser,
  unableToRemoveComment,
  unableToRemoveQuestion,
  unableToRestoreQuestion,
  unableToRemoveVote,
  usernameAlreadyTaken
};
