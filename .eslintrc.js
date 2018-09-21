module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "serviceworker": true 
  },
  "rules": {
    "object-curly-newline": 0,
    "import/extensions": 0,
    "react/prop-types": 0,
    "import/no-anonymous-default-export": 2
  },
  "settings": {
    "react": {
      "pragma": "h"
    }
  },
};
