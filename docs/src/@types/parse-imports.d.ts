declare module 'parse-imports' {
  type ModuleSpecifier =
    | 'invalid'
    | 'absolute'
    | 'relative'
    | 'builtin'
    | 'package'
    | 'unknown';

  interface Import {
    isDynamicImport: boolean;
    moduleSpecifier: {
      type: ModuleSpecifier;
      isConstant: boolean;
      code: string;
      value?: string;
      resolved?: string;
    };
    importClause?: {
      default?: string;
      namespace?: string;
      named: { specifier: string; binding: string }[];
    };
  }

  function parseImports(code: string): Promise<Import[]>;

  export = parseImports;
}
