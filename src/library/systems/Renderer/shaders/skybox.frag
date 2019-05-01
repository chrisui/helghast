#version 300 es
precision mediump float;
 
uniform samplerCube u_skybox;
uniform mat4 u_viewDirectionProjectionInverse;
 
in vec4 v_position;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  vec4 t = u_viewDirectionProjectionInverse * v_position;
  vec4 color = texture(u_skybox, normalize(t.xyz / t.w));
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
	outColor = vec4(vec3(gray), 1.0);
}