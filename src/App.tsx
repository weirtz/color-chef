import "./App.css";

import { SketchPicker } from 'react-color';
import { SetStateAction, useState } from "react";
import { invoke } from "@tauri-apps/api";

function App() {

  const [color, setColor] = useState("#1fa9f4");
  const [gradient, setGradient] = useState([]);
  const fontStyles = {
    Black: {
        color: 'black'
    },
    White: {
        color: 'white'
    },
 }
 console.log(typeof color);
  return (
    <div>
      <SketchPicker 
        color={color}
        onChange={(color: any, event: any) => {
          setColor(color);
          invoke("generate_gradient", color.rgb).then((grad: any) => {
            console.log(grad);
            console.log(color.rgb.r);
            setGradient(grad);
          });
        }}
      />
      
      {gradient.map((color, index) => (
      
      <div key={index} className='color-lables' style={{
        color: (
          color[0] == 255 || color[1] == 255 || color[2] == 255) || ( //any color == 255
          color[0] >190 && color[1] >190 && color[2] >190) || ( //all colors >190
          color[0] >190 && color[1] >190) || (
          color[0] >190 && color[2] >190) || (
          color[1] >190 && color[0] >190) || (
          color[1] >190 && color[2] >190) || (
          color[2] >190 && color[0] >190) || (
          color[2] >190 && color[1] >190)
          ? 'black' : 'white',
        backgroundColor: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')', 
        padding: "0.5rem",
        
      }}>
        
        rgb({color[0]}, {color[1]}, {color[2]})
      </div>
      ))}
    </div>
    
  );

}

export default App;
