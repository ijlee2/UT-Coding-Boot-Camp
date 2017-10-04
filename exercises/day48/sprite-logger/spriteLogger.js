// When the spriteLogger function is passed a 2D sprite array, it prints the sprite to the console
const spriteLogger = (spriteArr) => {
    let res = "";
    for (let i = 0; i < spriteArr.length; i++) {
        for (let j = 0; j < spriteArr[i].length; j++) {
            res += spriteArr[i][j];
        }
        
        res += "\n";
    }
    console.log(res);
};

// Add code to export the spriteLogger function as a default export
export default spriteLogger;