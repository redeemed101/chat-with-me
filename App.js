import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { BackHandler,StyleSheet, TouchableHighlight, Image} from 'react-native';
import styled from "styled-components/native";
import Status from "./src/presentation/components/common/status";
import MessageList from "./src/presentation/containers/messageList";
import { createImageMessage, createLocationMessage, createTextMessage } from './src/application/utils/messageUtils';
import InputMethodEditor from "./src/presentation/components/inputMethodEditor";
import ToolBar from "./src/presentation/components/toolBar";
import * as Location from 'expo-location';



export default function App() { 

  const messagesSample = [
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
    latitude: 37.78825,
    longitude: -122.4324,
    }),
];

  const dismissFullscreenImage = () => {
      setFullScreenImageId(null);
   };
 
  const [fullscreenImageId,setFullScreenImageId] = useState(null);
  const [isInputFocused,setIsInputFocused] = useState(false);
  const [messages, setMessages] = useState(messagesSample);
  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
          
            if (fullscreenImageId) {
                dismissFullscreenImage();
                return true;
            }
            return false;
      });
      console.log(unsubscribe)
    //return () => unsubscribe();
  }, []);

  console.log(setFullScreenImageId);

  const handlePressToolbarCamera = () => {
    // ...
    }
  const handlePressToolbarLocation = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        try{
           let location = await Location.getCurrentPositionAsync({});
           console.log("jjj")
        }
        catch(error){
              console.log(error)
        }
      
        /*navigator.geolocation.getCurrentPosition((position) => {
              const { coords: { latitude, longitude } } = position;
              setMessages([
                 createLocationMessage({
                    latitude,
                    longitude
                 }), ...messages
                ]);
        })*/
  }

  const handleChangeFocus = (isFocused) => {
    setIsInputFocused(isFocused);
  };
  const handleSubmit = (text) => {
    
      setMessages([createTextMessage(text), ...messages]);
    };
    

  
  const handlePressMessage = ({id, type}) => {
    switch (type) {
        case 'text':
        // ...
        case 'image':
          setFullScreenImageId(id);
          setIsInputFocused(false);
        break;
        default:
        break;
      }
      
  }
 

  const renderFullscreenImage = () => {

      if (!fullscreenImageId) return null;
      const image = messages.find(message => message.id === fullscreenImageId);
      if (!image) return null;
      const { uri } = image;
      return (
      <ImageTouchableHighlight onPress={dismissFullscreenImage}>
          <FullImageView source={{ uri }} />
      </ImageTouchableHighlight>
      )
  }
  return (
    <ViewContainer>
       <Status />
       <MessageList messages={messages} onPressMessage={handlePressMessage} /> 
       <ToolBarView>
         <ToolBar
             isFocused={isInputFocused}
             onSubmit={handleSubmit}
             onChangeFocus={handleChangeFocus}
             onPressCamera={handlePressToolbarCamera}
             onPressLocation={handlePressToolbarLocation}
              
         />
      </ToolBarView> 
       
       <InputMethodEditor /> 
       {renderFullscreenImage()}  
    </ViewContainer>
 
  );
}




  

const ViewContainer = styled.View`
  flex : 1;
  background-color:#fff;
  align-items:center;
  justify-content:center;
`

const ToolBarView = styled.View`
align-items:center;
padding-vertical: 10px;
padding-horizontal: 10px;
padding-left: 16px;
background-color:white;
`

const ImageTouchableHighlight = styled.TouchableHighlight`
position:absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;
backgroundColor:black;
zIndex: 2;
`

const FullImageView = styled.Image`
  flex: 1;
  resize-mode:contain;
`
 