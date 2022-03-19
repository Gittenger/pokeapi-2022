# Simple Pokédex

This simple Pokédex is an online Pokémon index made possible through the use of the PokéAPI v2. The app is a front-end single page application making use of React to manage JavaScript.

## Features

The app includes a paginated home page indexing the original 151 Pokémon, with the ability to search by name or filter by type. The pagination will automatically update upon executing a search or applying a filter.

Also included is the ability to view and change several different pictures for the Pokémon, which updates the global state of the app.

## Architecture

The app uses a fairly standard setup of React, and I utilized Tailwind CSS for most styling. For finer grained styling I used CSS modules with PostCSS for post-processing. The React setup involves a custom webpack configuration without the use of a React scaffold such as Create React App.

For state management, I used features native to React, using React Hooks such as `useEffect`, `useReducer`, `useState`, and `useContext` to manage all application state at local and global levels.

Generally, when the app loads, a check is performed if the data required for rendering is available in local browser storage, and if not, it is at this point retrieved. Then it is saved to local storage, saved in React context and local state, and used to render the components.

Each Pokémon data object contains details which also contain URL's to other more detailed pages to get further details. These links are programmatically queried and the resulting data is likewise cached and displayed as needed.

In this way of caching data with browser storage, calls to the API are minimized and all rendering is done from local data once it is retrieved once. This greatly helps the app's performance.

## Misc

Any questions or concerns, feel free to reach out to me here on Github. I have done this project merely for fun and to work on my React skills. If anyone learns something from this app or finds it useful that's a bonus. Regards!
