import React, {useState, useRef, useEffect} from 'react';
import styled  from "styled-components/native";
import PropTypes from 'prop-types';
import { TouchableOpacity} from 'react-native';






    

const ToolbarButton = ({ title, onPress }) => {
    ToolbarButton.propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    return (
     <TouchableOpacity onPress={onPress}>
        <ButtonText>{title}</ButtonText>
     </TouchableOpacity>
   )
};

const ToolBar = props => {

   const { onPressCamera, onPressLocation } = props   
   const [text, setText] = useState("");

   const inputRef = useRef(null);

   useEffect(() => {
    console.log(props.isFocused)
        if(props.isFocused){
            inputRef.current.focus();
            
        }
        else{
            inputRef.current.blur();
        }
  }, [props.isFocused]);

    const handleFocus = () => {
        const { onChangeFocus } = props;
        onChangeFocus(true);
    }

    const handleBlur = () => {
        const { onChangeFocus } = props;
        onChangeFocus(false);
    }
   

   const handleChangeText = (text) => {
        setText({ text });
     };
    
   const handleSubmitEditing = () => {
          const { onSubmit } = props;
    
          if (!text) return;
    
          onSubmit(text);
         setText({ text: '' });
    };

    ToolBar.propTypes = {
        isFocused: PropTypes.bool.isRequired,
        onChangeFocus: PropTypes.func,
        onSubmit: PropTypes.func,
        onPressCamera: PropTypes.func,
        onPressLocation: PropTypes.func,
    };
    ToolBar.defaultProps = {
        onChangeFocus: () => {},
        onSubmit: () => {},
        onPressCamera: () => {},
        onPressLocation: () => {},
    };
    
    
   return (
       <ToolBarView>
           {/* Use emojis for icons instead! */}
           <ToolbarButton title={'📷'} icon="" onPress={onPressCamera} />
           <ToolbarButton title={'📍'} icon="" onPress={onPressLocation} />
           <InputContainerView>
              <TextInput
                     ref = {inputRef}
                     underlineColorAndroid={'transparent'}
                     placeholder={'Type something!'}
                     blurOnSubmit={false}
                     value={text}
                     onChangeText={handleChangeText}
                     onSubmitEditing={handleSubmitEditing}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
            />
          </InputContainerView>
      </ToolBarView>
   )
}

export default ToolBar;

const ToolBarView = styled.View`
flex-direction:row;
align-items:center;
padding-vertical: 10px;
padding-horizontal: 10px;
padding-left: 16px;
background-color:white;


`



const TextInput = styled.TextInput`
   flex:1;
   font-size:18px;
`

const InputContainerView = styled.View`
flex: 1;
flex-direction:row;
border-width: 1px;
border-color:rgba(0,0,0,0.04);
border-radius: 16px;
padding-vertical: 4px;
padding-horizontal: 12px;
background-color:rgba(0,0,0,0.02);
`

const ButtonText = styled.Text`
top: -2px;
margin-right: 12px;
font-size: 20px;
color:grey;
`