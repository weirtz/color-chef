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
      {gradient.map(color => 
      <div style={{
        padding: "2rem",
        backgroundColor: 'rgb(${color[0]}, ${color[1]}, ${color[2]})'
      }}>
        rgb({color[0]}, {color[1]}, {color[2]})
      </div>
      )}
    </div>
  );

}

export default App;
