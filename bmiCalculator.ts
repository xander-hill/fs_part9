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

export const calculateBmi = (lb: number, inch: number): String => {
    const bmi = (lb * 703) / (inch * inch);
    if (bmi < 18.5) return "underweight";
    else if (bmi < 25) return "normal range";
    else if (bmi < 30) return "overweight";
    else return "obese";
}

if (require.main === module){
    try {
        const { value1, value2 } = parseArguments(process.argv);
        console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage)
    }
}