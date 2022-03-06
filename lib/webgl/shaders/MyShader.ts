import { Vector3 } from "three";

export const MyShader = {
  uniforms: {
    iTime: { type: "f", value: 0 },
    iResolution: { value: new Vector3() },
  },

  vertexShader: `
    uniform float uTime;

    varying vec2 vUv;
    varying float vTime;
    
    void main()
    {
        // position.x = position.x
        // position.x = 0;
    
        float elapsedTime = uTime;
    
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
        // modelPosition.y += cos(uv.y + elapsedTime);
        modelPosition.x = sin(modelPosition.y + elapsedTime) + modelPosition.x + sin(elapsedTime);
        modelPosition.z = modelPosition.z + cos(elapsedTime) + cos(modelPosition.y + elapsedTime);
        // modelPosition.z = sin(modelPosition.x) + cos(elapsedTime) ;
    
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
    
        vTime = uTime;
        vUv = uv;
    }
  `,

  fragmentShader: `
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
  `,
};
