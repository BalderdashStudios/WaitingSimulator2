precision mediump float;

uniform vec2 resolution;

uniform sampler2D normalMap;

uniform vec3 lightPos;

varying vec2 pos;

const vec3 lightAmb = vec3(1., 0.2, 0.2);
const vec3 lightCol = vec3(1., 0.5, 0.5);

const float ambStrenght = 0.3;
const float lightStrength = 0.3;

void main() {
  
  vec3 normal = texture2D(normalMap, pos).rgb;
  
  normal = (normal * 2.) - 1.; 
  
  
  vec3 lightDir = vec3(pos, 0.) - lightPos;
  
  vec3 light = (lightAmb * ambStrenght)
    + (lightCol * lightStrength * dot(lightDir, normal));
  
  gl_FragColor = vec4(light, 1.);
  
}