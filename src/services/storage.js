/* eslint-disable no-unused-vars */
export class Storage {
    async saveProblem(problemId, nextReviewDate) {
        throw new Error('Must implement saveProblem');
    }

    async completeProblem(problemId) {
        throw new Error('Must implement completeProblem');
    }

    async getProblem(problemId) {
        throw new Error('Must implement getReviewDate');
    }
}