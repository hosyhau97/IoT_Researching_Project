function addTimeMinutes(date, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
}

function addTimeSeconds(date, seconds) {
    return new Date(dt.getTime() + seconds * 1000);
}

function countTime(start, end) {
    var mins = Math.round((end - start) / (1000 * 60));
    return mins;
}
function miniusTime(start, end){
    return (end - start);
}
function convertTimestampToDate(timestamp){
    return new Date(timestamp * 1000).toLocaleString();
}

function convertDateToTimestamp(){
    return Math.round(new Date().getTime()/1000);
}
module.exports = {
    addTimeMinutes,
    addTimeSeconds,
    countTime,
    miniusTime,
    convertTimestampToDate,
    convertDateToTimestamp
}