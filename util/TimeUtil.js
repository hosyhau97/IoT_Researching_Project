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
module.exports = {
    addTimeMinutes,
    addTimeSeconds,
    countTime
}