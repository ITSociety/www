import { h, Component } from 'preact';
import cloneDeep from 'lodash/cloneDeep';

import { GradeBox, Rules, calculate } from '../partial/calc';

const yearMap = { year2: 'Second Year', year3: 'Third Year' };

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculated: { rule1: 40, rule2: 40, rule3: 40 },
      years: {
        year2: {
          units: [
            { name: 'DSALG', credits: 20, grade: 40 },
            { name: 'MATHFUN', credits: 20, grade: 40 },
            { name: 'ADPROC', credits: 20, grade: 40 },
            { name: 'INSE', credits: 20, grade: 40 },
            { name: 'COSINE', credits: 20, grade: 40 },
            { name: 'Optional Unit 1', credits: 20, grade: 40 },
          ],
        },
        year3: {
          units: [
            { name: 'PJE', credits: 40, grade: 40 },
            { name: 'THEOCS', credits: 20, grade: 40 },
            { name: 'DISPARP', credits: 20, grade: 40 },
            { name: 'Optional Unit 1', credits: 20, grade: 40 },
            { name: 'Optional Unit 2', credits: 20, grade: 40 },
          ],
        },
      },
    };
  }

  addUnit(year) {
    const newState = cloneDeep(this.state);
    newState.years[year].units.push({ name: 'New Unit', credits: 20, grade: 40 });
    newState.calculated = calculate(newState.years);
    this.setState(newState);
  }

  removeUnit(year, index) {
    const newState = cloneDeep(this.state);
    if (index > -1) newState.years[year].units.splice(index, 1);
    this.setState(newState);
  }

  changeUnit(index, year, cName) {
    // hack
    const elems = document.querySelectorAll(`.${cName}`);
    const [name, grade, credits] = [...elems].map(elem => elem.value);
    const newState = cloneDeep(this.state);
    newState.years[year].units[index] = { name, grade, credits };
    newState.calculated = calculate(newState.years);
    this.setState(newState);
  }

  changeGrade(index, year, cName) {
    // :stophack:
    const elems = document.querySelectorAll(`.${cName}`);
    const [name, rawGr, rawCr] = [...elems].map(elem => elem.value);
    const [grade, credits] = [rawGr, rawCr].map(val => parseInt(val, 10));
    const newState = cloneDeep(this.state);
    newState.years[year].units[index] = { name, grade, credits };
    newState.calculated = calculate(newState.years);
    this.setState(newState);
    // this.props.changeGrade(index, grade, credits, year);
  }

  render() {
    const yearInputs = Object.keys(this.state.years).map((year) => {
    // generate table
      const mappedUnits = this.state.years[year].units.map((unit, idx) => {
        const { name, credits, grade } = unit;
        const className = `${year}${idx}${name.replace(/ /g, '')}`;
        const onBlur = () => this.changeUnit(idx, year, className);
        const onKeyUp = () => this.changeGrade(idx, year, className);
        /* disable eslint here because the index is not arbitrary
           and two entries could be the same */
        /* eslint-disable react/no-array-index-key */
        return (
          <div key={year + name + idx} className="row unit">
            <div className="col s6">
              <input
                type="text"
                className={`form-control name ${className}`}
                defaultValue={name}
                onBlur={onBlur}
              />
            </div>
            <div className="col s3">
              <input
                type="text"
                className={`form-control grade ${className}`}
                defaultValue={grade}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
              />
            </div>
            <div className="col s2">
              <input
                type="text"
                className={`form-control credits ${className}`}
                defaultValue={credits}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
              />
            </div>
            <a href="#!" className="btn col s1 no-padding" onClick={() => this.removeUnit(year, idx)}>
              <i className="material-icons">clear</i>
            </a>
          </div>
        );
      });

      // generate table containers
      return (
        <div key={year} className="col m12 l6">
          <div className="card">
            <div className="card-content">
              <div className="card-title">{yearMap[year]}</div>
              <div className="row">
                <div className="col s6">Unit</div>
                <div className="col s3">Grade</div>
                <div className="col s3">Credits</div>
              </div>
              {mappedUnits}
              <a href="#!" className="btn" onClick={() => this.addUnit(year)}>Add a Unit</a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="gutter page">
        <div className="row">
          <GradeBox {...this.state} />
        </div>
        <div className="row">
          {yearInputs}
        </div>
        <div className="row">
          <Rules />
        </div>
      </div>
    );
  }
}

export default Calculator;
