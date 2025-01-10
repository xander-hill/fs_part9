interface bmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values not numbers');
    }
}

const calculateBmi = (lb: number, inch: number) => {
    const bmi = (lb * 703) / (inch * inch);
    if (bmi < 18.5) console.log("underweight");
    else if (bmi < 25) console.log("normal range");
    else if (bmi < 30) console.log("overweight");
    else console.log("obese");
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}