uniform vec2 res;//The width and height of our screen
uniform sampler2D bufferTexture;//Our input texture
uniform vec3 smokeSource;//The x,y are the posiiton. The z is the power/density
uniform float red;
uniform float blue;
uniform float green;
uniform float north;
uniform float south;
uniform float east;
uniform float west;
uniform float thicc;
void main() {
    vec2 pixel = gl_FragCoord.xy / res.xy;
    gl_FragColor = texture2D( bufferTexture, pixel );
    

    //Get the distance of the current pixel from the smoke source
    float dist = distance(smokeSource.xy,gl_FragCoord.xy);
    //Generate smoke when mouse is pressed
    
    gl_FragColor.r += red*smokeSource.z * max(15.0-dist,0.0);
    gl_FragColor.g += green*smokeSource.z * max(15.0-dist,0.0);
    gl_FragColor.b += blue*smokeSource.z * max(15.0-dist,0.0);


//Smoke diffuse
    float xPixel = 1.0/res.x;//The size of a single pixel
    float yPixel = 1.0/res.y;
    vec4 rightColor = texture2D(bufferTexture,vec2(pixel.x+xPixel,pixel.y));
    vec4 leftColor = texture2D(bufferTexture,vec2(pixel.x-xPixel,pixel.y));
    vec4 upColor = texture2D(bufferTexture,vec2(pixel.x,pixel.y+yPixel));
    vec4 downColor = texture2D(bufferTexture,vec2(pixel.x,pixel.y-yPixel));
//Diffuse equation
    float factor1 = thicc * 0.016 * (leftColor.r*east+ rightColor.r*west + downColor.r*north + upColor.r*south  - (east+north+south+west)*gl_FragColor.r);
    float factor2 = thicc * 0.016 * (leftColor.g*east + rightColor.g*west + downColor.g*north + upColor.g*south- (east+north+south+west)*gl_FragColor.g);
    float factor3 = thicc* 0.016 * (leftColor.b*east + rightColor.b*west + downColor.b*north + upColor.b*south - (east+north+south+west)*gl_FragColor.b);
    //NOTE: all weights (north/south/east/west) must add up to the frag color coefficient (currently 6.0).
    //if the sum of the weights is less than this value, the smoke diffuses rapidly. if they exceed this value, 
    //it does not diffuse/expands forever.
    //


    //Account for low precision of texels
    float minimum = 0.003;
    if(factor1 >= -minimum && factor1 < 0.0) factor1 = -minimum;
    if(factor2 >= -minimum && factor2 < 0.0) factor2 = -minimum;
    if(factor3 >= -minimum && factor3 < 0.0) factor3 = -minimum;

    gl_FragColor.r += factor1;
    gl_FragColor.g += factor2;
    gl_FragColor.b += factor3;
    
}