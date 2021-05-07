var advectUniforms = {
    res : {type: 'v2' },
    velocityField: { type: "t" },
    advectionField: { type: "t" },
    dissipation: {type:"f" }
}

var diffuseUniforms = {
    bufferTexture: { type: "t" },
    res : {type: 'v2'}, //Keeps the resolution
    smokeSource: {type:"v3"},
    time: {type:"f"},
    red:{type:"f"},
    blue:{type:"f"},
    green:{type:"f"},
    north:{type:"f"},
    south:{type:"f"},
    east: {type:"f"},
    west: {type:"f"},
    thicc: {type:"f"}
}