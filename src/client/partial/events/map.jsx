import { h, Component } from 'preact';
import loadjs from 'loadjs';

import mapStyle from './mapstyle';

class GMap extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
    this.apiKey = 'AIzaSyDyRNyhR1bMEfZ8HHtl3mJKBk9CG9RFqWw';
    this.mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`;
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadjs(this.mapsUrl);
  }

  /* eslint-disable */
  initMap() {
    const { location } = this;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: location,
      styles: mapStyle,
      disableDefaultUI: true,      
    });
    const marker = new google.maps.Marker({
      position: location,
      map,
    });
  }
  /* eslint-enable */


  render() {
    return (
      <div className="map-container">
        <div id="map" />
      </div>
    );
  }
}

export default GMap;
