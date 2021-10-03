
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { MessageShape } from "../../application/utils/messageUtils";
import styled  from "styled-components/native";

const MessageFlatList = styled.FlatList`
flex: 1;
overflow:visible;
width:100%;
`

const MessageRow = styled.View`
flex-direction:row;
justify-content:flex-end;
margin-bottom: 4px;
margin-right: 10px;
margin-left: 60px;
`

const MessageBubble = styled.View`
padding-vertical: 5px;
padding-horizontal: 10px;
background-color: rgb(16,135,255);
border-radius: 20px;
`

const ImageView = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 10px;
`
const MessageBubbleText = styled.Text`
    font-size: 18px;
    color:white;
`
const MessageMapView = styled(MapView)`
width: 250px;
height: 250px;
borderRadius: 10px;
`




const renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
        case 'text':
                return (
                <MessageBubble>
                <MessageBubbleText>{text}</MessageBubbleText>
                </MessageBubble>
                );
        case 'image':
             return <ImageView source={{ uri }} />;
        case 'location':
        return (
            <MessageMapView
               
                initialRegion={{
                ...coordinate,
                latitudeDelta: 0.08,
                longitudeDelta: 0.04,
                }}
            >
              <MessageMapView.Marker coordinate={coordinate} />
            </MessageMapView>
        );
        default:
        return null;
        }
 }
        



const  MessageList = (props) => {
    const { messages } = props;

    

    const keyExtractor = item => item.id.toString();


    MessageList.propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
        };
     MessageList.defaultProps = {
        onPressMessage: () => {},
        };

        const renderMessageItem = ({ item }) => {
            const { onPressMessage } = props;
            return (
            <MessageRow>
            <TouchableOpacity onPress={() => onPressMessage(item)}>
               {renderMessageBody(item)}
            </TouchableOpacity>
            </MessageRow>
           );
        };

        return (
            <MessageFlatList
            inverted
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps={'handled'}
            />
      );
            
        

}

export default MessageList;