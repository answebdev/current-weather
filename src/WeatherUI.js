import React, { Fragment, useState } from 'react';

// The toLocaleTimeString() method returns the time portion of a Date object as a string, using locale conventions.

function WeatherUI(props) {
  const { data } = props;
  const iconurl =
    'https://openweathermap.org/img/w/' +
    `${data.cod !== 404 ? data.weather[0].icon : null}` +
    '.png';

  const [fahr, setFahr] = useState('');
  const [cel, setCel] = useState('');

  const celFahr = () => {
    setFahr(Math.floor((data.main.temp - 273.15) * 9) / 5 + 32 + '°F');
    setCel('');
  };

  const fahrCel = () => {
    setCel(Math.floor(data.main.temp - 273.15) + '°C');
    setFahr('');
  };

  return (
    <div>
      {data.cod !== 404 ? (
        <Fragment>
          <div>
            <span>
              {data.name}, {data.sys.country}
            </span>
            {/* Use Regex and replace to strip the seconds from that string: */}
            <span>
              As of {new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}
            </span>
            <h1>{Math.floor(data.main.temp - 273.15)}&deg;C</h1>
            <button onClick={celFahr}>&deg;F</button>
            <button onClick={fahrCel}>&deg;C</button>
            <span>{fahr}</span>
            <span>{cel}</span>

            <span style={{ textTransform: 'capitalize' }}>
              {data.weather[0].main}
            </span>
            <img src={iconurl} alt='' srcset='' />
            <span style={{ textTransform: 'capitalize' }}>
              {data.weather[0].description}
            </span>
          </div>
          <div>
            <div>
              <table>
                <tr>
                  <td>
                    <h4>High/Low</h4>
                  </td>
                  <td>
                    <span>
                      {Math.floor(data.main.temp_max - 273.15)}&deg;/
                      {Math.floor(data.main.temp_min - 273.15)}&deg;
                    </span>
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <h4>Humidity</h4>
                  </td>
                  <td>
                    <span>{data.main.humidity} %</span>
                  </td>
                </tr> */}
                {/* <tr>
                  <td>
                    <h4>Pressure</h4>
                  </td>
                  <td>
                    <span>{data.main.pressure} hPa</span>
                  </td>
                </tr> */}
                {/* <tr>
                  <td>
                    <h4>Visibility</h4>
                  </td>
                  <td>
                    <span>{data.visibility / 1000} Km</span>
                  </td>
                </tr> */}
              </table>
            </div>

            <div>
              <table>
                {/* <tr>
                  <td>
                    <h4>Wind</h4>
                  </td>
                  <td>
                    <span>{Math.floor((data.wind.speed * 18) / 5)} km/hr</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Wind Direction</h4>
                  </td>
                  <td>
                    <span>
                      {data.wind.deg}
                      <sup>o</sup> deg
                    </span>
                  </td>
                </tr> */}
                <tr>
                  <td>
                    <h4>Sunrise</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(data.sys.sunrise * 1000)
                        .toLocaleTimeString()
                        .replace(/:\d+ /, ' ')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Sunset</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(data.sys.sunset * 1000)
                        .toLocaleTimeString()
                        .replace(/:\d+ /, ' ')}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className='maincard'>
          <h2>{data.message}</h2>
        </div>
      )}
    </div>
  );
}

export default WeatherUI;
