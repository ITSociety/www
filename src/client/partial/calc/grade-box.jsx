import { h } from 'preact';

const GradeError = () => (
  <div className="card-body">
    <h5 className="card-title">Error</h5>
    <h6>You must toal 120 credits per year!</h6>
  </div>
);

const Grades = ({ rule1, rule2, rule3 }) => (
  <div className="card-body">
    <h5 className="card-title">Calculated Grades: </h5>
    <h6>Rule 1: {rule1}</h6>
    <h6>Rule 2: {rule2}</h6>
    <h6>Rule 3: {rule3}</h6>
  </div>
);

const GradeBox = (props) => {
  console.log(props);
  const { err } = props.calculated;
  const inner = err ? <GradeError /> : <Grades {...props.calculated} />;

  return (
    <div className="col s7">
      <div className="card" >
        <div className="card-content">
          {inner}
        </div>
      </div>
    </div>
  );
};

export default GradeBox;

