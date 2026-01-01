export const percentage = (value,limit) =>{
    if (!!!value) return 0;
    return Math.floor(Math.min(100,(value/limit)*100));
}