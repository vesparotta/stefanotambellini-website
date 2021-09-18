#define PI 3.1415926535897932384626433832795

uniform vec3 iResolution;
uniform float iTime;

varying vec2 vUv;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.75 + 0.5*cos(iTime+uv.xyx+vec3(0,3,9));

    // Output to screen
    fragColor = vec4(col,1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}