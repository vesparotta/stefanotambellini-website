import { FunctionComponent, useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { PixelShader } from "three/examples/jsm/shaders/PixelShader.js";
import { BadTVShader } from "../lib/webgl/shaders/BadTVShader";
import { CopyShader } from "../lib/webgl/shaders/CopyShader";
import { FilmShader } from "../lib/webgl/shaders/FilmShader";
import { MyShader } from "../lib/webgl/shaders/MyShader";
import { RGBShiftShader } from "../lib/webgl/shaders/RGBShiftShader";
import { StaticShader } from "../lib/webgl/shaders/StaticShader";

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

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: MyShader.uniforms,
      wireframe: false,
      vertexShader: MyShader.vertexShader,
      fragmentShader: MyShader.fragmentShader,
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
    renderer.setPixelRatio(window.devicePixelRatio);

    // CONTROLLI
    // const controls = new TrackballControls(camera, renderer.domElement);
    // controls.rotateSpeed = 2.0;
    // controls.panSpeed = 0.8;
    // controls.zoomSpeed = 1.5;

    let badTVPass = new ShaderPass(BadTVShader),
      rgbPass = new ShaderPass(RGBShiftShader),
      filmPass = new ShaderPass(FilmShader),
      staticPass = new ShaderPass(StaticShader),
      copyPass = new ShaderPass(CopyShader);

    // COMPOSER

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const pixelPass = new ShaderPass(PixelShader);
    pixelPass.uniforms["resolution"].value = new THREE.Vector2(width, height);
    pixelPass.uniforms["resolution"].value.multiplyScalar(
      window.devicePixelRatio
    );
    pixelPass.uniforms["pixelSize"].value = 6;

    composer.addPass(pixelPass);
    composer.addPass(badTVPass);
    composer.addPass(rgbPass);
    composer.addPass(filmPass);
    composer.addPass(staticPass);
    composer.addPass(copyPass);

    const renderScene = () => {
      // renderer.render(scene, camera);
      composer.render();
    };

    filmPass.uniforms.grayscale.value = 0;

    let badTVParams = {
      mute: true,
      show: true,
      distortion: 0.4,
      distortion2: 1.6,
      speed: 0.01,
      rollSpeed: 0.01,
    };

    let staticParams = {
      show: true,
      amount: 0.04,
      size: 4.0,
    };

    let rgbParams = {
      show: true,
      amount: 0.0128,
      angle: 1.0,
    };

    let filmParams = {
      show: true,
      count: 800,
      sIntensity: 0.9,
      nIntensity: 0.4,
    };

    //copy gui params into shader uniforms
    badTVPass.uniforms["distortion"].value = badTVParams.distortion;
    badTVPass.uniforms["distortion2"].value = badTVParams.distortion2;
    badTVPass.uniforms["speed"].value = badTVParams.speed;
    badTVPass.uniforms["rollSpeed"].value = badTVParams.rollSpeed;

    staticPass.uniforms["amount"].value = staticParams.amount;
    staticPass.uniforms["size"].value = staticParams.size;

    rgbPass.uniforms["angle"].value = rgbParams.angle * Math.PI;
    rgbPass.uniforms["amount"].value = rgbParams.amount;

    filmPass.uniforms["sCount"].value = filmParams.count;
    filmPass.uniforms["sIntensity"].value = filmParams.sIntensity;
    filmPass.uniforms["nIntensity"].value = filmParams.nIntensity;

    const animate: FrameRequestCallback = (time) => {
      time *= 0.001;

      material.uniforms.iResolution.value.set(width, height, 1);
      material.uniforms.iTime.value = time;

      badTVPass.uniforms["time"].value = time * 0.05;
      filmPass.uniforms["time"].value = time;
      staticPass.uniforms["time"].value = time;

      mesh.rotateX(0.002);
      mesh.rotateY(-0.004);

      renderScene();

      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);

        // @ts-ignore
        mount.current?.style.opacity = "0.77";
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

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      pixelPass.uniforms["resolution"].value = new THREE.Vector2(width, height);
      pixelPass.uniforms["resolution"].value.multiplyScalar(
        window.devicePixelRatio
      );

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
        mixBlendMode: "difference",
        willChange: "opacity",
        transition: "opacity 1.5s cubic-bezier(0.4, 0, 1, 1)",
        opacity: 0,
      }}
    />
  );
};

export default WebGL;
