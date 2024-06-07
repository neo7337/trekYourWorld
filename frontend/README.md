# trekYourWorld - Development

## Project Structure

```graphql
├── src/
│   ├── atoms/                   # Jotai atoms
│   ├── assets/                  # Images, fonts, and other static assets
|   ├── common/
│   ├── components/              # Reusable components
│   ├── containers/              # Higher-level components that manage state and logic
│   ├── pages/                   # Top-level page components
│   ├── services/                # API and data services
│   ├── utils/                   # Utility functions
│   ├── styles/                  # Global styles and CSS modules
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Entry point for the application
│   └── ...                      # Other configuration files, tests, etc.
```

## Dev Guidelines

1. Refer to the Project Structure while creating any new components.
2. As this is a full typescript based project, please refer to
   the [Do's and Dont's](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
3. We are using strict Typescript, so make sure to make all the components as `.tsx`
4. Follow the [Guidelines](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) provided
   for `React + Typescript`.
5. `Types or Interfaces` - Go through the links in order to better chose while implementing the components
    * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#types-or-interfaces
    * https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
6. Always use absolute imports such as `@/styles/style.css`. In case of any new alias to be configured, refer to
   the `tsconfig.json` and configure the alias for the imports.
    ```json
    {
        "compilerOptions": {
            # Other options
            ...,
            "paths": {
                # your new paths alias
                "@components/*": [
                    "src/components/*"
                ]
            },
            ...
        }
    }
    ```
   and update the `vite.config.ts` to configure the alias like below (This is used for the build phase)
    ```js
    alias({
      entries: [
        { find: '@components', replacement: path.resolve(__dirname, './src/components') },
        { find: '@common', replacement: path.resolve(__dirname, './src/common') },
        { find: '@atoms', replacement: path.resolve(__dirname, './src/atoms') },
        { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
        { find: '@wailsjs', replacement: path.resolve(__dirname, './wailsjs') },
        // ... other entries
      ],
    }),
    ```
