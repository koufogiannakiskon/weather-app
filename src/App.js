import React, { useState, useCallback, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./App.css";
import { Autocomplete } from "@mui/material";
import useStyles from "./utils/styles.js";
import { API_KEY_WEATHER, UNSPLASH_ACCESS_KEY, API_CITY } from "./utils/config";
import Header from "./Header.js";
import ErrorMessage from "./ErrorMessage.js";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [imageData, setImageData] = useState(
    "https://images.unsplash.com/photo-1576481230860-b782b3d5b36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODIxNjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTA4MjcxMzN8&ixlib=rb-4.0.3&q=80&w=1080"
  );
  const [location, setLocation] = useState("Athens");
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY_WEATHER}`
      );
      if (!response.ok) {
        throw new Error("City not found.");
      }
      const data = await response.json();

      // Fetch the city image URL
      const imageResponse = await fetch(
        `https://api.unsplash.com/photos/random?query=${location}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      if (!imageResponse.ok) {
        throw new Error("City image not found.");
      }
      const backgroundImage = await imageResponse.json();
      setImageData(backgroundImage.urls.regular);
      setWeatherData(data);
    } catch (error) {
      console.error(error.message);
      setWeatherData(null);
    }
  }, [location]);

  const fetchCitySuggestions = async (cityName) => {
    try {
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?q=${cityName}&maxRows=5&username=${API_CITY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch city suggestions");
      }
      const data = await response.json();
      setSuggestions(data.geonames.map((geoname) => geoname.name));
    } catch (error) {
      console.error(error.message);
      setSuggestions([]);
    }
  };

  const handleInputChange = (event, value) => {
    const inputValue = value;
    setLocation(inputValue);
    fetchCitySuggestions(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const inputRef = useRef(null);
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.pageBackground}
        style={imageData ? { backgroundImage: `url(${imageData})` } : {}}
      >
        <Box className={classes.root}>
          <Paper elevation={3} className={classes.paper}>
            <Header />
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <Autocomplete
                value={location}
                onInputChange={handleInputChange}
                id="city-suggestions"
                fullWidth
                options={suggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={suggestions.keys()}
                    label="Enter city name"
                    variant="outlined"
                    inputRef={inputRef}
                    className={classes.autocompleteTextfield}
                  />
                )}
              />

              <Button type="submit" variant="contained" color="primary">
                Get Weather
              </Button>
            </form>
          </Paper>
          {weatherData && (
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h5" gutterBottom>
                {weatherData.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {weatherData.weather[0].main}
              </Typography>
              <Typography variant="h2">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="weather_icon"
                />
              </Typography>
              <Typography variant="body1" gutterBottom>
                Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
              </Typography>
              <Typography variant="body1" gutterBottom>
                Humidity: {weatherData.main.humidity}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                Wind Speed: {weatherData.wind.speed} m/s
              </Typography>
            </Paper>
          )}
          {!weatherData && <ErrorMessage />}
        </Box>
      </Box>
    </>
  );
};

export default App;
