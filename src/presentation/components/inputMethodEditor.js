import React from 'react';
import styled  from "styled-components/native";
import ImageGrid from './imageGrid';


const InputMethodEditorView = styled.View`
  flex: 1;
  background-color: white;
`

const InputMethodEditor = props => {
     return (
         <InputMethodEditorView>
            <ImageGrid />
         </InputMethodEditorView>
     )
}

export default InputMethodEditor;