module.exports = {
  extends: ['./node_modules/commitlint-config-gitmoji'],
  rules: {
    'subject-case': [
      2,
      'never',
      ['upper-case', 'pascal-case', 'start-case', 'sentence-case'],
    ],
  },
};
