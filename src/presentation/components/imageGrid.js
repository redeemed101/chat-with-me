import { View,Text,TouchableOpacity, ActivityIndicator } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { Permissions } from 'expo';
import {Image} from "react-native-elements";
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import styled  from "styled-components/native";
import Grid from './common/grid';

const keyExtractor = ({ uri }) => uri;

const ImageGrid = (props) => {
   const  imagesData =  [
        { uri: 'https://picsum.photos/600/600?image=10' },
        { uri: 'https://picsum.photos/600/600?image=20' },
        { uri: 'https://picsum.photos/600/600?image=30' },
        { uri: 'https://picsum.photos/600/600?image=40' },
        { uri: 'https://picsum.photos/600/600?image=50' },
        { uri: 'https://picsum.photos/600/600?image=60' },
        { uri: 'https://picsum.photos/600/600?image=70' },
        ];
    const [images,SetImages] = useState(imagesData)
    ImageGrid.propTypes = {
        onPressImage: PropTypes.func,
        };
    ImageGrid.defaultProps = {
        onPressImage: () => {},
        };
    const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        console.log(size);
          const style = {
                width: size,
                height: size,
                marginLeft,
                marginTop,
                backgroundColor:'blue'
            };
            return (
             <Image 
                  source={{uri}}
                  style={style} 
                  PlaceholderContent={<ActivityIndicator />}
                    />
            );
      };

      return (
        <Grid
            data={images}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            // ...
        />
    );
        
            
}

export default ImageGrid;