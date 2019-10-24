
import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-picker'
import { throwStatement, file } from '@babel/types';
import RNFetchBlob from 'react-native-fetch-blob'


var options = {
  title: 'Resim Seçiniz',
  customButtons: [
    //  { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resimadresi: null,
    }
  }

  GetMethod() {
    //ref('here your path')
    firebase.database().ref('users').once('value', (data) => {
      console.log(data.toJSON())
    })
  }
  InsertMethod() {
    firebase.database().ref('users/003').set(
      {
        name: 'Samed Karakuş',
        age: '19',
        gitgubadress: 'karakusnavy'
      }
    ).then(() => {
      console.log('Inserted.')
    }).catch((error) => {
      console.log(error)
    })
  }
  UpdateMethod() {
    firebase.database().ref('users/005').update({
      name: 'Samed Karakuş'
    }).then(() => {
      console.log('Updated')
    })
  }
  DeleteMethod() {
    firebase.database().ref('users/005').remove();
  }
  LiveGetMethod() {
      // Bu bölüm de veritabanından veri çektikten sonra
      // veritabanında bir güncelleme olursa buda güncellenir. 
      // dikkat edersen get example 'da .once kullandık bunda .on
      firebase.database().ref('users').on('value', (data) => {
        console.log(data.toJSON())
      })
      // test etmek için timer ile 5 saniye sonra bir veri ekliyorum görebil diye.
      setTimeout(() => {
        firebase.database().ref('users/005').set(
          {
            name: 'Samed Karakuş',
            age: '19',
            gitgubadress: 'karakusnavy'
          }
        ).then(() => {
          console.log('Inserted.')
        }).catch((error) => {
          console.log(error)
        })
      }, 5000)
  }
  SelectImage() {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          resimadresi: response.uri
        })
        //let image_uri = response.uri;      
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text>Welcome to Firebase Tutorial !</Text>
          <Text style={{ fontSize: 10 }} >v0.1 by @karakusnavy</Text>
          <View style={{ padding: 5, backgroundColor: '#c8e0de', borderRadius: 5, marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>React Native Firebase Methods</Text>            
            <TouchableOpacity onPress={()=>this.GetMethod()} style={styles.button2} >
              <Text>Get Method</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.InsertMethod()} style={styles.button2} >
              <Text>Insert Method</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.UpdateMethod()} style={styles.button2} >
              <Text>Update Method</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.DeleteMethod()} style={styles.button2} >
              <Text>Delete Method</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.LiveGetMethod()} style={styles.button2} >
              <Text>Live Get Method</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'black' }}
          source={{ uri: this.state.resimadresi }}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.SelectImage()} >
          <Text style={styles.buttonText} >Click for select a image</Text>
        </TouchableOpacity>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7
  },
  button: {
    backgroundColor: 'black',
    padding: 7,
    borderRadius: 5,
    marginTop: 10
  },
  button2: {
    backgroundColor: '#94a8a7',
    padding: 5,
    borderRadius: 5,
    marginTop: 5
  },
  buttonText: {
    color: 'white'
  }
});

