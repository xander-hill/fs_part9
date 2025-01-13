interface CoursePart {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map(course => (
                <p>{course.name} {course.exerciseCount}</p>
            ))}
        </div>
    );
}

export default Content