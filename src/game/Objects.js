import { HEIGHT, NUM_SINKS, WIDTH, obstacleRadius, sinkWidth } from "./Constants";
import { pad } from "./padding";

const MULTIPLIERS = {
    1: 22,
    2: 16,
    3: 5,
    4: 2,
    5: 1.4,
    6: 1.2,
    7: 0.6,
    8: 0.4,
    9: 0.6,
    10: 1.2,
    11: 1.4,
    12: 2,
    13: 5,
    14: 16,
    15: 22
};




export const createObstacles = (obstacleCount) => {
    const obstacles = [];
    const rows = obstacleCount;

    for (let row = 2; row < rows; row++) {
        const numObstacles = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;

        for (let col = 0; col < numObstacles; col++) {
            const x = WIDTH / 2 - spacing * (row / 2 - col);
            obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
        }
    }

    return obstacles;
};


export const createSinks = (obstacleCount) => {
    const sinks = [];
    const SPACING = obstacleRadius * 2;
    const hidenum = 16 - obstacleCount;
    const half = hidenum / 2;
    console.log(hidenum);
    console.log("half :", half);

    for (let i = 1; i < NUM_SINKS; i++) {
        const x = WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS / 2)) - SPACING * 1.5;
        const y = HEIGHT - (230 + (hidenum * 34));
        // const y = HEIGHT - (16+hidenum)*14.375;
        //console.log(y);

        const width = sinkWidth + 5;
        const height = width;
        if (hidenum % 2 == 0) {
            const endnum = 16 - half;
            const startnum = 16 - endnum;
            console.log("startnum :", startnum);
            console.log("endnum :", endnum);


            if (i >= startnum + 1 && i <= endnum) {
                console.log(i);

                sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i] });


            } else {

                continue


            }




        } else {
            console.log(i);
            
            if (hidenum == 1 && i == 8) {
                sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i] });
              } else if (hidenum == 3 && [1, 15].includes(i)) {
                continue; 
              }
              else if (hidenum == 5 && [1,2,14,15,16].includes(i)) {
                continue; 
              }
              else if (hidenum == 7 && [1,2,,3,13,14,15,16].includes(i)) {
                continue; 
              }
              
              else{
                sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i] });
              }
            
        }

    }

    return sinks;
};
