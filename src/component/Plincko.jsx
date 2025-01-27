import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import { WIDTH } from "../game/Constants";
import { pad } from "../game/Padding";

export function Plincko({ play, numofobstacles }) {
  const canvasRef = useRef(null);
  const ballManagerRef = useRef(null); 
  const [outputs, setOutputs] = useState(
    Array.from({ length: numofobstacles }, () => []) // Initialize based on numofobstacles
  );

  // Update outputs whenever the numofobstacles changes
  useEffect(() => {
    setOutputs(Array.from({ length: numofobstacles }, () => []));
  }, [numofobstacles]);

  useEffect(() => {
    if (canvasRef.current) {
      ballManagerRef.current = new BallManager(canvasRef.current, (index, startX) => {
        // Update the outputs array with new values for the specific index
        setOutputs((prevOutputs) => {
          const newOutputs = [...prevOutputs]; // Copy previous outputs
          newOutputs[index] = [...newOutputs[index], startX]; // Add startX to the appropriate index
          return newOutputs; // Return the updated array
        });
      }, numofobstacles); 
    }

    return () => {
      ballManagerRef.current?.stop();
    };
  }, [numofobstacles]); 

  useEffect(() => {
    if (play && ballManagerRef.current) {
      let isRunning = true;

      const simulate = async () => {
        while (isRunning) {
          ballManagerRef.current.addBall(pad(WIDTH / 2 + 20 * (Math.random() - 0.5)));
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      };

      simulate();

      return () => {
        isRunning = false;
      };
    }
  }, [play]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between h-screen">
      <div className="flex mx-16 flex-col justify-center pt-10">
        {JSON.stringify(outputs, null, 2)}
      </div>
      <div className="flex flex-col items-center justify-center">
        <canvas ref={canvasRef} width="800" height="800"></canvas>
      </div>
    </div>
  );
}
