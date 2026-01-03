import { FirebaseStorage } from "./firebaseStorage";
import { LocalStorage } from "./localStorage";
import { auth } from "../config/firebase";

const firebaseStorage = new FirebaseStorage();
const localStorageService = new LocalStorage();

const getStorage = () => {
    return auth.currentUser ? firebaseStorage : localStorageService;
};

export const saveProblem = (problem, nextReviewDate) => 
    getStorage().saveProblem(problem, nextReviewDate);

export const completeProblem = (problemId) => 
    getStorage().completeProblem(problemId);

export const getProblem = (problemId) => 
    getStorage().getProblem(problemId);

export const getDueProblems = () => 
    getStorage().getDueProblems();

export const saveNotes = (problemId, notes) => 
    getStorage().saveNotes(problemId, notes);