var mouseDown = false;
document.onmousedown = function(event){
    customMaterial.uniforms.mousePos.value.x = event.clientX;
    customMaterial.uniforms.mousePos.value.y = window.innerHeight - event.clientY;
    mouseDown = true;
    customMaterial.uniforms.mousePos.value.z = 0.1;
}
document.onmouseup = function(event){
    mouseDown = false;
    customMaterial.uniforms.mousePos.value.z = 0;
}