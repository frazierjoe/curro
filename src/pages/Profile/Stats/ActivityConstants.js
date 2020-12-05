export const ACTIVITY_MAP = {
    'RUN': {
        type: "Run",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "Shoes",
        equipmentName: "SHOE",
        additionalInfoAllowed: true,
        defaultUnit: "mi",
        color: "#82CA9D"
    },
    'BIKE': {
        type: "Bike",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "Bikes",
        equipmentName: "BIKE",
        additionalInfoAllowed: true,
        defaultUnit: "mi",
        color: "#FF8811"
    },
    'SWIM': {
        type: "Swim",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        defaultUnit: "yds",
        color: "#8884D8"
    },
    'SLEEP': {
        type: "Sleep",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        color: "#FFCBDD"
    },
    'CLIMB': {
        type: "Climb",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        color: "#F61067"
    },
    'ALTERG': {
        type: "AlterG",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        defaultUnit: 'mi',
        color: "#454851"
    },
    'YOGA': {
        type: "Yoga",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: false,
        color: "#000000"
    },
    'AQUA_JOG': {
        type: "Aqua Jog",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        color: "#FFBE0B"
    },
    'HIKE': {
        type: "Hike",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "SHOE",
        additionalInfoAllowed: true,
        defaultUnit: 'mi',
        color: "#FF6B6B"
    }
}

export const ALLOWED_ACTIVITIES = ['RUN', 'BIKE', 'SWIM', 'SLEEP', 'CLIMB', 'ALTERG', 'YOGA', 'AQUA_JOG' ,'HIKE'];