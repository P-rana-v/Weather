const timeConvert = (timestamp,timezone) => {
    let date=new Date(timestamp*1000)
    let offset=date.getTimezoneOffset()*60
    let newDate=new Date((timestamp+offset+timezone)*1000)
    let hrs=String(newDate.getHours())
    let mins=String(newDate.getMinutes())
    if(hrs.length===1) hrs="0"+hrs
    if(mins.length===1) mins="0"+mins
    return hrs+" : "+mins
}

export default timeConvert