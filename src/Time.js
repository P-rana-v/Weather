const timeConvert = (timestamp,timezone) => {
    let date=new Date(timestamp*1000)
    let hrsTimezone=Math.floor(Math.abs(timezone)/3600)
    let minsTimezone=(Math.abs(timezone)-hrsTimezone*3600)/60
    if (timezone<0) {
        hrsTimezone=-hrsTimezone
        minsTimezone=-minsTimezone
    }
    let hrsUTC= date.getUTCHours()
    let minsUTC=date.getUTCMinutes()
    let mins=String(minsUTC+minsTimezone)
    let hrs=String(hrsUTC+hrsTimezone)
    if (mins.length===1) {
        mins="0"+mins
    }
    if (hrs.length===1) {
        hrs="0"+hrs
    }
    return hrs+" : "+mins
}

export default timeConvert