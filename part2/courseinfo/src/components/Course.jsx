const Total = ({ parts }) => {
  const total = parts.reduce((s, c) => s + c.exercises, 0);
  return <b>total of {total} exercises</b>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
