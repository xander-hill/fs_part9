import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumberArray } from './utils/isNotNumberArray';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (!isNaN(weight) && !isNaN(height)) {
        const bmi = calculateBmi(weight, height);
        res.send({
            weight: weight,
            height: height,
            bmi: bmi
        });
    }

    else  {
        res.status(400).send({ error: "Malformatted parameters" });
    }
});

// @ts-expect-error lalala
app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyHours, target } = req.body;

    console.log(req.body);

    console.log(dailyHours);
    console.log(target);

    if ( !dailyHours || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    if ( isNotNumberArray(dailyHours) || isNaN(Number(target)) ) {
        return res.status(400).send({ error: 'malformatted parameters' });    
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyHours, Number(target));
    res.send({ result });

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});