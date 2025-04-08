# Netflix Clone App

This is a Netflix clone built using **ShadCN** and **TypeScript** with **MongoDB** at backend. It replicates the core functionalities of Netflix, including user authentication (Login/Signup), displaying various shows, a watchlist, and show details. The app is designed to provide a seamless streaming-like experience with a modern and intuitive UI.

## Features

- **Login/Signup**: Users can log in or sign up to access personalized content.
- **Home Page**: Displays featured shows, movies, and trailers.
- **All Shows**: A section listing all available shows and movies.
- **Watchlist**: Users can add shows to their watchlist for later viewing.
- **Show Details**: A detailed page for each show with descriptions, ratings, and more.
- **Skeleton Loading Screens**: Implemented skeleton screens for smooth transitions while content is loading.

## Backend

The backend of the Netflix clone utilizes **Node.js** and **Express** to handle user authentication, data fetching, and management of shows, watchlists, and user profiles. Here's a breakdown:

- **User Authentication**: 
  - The backend uses **JWT (JSON Web Tokens)** for secure authentication, where users can sign up, log in, and maintain sessions.
  - Passwords are hashed using **bcrypt** for security.
- **Database**: 
  - A **MongoDB** database stores user data, watchlists, and show details. This ensures that user preferences and watchlist items are persistent.
- **API**: 
  - RESTful APIs are created using **Express** to fetch show details, search for shows, update watchlists, and handle user operations.
  - The API supports fetching show data, including trailers, ratings, descriptions, and other relevant show details.
- **Data Fetching**: 
  - Data is fetched from an external source (e.g., a movie database API or custom backend) and displayed on the frontend. This ensures that the latest shows and trailers are always available.

## Frontend

The frontend is built using **ShadCN** for the design system and **TypeScript** for type-safe code. Here's a breakdown:

- **Login/Signup**: 
  - The user interface is designed for easy access to login and signup. The form validation ensures that users input valid data.
- **Home Page**: 
  - The homepage displays featured shows, movies, and trailers with a modern UI. 
  - It dynamically fetches data from the backend, and skeleton loading screens are used to provide a smooth experience while data loads.
- **All Shows Page**: 
  - A page displaying all available shows and movies, sorted by different genres or categories. Users can browse through various categories like "Popular," "New Releases," and "Top Rated."
- **Watchlist**: 
  - Users can add shows to their watchlist for future viewing. The watchlist is persisted across sessions using backend APIs.
- **Show Details**: 
  - Each show has its own detailed page with a description, ratings, cast, and a trailer that plays in full screen.
- **Skeleton Loading Screens**: 
  - Implemented skeleton screens to enhance the user experience by showing placeholders while data is being fetched.

## Technologies Used:

- **Frontend**: ShadCN (UI components), TypeScript, React
- **Backend**: Node.js, Express, MongoDB, JWT
- **Authentication**: JWT (JSON Web Tokens), bcrypt


## Screenshots

Here are some screenshots of the app in action:

- **Login Page**: ![Login Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/login.png)
- **Signup Page**: ![Signup Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/signup.png)
- **Home Page**: ![Home Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/home.png)
- **Home Page extended**: ![Home Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/home2.png)
- **Home Skeleton Loading**: ![Home Skeleton Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/Homeskeleton.png)
- **All Shows Page**: ![All Shows Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/allshows.png)
- **Watchlist**: ![Watchlist Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/watchlist.png)
- **Show Details**: ![Show Details Screenshot](https://github.com/Swapnaroop2001/Netflix-Clone/blob/main/frontend/src/assets/showDetails.png)


