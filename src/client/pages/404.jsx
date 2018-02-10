import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';

export default () => (
  <div className="fourohfour">
    <audio src="/public/lb2.mp3" autoPlay />
    <Card>
      <CardContent>
        <h1>404, Page not found!</h1>
        <p><Link to="/" href="#">Home</Link></p>
      </CardContent>
    </Card>
  </div>
);
