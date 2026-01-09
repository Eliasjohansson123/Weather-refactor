# Weather-refactor

# Team Sundsvall Weather Application

## Overview

This is a fronend weather website where users can search for a city and view current weather condition, and a 6-day forecast. It provides a dropdown with city suggestions, and has a history list with the last 4 searches. Weather and location data is fetched from the Open-Meteo weather and geocoding APIs.

## Features

- Search for cities by name
- Display current weather conditions
- Show multi-day weather forecast
- Automatically Save the last four searches and display them in a clickable history list

## Teach / Tools Used

- HTML
- CSS
- JavaScript (ES6)
- Fetch API
- Open-Meteo Weather API
- Open-Meteo Geocoding API

## How to Run

- Open the project folder in your code editor
- Start a local server
- Open `index.html` in the browser

## How to Use

- Type a city name into the input field
- While typing, a dropdown list with city suggestions will appear
- Select a city by clicking on a suggestion, or by using the keyboard (Tab + Enter)
- Pressing Enter without selecting a suggestion will choose the first item in the dropdown
- The current weather and a 6-day forecast will be displayed

## Testing

The application has been tested using both manual testing and unit tests.

### Manual Testing

- Search for different cities and check that the weather updates as expected
- Make sure the dropdown suggestions appear while typing
- Select a city by clicking a suggestion or pressing Enter
- Verify that the last four searches are saved and can be clicked again

### Unit Testing

- Jest is used to test small, isolated helper functions
- The `debounce` function is tested to make sure it delays function execution correctly
- The `handleText` function is tested to ensure it returns the input string as expected

## Project Structure

- `css/` – Application styling
- `html/` – HTML files
- `js/` – JavaScript source code
  - `classes/` – Core classes for data handling and UI
  - `functions/` – UI-related and utility functions
  - `services/` – API logic and data helpers
  - `main.js` – Application entry point
- `images/` – Static assets
- `README.md` – Project documentation

## API / Data Sources

- **Open-Meteo Geocoding API**  
  Used to search for cities based on user input and retrieve location data such as latitude and longitude.

- **Open-Meteo Weather API**  
  Used to fetch current weather conditions and a 6-day weather forecast based on geographic coordinates.

## Known Issues / Limitations

- The application does not automatically detect the user’s location
- On initial load, the app displays weather data for a default city (Sundsvall)
- The project is not deployed and must be run locally

## Future Improvements

- Add automatic location detection to show weather data based on the user’s current location
- Deploy the application online so it can be accessed without running it locally
- Improve error handling and user feedback when API requests fail

## Credits

- Weather and geocoding data provided by the Open-Meteo API
- Project developed as part of a school assignment
