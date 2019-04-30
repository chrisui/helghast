const {tsquery} = require('@phenomnomnominal/tsquery');
const ts = require('typescript');

function filterFunctionalModules(name) {
  // for now just assume anything local is a functional reloadable module
  return name.startsWith('.');
}

module.exports = function(program) {
  return function(context) {
    return function(node) {
      // if this module is already handling hot module reloading then we wont do anything
      if (
        tsquery(node, 'IfStatement:has([name="module"]):has([name="hot"])')
          .length
      ) {
        return node;
      }

      const imports = tsquery(node, 'ImportDeclaration');
      const basicReloadableImports = imports
        .map(importStatement => importStatement.moduleSpecifier.text)
        .filter(filterFunctionalModules);

      if (basicReloadableImports.length > 0) {
        const reload = ts.createIf(
          ts.createPropertyAccess(
            ts.createIdentifier('module'),
            ts.createIdentifier('hot'),
          ),
          ts.createStatement(
            ts.createCall(
              ts.createPropertyAccess(
                ts.createPropertyAccess(
                  ts.createIdentifier('module'),
                  ts.createIdentifier('hot'),
                ),
                ts.createIdentifier('accept'),
              ),
              undefined,
              [
                ts.createArrayLiteral(
                  basicReloadableImports.map(path =>
                    ts.createStringLiteral(path),
                  ),
                ),
              ],
            ),
          ),
        );

        return ts.updateSourceFileNode(node, [...node.statements, reload]);
      }
      return node;
    };
  };
};
