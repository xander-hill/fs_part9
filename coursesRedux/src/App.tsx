import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartReqs extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartReqs;

interface PartProps {
  part: CoursePart;
}

export const Part = (props: PartProps) => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div>
            <h4>{props.part.name} {props.part.exerciseCount}</h4>
            {props.part.description}
          </div>
        )
      case "group":
        return (
          <div>
            <h4>{props.part.name} {props.part.exerciseCount}</h4>
            project exercises {props.part.groupProjectCount}
          </div>
        )
      case "background":
        return (
          <div>
            <h4>{props.part.name} {props.part.exerciseCount}</h4>
            submit to {props.part.backgroundMaterial}
          </div>
        )
      case "special":
        return (
          <div>
            <h4>{props.part.name} {props.part.exerciseCount}</h4>
            {props.part.description}
            <ul>
              required skills:
              {props.part.requirements.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )
      default:
        return assertNever(props.part);
    }
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
