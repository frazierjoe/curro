export const ACTIVITY_MAP = {
    'RUN': {
        type: "Run",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "Shoes",
        equipmentName: "SHOE",
        additionalInfoAllowed: true,
        defaultUnit: "mi"
    },
    'BIKE': {
        type: "Bike",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "Bikes",
        equipmentName: "BIKE",
        additionalInfoAllowed: true,
        defaultUnit: "mi"
    },
    'SWIM': {
        type: "Swim",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        defaultUnit: "yds"
    },
    'SLEEP': {
        type: "Sleep",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true
    },
    'CLIMB': {
        type: "Climb",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true
    },
    'ALTERG': {
        type: "AlterG",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        defaultUnit: 'mi'
    },
    'YOGA': {
        type: "Yoga",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: false
    },
    'AQUA_JOG': {
        type: "Aqua Jog",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true
    },
    'HIKE': {
        type: "Hike",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "SHOE",
        additionalInfoAllowed: true,
        defaultUnit: 'mi'
    }
}

export const ALLOWED_ACTIVITIES = ['RUN', 'BIKE', 'SWIM', 'SLEEP', 'CLIMB', 'ALTERG', 'YOGA', 'AQUA_JOG' ,'HIKE'];