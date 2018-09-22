import { h } from 'preact';

const rules = [
  {
    ruleNo: 1,
    rule: 'The  classification  of  the  weighted  mean  of  all  relevant  credits at  Level  5  and  all relevant credits at Level 6 in the ratio of 40:60 respectively after first discounting the marks in the worst 20 credits both at Level 5 and at Level 6',
  },
  {
    ruleNo: 2,
    rule: 'the  classification  of  the  weighted  mean  of  all  relevant  credits  at  Level  6 after  first discounting the marks in the worst 20 credits at Level 6',
  },
  {
    ruleNo: 3,
    rule: 'The minimum classification in which more than 50% of the combined relevant credits at Level 5 and Level 6 were attained after first discounting the marks in the worst 20 credits both at Level 5 and at Level 6',
  },
];

const Rules = () => (
  <div className="col s12">
    {rules.map(({ rule, ruleNo }) => (
      <div key={ruleNo} className="rule card">
        <div className="card-body">
          <div className="card-content">
            <span className="card-title">{`Rule: ${ruleNo}`}</span>
            {rule}
          </div>
        </div>
      </div>
))}
  </div>
);

export default Rules;
