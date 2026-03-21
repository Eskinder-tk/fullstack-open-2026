const Header = (props) => <h2>{props.courses}</h2>

const Content = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
    <Part part={props.parts[3]} />
  </div>
)

const Content2 = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const Total = (props) => <h4>Total of {props.total} exercises</h4>


const Course = ({courses}) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            <Header courses={courses[0].name} />
            <Content parts={courses[0].parts} />
            <Total total = { courses[0].parts.reduce((r , s) => r + s.exercises , 0)} />

            <Header courses={courses[1].name} />
            <Content2 parts={courses[1].parts} />
            <Total total = { courses[1].parts.reduce((r , s) => r + s.exercises , 0)} />
        </div>
    )
}
 export default Course