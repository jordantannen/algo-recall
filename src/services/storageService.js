import { FirebaseStorage } from "./firebaseStorage";

export const storageService = new FirebaseStorage();

export const saveProblem = (problem, nextReviewDate) => 
    storageService.saveProblem(problem, nextReviewDate);

export const completeProblem = (problemId) => 
    storageService.completeProblem(problemId);

export const getReviewDate = (problemId) => 
    storageService.getProblem(problemId);

