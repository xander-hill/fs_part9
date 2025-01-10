//type bmi = 'underweight' | 'normal range' | 'overweight' | 'obese'

const calculateBmi = (lb: number, inch: number) : String => {
    const bmi = (lb * 703) / (inch * inch);
    console.log(bmi)
    if (bmi < 18.5) return "underweight";
    else if (bmi < 25) return "normal range";
    else if (bmi < 30) return "overweight";
    else return "obese";
}

console.log(calculateBmi(180, 74))