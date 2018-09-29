import { h, Component } from 'preact';
import throttle from 'lodash/throttle';

import Loading from '../partial/loading';


function doSearch(ev) {
  const query = ev.target.value.toLowerCase();
  const rows = [...document.getElementsByTagName('tr')];
  rows
    .map(row => row.classList.add('hide'));
  rows
    .filter((row) => {
      console.log(row);
      console.log(row.innerHTML.toLowerCase().includes(query));
      return row.innerHTML.toLowerCase().includes(query);
    })
    .map(row => row.classList.remove('hide'));
}


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  componentDidMount() {
    fetch('/api/leaderboard').then(r => r.json()).then((data) => {
      const inner = data.map(datum => (
        <tr className="society row">
          <td href={datum.link} className="society-name">{datum.title}</td>
          <td className="society-members">{datum.members}</td>
        </tr>
      ));
      const children = (
        <table className="striped responsive-table">
          <thead>
            <th>Society</th>
            <th>Member Count</th>
          </thead>
          <tbody>{inner}</tbody>
        </table>
      );
      this.setState({ children });
    });
  }

  render() {
    return (
      <div className="page">
        <div className="gutter">
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">UPSU Society Member Count</span>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="search" type="text" className="validate" onKeyUp={doSearch} />
                      <label htmlFor="search" className="active">Search</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      {this.state.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
