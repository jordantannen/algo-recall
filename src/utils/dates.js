export function calculateReviewDate(interval) {
    const reviewDate = new Date();
    reviewDate.setHours(0, 0, 0, 0);
    reviewDate.setDate(reviewDate.getDate() + interval);

    return reviewDate.getTime(); 
}

export function calculateDaysUntilReview(nextReviewDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = nextReviewDate - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}