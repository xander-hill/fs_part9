import { Part } from "../App"

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

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map(course => (
                <Part key={course.name} part={course} />
            ))}
        </div>
    );
}

export default Content