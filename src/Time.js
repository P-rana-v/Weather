const timeConvert = (timestamp,timezone) => {
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let tempdate=new Date(timestamp*1000)
    let offset=tempdate.getTimezoneOffset()*60
    let newDate=new Date((timestamp+offset+timezone)*1000)
    let hrs=String(newDate.getHours())
    let mins=String(newDate.getMinutes())
    let date=String(newDate.getDate())
    let day=days[newDate.getDay()]
    if(hrs.length===1) hrs="0"+hrs
    if(mins.length===1) mins="0"+mins
    if(date.length===1) date="0"+date
    return {hrs,mins,date,day}
}

export default timeConvert