export const getWeekEnds = (today = new Date()) =>{
    const sevenDaysBefore = new Date(today);
    sevenDaysBefore.setDate(today.getDate() - 6);

    return [sevenDaysBefore, today];
}