import { FunctionComponent, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// @ts-ignore
import vert from "../lib/webgl/shaders/shader.vert?raw";
// @ts-ignore
import frag from "../lib/webgl/shaders/shader.frag?raw";

const WebGL: FunctionComponent = () => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount || !mount.current) {
      console.error("Errore mount webgl");
      return;
    }

    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId: number | null;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
    camera.position.x = -45;
    camera.position.y = 10;
    camera.position.z = 30;

    camera.rotation.z = -1;

    const uniforms = {
      iTime: { type: "f", value: 0 },
      iResolution: { value: new THREE.Vector3() },
    };

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: uniforms,
      wireframe: true,
      vertexShader: vert,
      fragmentShader: frag,
    });

    const geometry = new THREE.TorusBufferGeometry(21, 31, 128, 256, 8);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.8, 0.8, 0.8);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      precision: "highp",
      powerPreference: "low-power",
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(width, height);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const animate: FrameRequestCallback = (time) => {
      time *= 0.001;

      material.uniforms.iResolution.value.set(width, height, 1);
      material.uniforms.iTime.value = time;

      mesh.rotateX(0.002);
      mesh.rotateY(-0.004);

      renderScene();

      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = null;
    };

    const handleResize = () => {
      if (!mount || !mount.current) {
        console.error("Errore!!!");
        return;
      }

      width = mount.current.clientWidth;
      height = mount.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderScene();
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener("resize", handleResize);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);

      if (!mount || !mount.current) {
        console.error("Errore!!!");
        return;
      }

      mount.current.removeChild(renderer.domElement);

      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mount}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        willChange: "opacity",
      }}
    />
  );
};

export default WebGL;
