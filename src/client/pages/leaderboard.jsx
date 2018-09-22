import { h, Component } from 'preact';
import Loading from '../partial/loading';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  componentDidMount() {
    fetch('/api/leaderboard').then(r => r.json()).then((data) => {
      const children = data.map(datum => (
        <div className="society row">
          <a href={datum.link} className="society-name">{datum.title}</a>
          <span className="society-members">{datum.members}</span>
        </div>
      ));
      this.setState({ children });
      console.log(data);
    });
  }

  render() {
    return (
      <div className="page">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">UPSU Society Member Count</span>
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
    );
  }
}

export default Leaderboard;
