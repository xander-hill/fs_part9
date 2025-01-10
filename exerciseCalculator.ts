interface ExerciseInfo {
    days: number;
    trainingDays: number;
    targetValue: number;
    avgTime: number;
    targetReached: boolean;
    rating: number;
    ratingExplanation: String;
}

const calculateExercises = (dailyHours: number[], target: number ) : ExerciseInfo => {
    const days = dailyHours.length;
    const trainingDays = [...dailyHours].filter(hrs => hrs !== 0).length;
    const avgTime = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
    const targetReached = avgTime >= target;
    const rating = avgTime > target ? 3 : avgTime < target ? 1 : 2;
    const explanation = rating === 3 ? "Goal exceeded" : rating === 2 ? "Goal met" : "Goal failed" 

    return {
        days: days,
        trainingDays: trainingDays,
        targetValue: target,
        avgTime: avgTime,
        targetReached: targetReached,
        rating: rating,
        ratingExplanation: explanation
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))