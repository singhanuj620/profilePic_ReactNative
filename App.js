import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
  style={{
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  }}>
    <Text
    style={{
      color :"red",
      fontSize : 30
    }}>
      Loading ...
    </Text>
  </View>
)

const App = () => {

  const [image, setImage] = useState(null)

  const takePicture = async (camera) => {
    try {
      const options = {
        quality: 0.9,
        base64 : false
      }
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camtext}> Here is your new DP !</Text>
          <Image 
            style={styles.clicked}
            source={{uri: image, width: "100%", height:"100%"}}
          />
          <Button 
            title="Click new DP"
            onPress={() => {
              setImage(null)
            }}
          />
        </View>
      ) : (
        <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions = {{
          title : "Permission to use camera",
          message : "Hello to this awesome person from Anuj",
          buttonPositive : "ALLOW NOW XD",
          buttonNegative : "Bhai ko mana kar rahe :("
        }}
        androidRecordAudioPermissionOptions = {{
          title : "Permission to use audio",
          message : "Hello to this awesome person from Anuj",
          buttonPositive : "ALLOW NOW audio XD",
          buttonNegative : "Bhai ko mana kar rahe :("
        }}
        >
          {({camera, status}) => {
            if(status !== 'READY') return <PendingView/>
            return (
              <View
               style={{
                 flex : 0,
                 flexDirection : "row",
                 justifyContent : "center"
               }}
              >
                <TouchableOpacity
                  onPress = {() => takePicture(camera)}
                  style={styles.capture}
                >
                  <Text>SNAP !!</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
      )}
    </View>
  )
}

export default App ;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : "column",
    backgroundColor: "#0A79DF"
  },
  preview :{
    flex : 1,
    justifyContent : "space-around",
    alignItems : "center"
  },
  capture : {
    flex : 0,
    backgroundColor : "orange",
    padding : 20,
    alignSelf : "center",
  },
  camtext : {
    backgroundColor : "#3498DB",
    color : "#FFF",
    marginBottom : 10,
    width : "100%",
    textAlign : "center",
    paddingVertical : 20,
    fontSize : 25
  },
  clicked : {
    width : 300,
    height : 300,
    borderRadius : 150
  }
})