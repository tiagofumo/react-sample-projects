'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

class BookItem extends Component {
  static propTypes = {
    coverURL: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bookItem}>
        <Image style={styles.cover} source={{uri: this.props.coverURL}}/>
        <View style={styles.info}>
          <Text style={styles.author}>{this.props.author}</Text>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  bookItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    padding: 5,
    height: 160
  },
  cover: {
    flex: 1,
    height: 150,
    resizeMode: 'contain'
  },
  info: {
    flex: 3,
    alignItems: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 20
  },
  author: {
    fontSize: 18
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

module.exports = BookItem;
