import "./App.css";

import { SketchPicker } from 'react-color';
import { SetStateAction, useState } from "react";
import { invoke } from "@tauri-apps/api";

function App() {

  const [color, setColor] = useState("#1fa9f4");
  const[gradient, setGradient] = useState([]);

  return (
    <div>
      <SketchPicker 
        color={color}
        onChange={(color: any, event: any) => {
          setColor(color);
          invoke("generate_gradient", color.rgb).then((grad: any) => {
            console.log(grad); 
            setGradient(grad);
          });
        }}
      />
      {gradient.map((color, index) => (
      <div key={index} style={{
        backgroundColor: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')', 
        padding: "0.5rem"
      }}>
        rgb({color[0]}, {color[1]}, {color[2]})
      </div>
      ))}
    </div>
  );
}

export default App;
