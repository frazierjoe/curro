const DistanceHelper = {
  
  convertDistanceToUnit: function(distance, unit) {
    switch(distance.unit) {
      case "YDS":
        switch(unit){
          case "MI":
            return distance.value / 1760
          case "M":
            distance.value = distance.value * 1000
          case "KM":
            return distance.value / 1094
          case "YDS":
          default:
            return distance.value
        }
      case "MI":
        switch(unit){
          case "YDS":
            return distance.value * 1760
          case "M":
            distance.value = distance.value * 1000
          case "KM":
            return distance.value * 1.60934
          case "MI":
          default:
            return distance.value
        }
      case "M":
        distance.value = distance.value / 1000
      case "KM":
        switch(unit){
          case "YDS":
            return distance.value * 1094
          case "MI":
            return distance.value = distance.value / 1.60934
          case "M":
            return distance.value * 1000
          case "KM":
          default:
            return distance.value
        }
      default:
        return distance.value
    }
  },
  calculateAveragePace: function(distance, duration, activityType) {
    var covertDistance = {
      value: distance.value,
      unit: distance.unit
    }
    switch(activityType) {
      case "HIKE":
      case "BIKE":
        var totalMiles = this.convertDistanceToUnit(covertDistance, "MI")
        var mph = totalMiles/(duration/(60*60*1000))
        return mph.toFixed(1) + ' mph'
      case "SWIM":
        var totalYards = this.convertDistanceToUnit(covertDistance, "YDS")
        duration = (duration/(totalYards/100))
        var min = Math.floor(duration/60000)
        var sec = Math.floor((duration%60000)/1000)
        sec = sec < 10 ? "0"+sec : sec
        return min + ":" + sec + "/100yds"
      default:
        var totalRunMiles = this.convertDistanceToUnit(covertDistance, "MI")
        duration = duration/totalRunMiles
        var min = Math.floor(duration/60000)
        var sec = Math.floor((duration%60000)/1000)
        sec = sec < 10 ? "0"+sec : sec
        return min+":"+sec+" min/mi"
    }
  },
}
export default DistanceHelper;