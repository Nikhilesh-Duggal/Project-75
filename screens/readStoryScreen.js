import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList, ToastAndroid, ScrollView } from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
    constructor(){
      super();
      this.state ={
        allStories:[],
        dataSource:[],
        search : ''
      }
    }
    componentDidMount(){
      this.retrieveStories()
    }
  
    updateSearch = search => {
      this.setState({ search });
    };
  
  
    retrieveStories=()=>{
      try {
        var allStories= []
        var stories = db.collection("Stories")
          .get().then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                // doc.data() is never undefined for query doc snapshots
                
                allStories.push(doc.data())
                console.log('this are the stories',allStories)
            })
            this.setState({allStories})
          })
      }
      catch (error) {
        console.log(error);
      }
    };
  
  
    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.state.allStories.filter((item)=> {
        //applying filter for the inserted text in search bar
        const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search: text,
      });
    }
  
      render(){
        return(
          <View style ={styles.container}>
                <Header 
                    backgroundColor = {'white'}
                    leftComponent={{ icon: 'menu', color: 'purple' }}
                    centerComponent = {{
                        text : 'Stories',
                        style : { color: 'purple', fontSize: 20}
                    }}
                    rightComponent={{ icon: 'home', color: 'purple' }}
                />
                <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>
          
          <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>  Title: {item.Title}</Text>
                    <Text>  Author : {item.Author}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                /> 
          
          
          
        </View>  
      );      
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  item: {
    backgroundColor: 'purple',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'purple',
    justifyContent:'center',
    alignSelf: 'center',
  }
});