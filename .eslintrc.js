module.exports = {
  extends: "airbnb",
  rules: {
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true }
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "as-needed"],
    "import/prefer-default-export": 0,
    "react/forbid-prop-types": 0,
    "react/no-find-dom-node": 0,
    "import/extensions": 0,
    "react/prop-types": 0,
    "no-console": 1,
    "no-debugger": 0
  },
  env: {
    browser: true,
    node: true
  }
};
