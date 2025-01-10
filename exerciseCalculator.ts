import { isNotNumberArray } from "./utils/isNotNumberArray";

// interface ExerciseInfo {
//     days: number;
//     trainingDays: number;
//     targetValue: number;
//     avgTime: number;
//     targetReached: boolean;
//     rating: number;
//     ratingExplanation: String;
// }

interface ExerciseValues {
    value1: number[];
    value2: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNotNumberArray(args.slice(2))) {
        throw new Error('Provided values must be numbers')
    }
    
    const timesArgs = args.slice(3)
    const times = timesArgs.map(time => Number(time))

    return {
        value1: times,
        value2: Number(args[2])
    }
}

const calculateExercises = (dailyHours: number[], target: number ) => {
    const days = dailyHours.length;
    const trainingDays = [...dailyHours].filter(hrs => hrs !== 0).length;
    const avgTime = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
    const targetReached = avgTime >= target;
    const rating = avgTime > target ? 3 : avgTime < target ? 1 : 2;
    const explanation = rating === 3 ? "Goal exceeded" : rating === 2 ? "Goal met" : "Goal failed" 

    const data = {
        days: days,
        trainingDays: trainingDays,
        targetValue: target,
        avgTime: avgTime,
        targetReached: targetReached,
        rating: rating,
        ratingExplanation: explanation
    }
    console.log(data)
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateExercises(value1, value2)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}