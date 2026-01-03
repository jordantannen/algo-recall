import { Storage } from './storage';

const STORAGE_KEY = 'algo-recall-problems';

export class LocalStorage extends Storage {
    _getProblems() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Failed to parse local storage data:', error);
            return {};
        }
    }

    _saveProblems(problems) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
        } catch (error) {
            console.error('Failed to save to local storage:', error);
            throw new Error('Failed to save to local storage');
        }
    }

    async saveProblem(problem, nextReviewDate) {
        const problems = this._getProblems();
        const existingNotes = problems[problem.id]?.notes || '';

        problems[problem.id] = {
            problemId: problem.id,
            problemTitle: problem.title,
            nextReviewDate,
            lastAttempted: Date.now(),
            completed: false,
            notes: existingNotes,
        };

        this._saveProblems(problems);
    }

    async completeProblem(problemId) {
        const problems = this._getProblems();
        const existingNotes = problems[problemId]?.notes || '';

        problems[problemId] = {
            problemId,
            nextReviewDate: 'N/A',
            lastAttempted: Date.now(),
            completed: true,
            notes: existingNotes,
        };

        this._saveProblems(problems);
    }

    async getProblem(problemId) {
        const problems = this._getProblems();
        return problems[problemId] || null;
    }

    async getDueProblems() {
        const problems = this._getProblems();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return Object.values(problems).filter((problem) => {
            if (problem.completed) return false;
            if (typeof problem.nextReviewDate !== 'number') return false;
            return problem.nextReviewDate <= today.getTime();
        });
    }

    async saveNotes(problemId, notes) {
        const problems = this._getProblems();

        if (problems[problemId]) {
            problems[problemId].notes = notes;
        } else {
            problems[problemId] = {
                problemId,
                notes,
                lastAttempted: Date.now(),
            };
        }

        this._saveProblems(problems);
    }
}
