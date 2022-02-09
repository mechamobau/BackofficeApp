/**
 * Função responsável por disparar rotinas de linting para arquivos
 * em staging
 *
 * @param {string[]} allFiles Arquivos em staged que correspondem ao glob.
 */
const dynamicCommands = allFiles => {
  const allFilesPath = allFiles.join(' ');

  return [`eslint ${allFilesPath} --fix`, `prettier ${allFilesPath} --write`];
};

module.exports = {
  'src/**/*.{ts,tsx}': dynamicCommands,
};
