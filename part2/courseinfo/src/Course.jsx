const Course = ({ course }) => {
    const { name, parts } = course
    console.log("The Name: ", name, "The parts: ", parts);
  
    return (
      <>
        <Header name={name} />
        <Content parts={parts} />
        <b>Total of {parts.map(part => part.exercises).reduce((a, p) => a + p, 0)} exercises</b>
      </>
    )
  }
  
  const Header = ({ name }) => {
    console.log("Header", name);
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({ parts }) => {
    console.log("Contents parts ", parts);
    return (
      <>
        {parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
      </>
    )
  }
  export default Course