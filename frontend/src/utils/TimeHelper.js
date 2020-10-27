import { addMinutes } from "date-fns"

const TimeHelper = {
  
  formatTimeDisplay: function(timeString) {
    if(timeString.length === 0){
      return ""
    }

    var hour = 0
    var min = 0
    var sec = 0
    var ms = 0

    timeString = String(timeString)
    timeString = timeString.trim()

    var MM = /^(\d+)\.?()()()$/
    if(MM.test(timeString)){
      var matchGroups = timeString.match(MM)
      hour = 0
      min = matchGroups[1]
      sec = 0
      ms = 0
      return this.formatTime(hour, min, sec, ms)
    }
    var SSs = /^(\d*)\.(\d+)()()$/
    if(SSs.test(timeString)){
      var matchGroups = timeString.match(SSs)
      hour = 0
      min = 0
      sec = matchGroups[1]
      ms = matchGroups[2]
      return this.formatTime(hour, min, sec, ms)
    }

    var MMSS = /^(\d*):(\d*)\.?()()$/
    if(MMSS.test(timeString)){
      var matchGroups = timeString.match(MMSS)
      hour = 0
      min = matchGroups[1]
      sec = matchGroups[2]
      ms = 0
      return this.formatTime(hour, min, sec, ms)
    }
    var MMSSs = /^(\d*):(\d*)\.(\d+)()$/
    if(MMSSs.test(timeString)){
      var matchGroups = timeString.match(MMSSs)
      hour = 0
      min = matchGroups[1]
      sec = matchGroups[2]
      ms = matchGroups[3]
      return this.formatTime(hour, min, sec, ms) 
    }
    var HHMMSS = /^(\d*):(\d*):(\d*)\.?()$/
    if(HHMMSS.test(timeString)){
      var matchGroups = timeString.match(HHMMSS)
      hour = matchGroups[1]
      min = matchGroups[2]
      sec = matchGroups[3]
      ms = 0
      return this.formatTime(hour, min, sec, ms) 
    }

    var HHMMSSs = /^(\d*):(\d*):(\d*)\.(\d+)$/
    if(HHMMSSs.test(timeString)){
      var matchGroups = timeString.match(HHMMSSs)
      hour = matchGroups[1]
      min = matchGroups[2]
      sec = matchGroups[3]
      ms = matchGroups[4]
      return this.formatTime(hour, min, sec, ms)
    }
    return "Invalid"
  },
  formatTime: function(hour, min, sec, ms) {
    //sanitize
    hour = parseInt(hour)
    min = parseInt(min)
    sec = parseInt(sec)
    ms = parseInt(ms)
    hour = isNaN(hour) ? 0 : hour
    min = isNaN(min) ? 0 : min
    sec = isNaN(sec) ? 0 : sec
    ms = isNaN(ms) ? 0 : ms

    // round ms to 1 place
    ms = Math.round(parseFloat("0."+ms)*10.0)

    // if more than 60 seconds add to min
    var extraMin = (sec - (sec%60)) / 60
    sec = sec % 60
    min += extraMin

    // if more than 60 min add to hours
    var extraHour = (min - (min%60)) / 60
    min = min % 60
    hour += extraHour

    return hour + "h " + min + "m " + sec + "." + ms + "s" 
  }, 
  formatTimeString: function(totalTimeMs){
    var ms = parseInt((totalTimeMs % 1000) / 100),
    sec = Math.floor((totalTimeMs / 1000) % 60),
    min = Math.floor((totalTimeMs / (1000 * 60)) % 60),
    hour = Math.floor((totalTimeMs / (1000 * 60 * 60)) % 24)

    hour = isNaN(hour) ? 0 : hour
    min = isNaN(min) ? 0 : min
    sec = isNaN(sec) ? 0 : sec
    ms = isNaN(ms) ? 0 : ms

    hour = (hour < 10) ? "0" + hour : hour
    min = (min < 10) ? "0" + min : min
    sec = (sec < 10) ? "0" + sec : sec
    
    return hour + ":" + min + ":" + sec + "." + ms 
  },
  formatTimeMs: function(totalTimeMs){
    var ms = parseInt((totalTimeMs % 1000) / 100),
    sec = Math.floor((totalTimeMs / 1000) % 60),
    min = Math.floor((totalTimeMs / (1000 * 60)) % 60),
    hour = Math.floor((totalTimeMs / (1000 * 60 * 60)))

    hour = isNaN(hour) ? 0 : hour
    min = isNaN(min) ? 0 : min
    sec = isNaN(sec) ? 0 : sec
    ms = isNaN(ms) ? 0 : ms

    return hour + "h " + min + "m " + sec + "." + ms + "s" 
  },
  getTotalMs: function(timeString){
    var formatTimeString = this.formatTimeDisplay(timeString)
    if(formatTimeString === "Invalid" | formatTimeString === ""){
      return 0
    }
    var timeRegex = /(\d*)h\s(\d*)m\s(\d*)\.(\d*)s/
    var matchGroups = formatTimeString.match(timeRegex)
    var hour = parseInt(matchGroups[1])
    var min = parseInt(matchGroups[2])
    var sec = parseInt(matchGroups[3])
    var ms = parseInt(matchGroups[4])
    return (((hour*60*60) + (min*60) + sec) * 1000) + ms
  }
}
export default TimeHelper;