import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View
} from 'react-native';
import Forecast from './Forecast.js';
var secrets = require('./secrets.json');

class WeatherProject extends Component {
  constructor() {
    super();
    this.state = {
      zip: '',
      search: '',
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 0.0
      },
    };
  }

  _handleTextChange(event) {
    zip = event.nativeEvent.text;
    this.setState({ zip: zip });
    fetch('http://api.openweathermap.org/data/2.5/weather?q='
      + zip + '&appid=' + secrets.weather_api_id + '&units=metric')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        forecast: {
          main: responseJSON.weather[0].main,
          description: responseJSON.weather[0].description,
          temp: responseJSON.main.temp
        }
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render() {
    var content = null;
    if (this.state.forecast !== null) {
      content = <Forecast
                 main={this.state.forecast.main}
                 description={this.state.forecast.description}
                 temp={this.state.forecast.temp}/>;
    }
    return (
      <View style={styles.container}>
        <Image source={require('image!background')}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType='go'
                  onChangeText={(search) => this.setState({ search: search })}
                  onSubmitEditing={this._handleTextChange.bind(this)}
                  value={this.state.search}/>
              </View>
            </View>
            { content }
          </View>
        </Image>
      </View>
    );
  }
}

var baseFontSize = 16;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
    width: 360,
    height: 400,
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10,
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  zipCode: {
    width: 200,
    height: 40,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

module.exports = WeatherProject;
