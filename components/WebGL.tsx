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
      console.error("Errore!!!");
      return;
    }

    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId: number | null;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    const uniforms = {
      uTime: { type: "f", value: 0.0 },
    };

    const geometry = new THREE.SphereBufferGeometry(1, 64, 64);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      opacity: 0.1,
      wireframe: false,
      side: THREE.DoubleSide,
      uniforms: uniforms,
      vertexShader: vert,
      fragmentShader: frag,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(3.28, 2.3, 1);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);

    const renderScene = () => {
      renderer.render(scene, camera);
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

    const animate = () => {
      material.uniforms.uTime.value += 0.01;
      mesh.rotation.y += 0.01;
      mesh.rotation.x += Math.random() / 100;

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
        zIndex: -100,
      }}
    />
  );
};

export default WebGL;
