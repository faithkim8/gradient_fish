# Providence Weather Gradient

A web application that displays real-time weather information for Providence, Rhode Island, with a dynamic color gradient background that changes based on current weather conditions.

## Features

- **Dynamic Background**: Color gradient that shifts based on temperature, weather conditions (rain, snow, clouds), and wind speed
- **Interactive Fish Animation**: Various fish that swim across the screen and change when they hit the edges
- **Live Weather Data**: Shows current temperature, wind speed, cloud coverage, and sea level pressure for Providence, RI
- **Responsive Design**: Adapts to different screen sizes

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- API: OpenWeatherMap API

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/providence-weather-gradient.git
   cd providence-weather-gradient
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
providence-weather-gradient/
├── public/                  # Static files
│   ├── images/              # Fish images
│   ├── index.html           # Main HTML file
│   ├── styles.css           # CSS styles
│   └── script.js            # Frontend JavaScript
├── server/                  # Backend code
│   └── server.js            # Express server
├── .env                     # Environment variables (not tracked by git)
├── .gitignore               # Git ignore file
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## License

MIT

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- coded with Claude.AI