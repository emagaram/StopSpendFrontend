import { FirebaseError } from "firebase/app";

export default function userErrorMessages(error: FirebaseError) {
  switch (error.code) {
    case "auth/invalid-email":
      return "The email you entered is invalid.";
    case "auth/invalid-new-email":
      return "The new email you entered is invalid.";
    case "auth/too-many-requests":
      return "Too many failed attempts have been made recently, please try again later.";
    case "auth/user-not-found":
      return "The email you entered does not exist.";
    case "auth/wrong-password":
      return "The password you entered is incorrect.";
    case "auth/requires-recent-login":
      return "Please login again to make this change.";
    case "auth/email-already-in-use":
      return "A user already exists with that email address.";
    default:
      return undefined;
  }
}
