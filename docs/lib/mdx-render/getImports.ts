import parseImports from 'parse-imports';

const REGEX = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

export async function getImports(component: string): Promise<string[]> {
  const matchArray: string[] = [];
  const match = matchArray.concat(component.match(REGEX)).filter(Boolean);

  const code = match.join('\n\n');

  const importsGenerator = await parseImports(code);
  const imports = [...importsGenerator];

  return imports.flatMap(({ isDynamicImport, importClause }) => {
    const myImports: string[] = [];

    if (isDynamicImport) {
      return myImports;
    }

    const { named, namespace, default: defaultImport } = importClause;

    myImports.push(...[defaultImport, namespace].filter(Boolean));
    myImports.push(...named.map(({ binding }) => binding));

    return myImports;
  });
}
