const TimeHelper = {
  
  formatTimeDisplay: function(timeString) {
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
      return hour + "h " + min + "m " + sec + "." + ms + "s" 
    }
    var SSs = /^(\d*)\.(\d+)()()$/
    if(SSs.test(timeString)){
      var matchGroups = timeString.match(SSs)
      hour = 0
      min = 0
      sec = matchGroups[1]
      ms = matchGroups[2]
      return hour + "h " + min + "m " + sec + "." + ms + "s" 
    }

    var MMSS = /^(\d*):(\d*)\.?()()$/
    if(MMSS.test(timeString)){
      var matchGroups = timeString.match(MMSS)
      hour = 0
      min = matchGroups[1]
      sec = matchGroups[2]
      ms = 0
      return hour + "h " + min + "m " + sec + "." + ms + "s" 
    }
    var MMSSs = /^(\d*):(\d*)\.(\d+)()$/
    if(MMSSs.test(timeString)){
      var matchGroups = timeString.match(MMSSs)
      hour = 0
      min = matchGroups[1]
      sec = matchGroups[2]
      ms = matchGroups[3]
      return hour + "h " + min + "m " + sec + "." + ms + "s" 
    }
    var HHMMSS = /^(\d*):(\d*):(\d*)\.?()$/
    if(HHMMSS.test(timeString)){
      var matchGroups = timeString.match(HHMMSS)
      hour = matchGroups[1]
      min = matchGroups[2]
      sec = matchGroups[3]
      ms = 0
      return hour + "h " + min + "m " + sec + "." + ms + "s" 
    }

    var HHMMSSs = /^(\d*):(\d*):(\d*)\.(\d+)$/
    if(HHMMSSs.test(timeString)){
      var matchGroups = timeString.match(HHMMSSs)
      hour = matchGroups[1]
      min = matchGroups[2]
      sec = matchGroups[3]
      ms = matchGroups[4]
      return hour + "h " + min + "m " + sec + "." + ms + "s" 
    }
    return "Invalid"
  } 

}
export default TimeHelper;