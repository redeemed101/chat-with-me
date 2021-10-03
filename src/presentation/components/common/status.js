import { Constants } from 'expo';
import { Platform,StyleSheet, Text,StatusBar, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo"
import React,{useState, useEffect} from "react";
import styled  from "styled-components/native";


const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0)

export default function Status(){

  
   
    const [isConnected, setIsConnected] = useState(false);
    NetInfo.fetch().then((state) => {
          setIsConnected(state.isConnected);
   });
  
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
       
          setIsConnected(state.isConnected);
          
        });
        return () => unsubscribe();
      }, []);
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
        <StatusBar
         backgroundColor={backgroundColor}
         barStyle = {isConnected ? 'dark-content' : 'light-content'}
         animated = {false}
         />
    )

    const messageContainer = (
        <MessageContainer pointerEvents={'none'}>
          {statusBar}
          {!isConnected && (
              <Bubble>
                <BubbleText>No Network Connection</BubbleText>
              </Bubble>
          )}
        </MessageContainer>
    )

    if (Platform.OS === 'ios') {
        return <View style={[styles.status, { backgroundColor }]}></View>;
    }
    return messageContainer;
}



const BubbleText = styled.Text`
 color:white
`
const MessageContainer = styled.View`
z-index:1;
position:absolute;
top:${statusHeight + 20}px;
right:0;
left:0;
height:80px;
align-items:center
`

const Bubble = styled.View`
padding-horizontal:20px;
padding-vertical:10px;
border-radius:20px;
background-color:red;
`

const styles = StyleSheet.create({
    status: {
    zIndex: 1,
    height: statusHeight,
    },
    
});