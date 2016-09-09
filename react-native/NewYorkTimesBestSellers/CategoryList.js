'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  RecyclerViewBackedScrollView,
  ListView,
  TouchableHighlight,
  BackAndroid,
  Navigator
} from 'react-native';

import BookList from './BookList';
import { loadCategories } from './app-data';

class CategoryList extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this.navigator = false;

    // Enable back button for android
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (!this.navigator || this.navigator.getCurrentRoutes().length === 1  ) {
        return false;
      }
      this.navigator.pop();
      return true;
    });
  }

  componentDidMount() {
    loadCategories().then((resp) => resp.json()).then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.results)
      });
    }).catch((reason) => console.log(reason));
  }

  onCategoryPress(listNameEncoded, event) {
    this.navigator.push({
      title: 'A category',
      id: 'category',
      listNameEncoded: listNameEncoded
    });
  }

  _renderRow(rowData) {
    return (
      <View style={styles.sectionDivider}>
        <TouchableHighlight
          onPress={this.onCategoryPress.bind(this, rowData.list_name_encoded)}>
          <Text style={styles.categoryTitle}>{rowData.display_name}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.sectionDivider}>
        <Text style={styles.headingText}>
          Choose a category
        </Text>
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.sectionDivider}>
        <Text>Data from the New York Times Best Seller list.</Text>
      </View>
    );
  }

  _renderScene(route, navigator) {
    this.navigator = navigator;
    if (route.id === 'category_list') {
      return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          enableEmptySections />
      );
    }

    if (route.id == 'category') {
      return (
        <BookList listNameEncoded={route.listNameEncoded} />
      );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Category list', index: 0, id: 'category_list' }}
        renderScene={this._renderScene.bind(this)}/>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 24
  },
  list: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: '#EEEEEE',
    alignItems: 'center'
  },
  headingText: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center'
  },
  categoryTitle: {
    fontSize: 18,
    height: 25,
  }
});

module.exports = CategoryList;
