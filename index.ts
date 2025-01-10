import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});