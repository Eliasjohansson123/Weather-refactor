const codeMap = {
  sun: [0],

  cloudy: [1, 2, 3],

  foggy: [45, 48],

  rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],

  snow: [71, 73, 75, 77, 85, 86],

  lightning: [95, 96, 99],
};

function getWeatherClass(code) {
  for (const [className, codes] of Object.entries(codeMap)) {
    if (codes.includes(code)) {
      return className;
    }
  }
}

export function setWeatherBackground(weatherCode) {
  const body = document.body;
  const weatherClass = getWeatherClass(weatherCode);

  const allClasses = ['sun', 'cloudy', 'foggy', 'rain', 'snow', 'lightning'];

  body.classList.remove(...allClasses);
  body.classList.add(weatherClass);
}
