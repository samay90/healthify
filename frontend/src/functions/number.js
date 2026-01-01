export const number = (num) =>{
    if (!!!num) return 0;
    return Math.floor(num).toLocaleString("en-US");
}