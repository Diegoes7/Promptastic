import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: 'graphql/**/*.graphql', // Remove the leading slash
  generates: {
    './generated/graphql.tsx': {
      //! did not know how to use them so for time being just comment them
      // preset: 'client',
      // presetConfig: {
      //   fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      // },
      plugins: ["typescript", "typescript-operations", 'typescript-react-apollo'], // Add plugins if needed
    }
  }
};

export default config;