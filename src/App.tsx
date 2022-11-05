import "./App.css";

import { SketchPicker } from 'react-color';
import { SetStateAction, useState } from "react";
import { invoke } from "@tauri-apps/api";

function App() {

  const [color, setColor] = useState("#1fa9f4");
  const [gradient, setGradient] = useState([]);
  
 console.log(typeof color);
  return (
    <div>
      <div className="left">
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
      </div>
      
      {gradient.map((color, index) => (
      
       <div className="right">
         <div key={index} className='color-lables' style={{
            color: ( //change the color of the text based on the background color for readability
              color[0] == 255 || color[1] == 255 || color[2] == 255) || ( // Any color == 255
              color[0] > 190 && color[1] > 190 && color[2] > 190) || (       // All colors > 190
              color[0] > 190 && color[1] > 190) || (                        // red and green > 190
              color[0] > 190 && color[2] > 190) || (                        // red and blue > 190
              color[1] > 190 && color[0] > 190) || (                        // green and red > 190 
              color[1] > 190 && color[2] > 190) || (                        // green and blue > 190
              color[2] > 190 && color[0] > 190) || (                        // blue and red > 190 
              color[2] > 190 && color[1] > 190)                             // blue and green > 190
              ? 'black' : 'white',
            backgroundColor: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')', 
            
          }}>
          
          {/* display color as text in html */}
          rgb({color[0]}, {color[1]}, {color[2]})
          <a className="save-color"><div><p>Save color</p></div></a>
        </div>
       </div>
      ))}
    </div>
  );
}

export default App;
