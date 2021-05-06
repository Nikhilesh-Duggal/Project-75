import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class WriteStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            story: ''
        }
    }

    submitStory = async () =>{
        var title=this.state.title
        var author=this.state.author
        var story=this.state.story

        if(title && author && story){
            db.collection("stories").add({
                'title' : this.state.title,
                'author': this.state.author,
                'story': this.state.story
            })
            

            this.setState({
                title: '',
                author: '',
                story: ''
            })
        }   else if(!title && !author && !story){
            ToastAndroid.show("Please fill all the entries",ToastAndroid.SHORT)
        }   else if(!title && !author){
        ToastAndroid.show("Please type the title and author",ToastAndroid.SHORT)
        }   else if(!story && !title){
            ToastAndroid.show("Please type the story and title",ToastAndroid.SHORT)
        }   else if(!author && !story){
            ToastAndroid.show("Please type the author and story",ToastAndroid.SHORT)
        }   else if(!title){
            ToastAndroid.show("Please type the title",ToastAndroid.SHORT)
        }   else if(!author){
            ToastAndroid.show("Please type the author",ToastAndroid.SHORT)
        }   else if(!story){
            ToastAndroid.show("Please type the story",ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style = {styles.container} behavior = "height" enabled>
                <Header
                    backgroundColor={'#f38181'}
                    centerComponent={{
                    text: 'Create Your Own Story!',
                    style: { color: '#fff', fontSize: 24,width:500,alignItems:"center" },
                }}
                containerStyle={{
                    marginBottom: 20
                }}
            />
                <TextInput
                style = {styles.inputBox}
                placeholder = "Title of the story"
                backgroundColor= "#fce38a"
                color = "#236655"
                value = {this.state.title}
                onChangeText={title => {
                    this.setState({
                        title: title
                    }); }}/>
                <TextInput
                style = {styles.inputBox}
                placeholder = "Author"
                backgroundColor= "#56FEA5" color = "#2B8053"
                value = {this.state.author}
                onChangeText={author => {
                    this.setState({
                        author: author
                    }); }}/>
                <TextInput
                style = {styles.multilineBox}
                placeholder = "Write the story here..."
                multiline = {true}
                value = {this.state.story}
                onChangeText={story => {
                    this.setState({
                        story: story
                    }); }}/>

                <TouchableOpacity
                style = {styles.button}
                onPress={async()=>{
                    await this.submitStory();
                }}><Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4EB9E6'
    },
    inputBox:{
        width: 350,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 30,
        textAlign: 'center'
    },
    multilineBox: {
        width: 350,
        height: 300,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 30,
        textAlign: 'center',
        backgroundColor: '#62F7FC',
        color: '#317A7D'
    },
    button: {
        backgroundColor: '#AEFAFD',
        marginTop: 15,
        width: 150,
        height: 50,
        alignSelf: 'center'
    },
    buttonText:{
        fontSize: 15,
        alignSelf: 'center',
        margin: 15,
        color: '#317A7D'
    },
})