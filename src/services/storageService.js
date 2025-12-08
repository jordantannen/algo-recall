import { FirebaseStorage } from "./firebaseStorage";

export const storageService = new FirebaseStorage();

export const saveProblem = (problem, nextReviewDate) => 
    storageService.saveProblem(problem, nextReviewDate);

export const completeProblem = (problemId) => 
    storageService.completeProblem(problemId);

export const getProblem = (problemId) => 
    storageService.getProblem(problemId);

export const getDueProblems = () => 
    storageService.getDueProblems();

export const saveNotes = (problemId, notes) => 
    storageService.saveNotes(problemId, notes);