import { FunctionComponent, useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);

    camera.position.z = 4;
    scene.add(cube);
    renderer.setClearColor("#FFFDD0");
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
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

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

      scene.remove(cube);
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
