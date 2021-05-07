uniform vec2 res;

uniform float alpha,
uniform float rBeta,      // reciprocal beta
            
uniform sampler2D x;   // x vector (Ax = b)
            
uniform samplerRECT b;   // b vector (Ax = b)

void main() {
    vec2 pixel = gl_fragCoord.xy / res.xy;
    // left, right, bottom, and top x samples
   
    vec4 xL = texture2D(x, coords - vec2(1 / res.x, 0));
    vec4 xR = texture2D(x, coords + vec2(1 / res.x, 0));
    vec4 xB = texture2D(x, coords - vec2(0, 1 / res.y));
    vec4 xT = texture2D(x, coords + vec2(0, 1 / res.y));
 
    // b sample, from center
   
    vec4 bC = texture2D(b, coords);
 
    // evaluate Jacobi iteration
    gl_fragColor = (xL + xR + xB + xT + alpha * bC) * rBeta;
 }