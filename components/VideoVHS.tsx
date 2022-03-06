//Bad TV Shader Demo
//Using Three.js r.75
//by Felix Turner / www.airtight.cc / @felixturner

import { FunctionComponent, useEffect, useRef } from "react";
import * as THREE from "three";
import { RenderPass } from "../lib/webgl/postprocessing/RenderPass";
import { ShaderPass } from "../lib/webgl/postprocessing/ShaderPass";
import { EffectComposer } from "../lib/webgl/postprocessing/EffectComposer";
import { BadTVShader } from "../lib/webgl/shaders/BadTVShader";
import { CopyShader } from "../lib/webgl/shaders/CopyShader";
import { FilmShader } from "../lib/webgl/shaders/FilmShader";
import { RGBShiftShader } from "../lib/webgl/shaders/RGBShiftShader";
import { StaticShader } from "../lib/webgl/shaders/StaticShader";

export const VideoVHS: FunctionComponent = () => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount || !mount.current) {
      console.error("Errore mount webgl");
      return;
    }

    var camera, scene, renderer;
    var video, videoTexture, videoMaterial;
    var composer;
    var shaderTime = 0;
    var badTVParams, badTVPass;
    var staticParams, staticPass;
    var rgbParams, rgbPass;
    var filmParams, filmPass;
    var renderPass, copyPass;
    var gui;
    var pnoise, globalParams;

    init();
    animate();

    function init() {
      //Load Video
      video = document.createElement("video");
      video.loop = true;
      video.muted = true;
      video.src = "media/glitch.mp4";
      video.play();

      //init video texture
      videoTexture = new THREE.Texture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
      });

      //init camera
      camera = new THREE.PerspectiveCamera(55, 1080 / 720, 20, 3000);
      camera.position.z = 1000;
      scene = new THREE.Scene();

      //Add video plane
      var planeGeometry = new THREE.PlaneGeometry(1080, 720, 1, 1);
      var plane = new THREE.Mesh(planeGeometry, videoMaterial);
      scene.add(plane);
      plane.z = 0;
      plane.scale.x = plane.scale.y = 1.45;

      //add stats
      /* stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "0px";
    container.appendChild(stats.domElement); */

      if (!mount || !mount.current) {
        console.error("Errore!!!");
        return;
      }

      //init renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(mount.current.clientWidth, mount.current.clientHeight);
      mount.current.appendChild(renderer.domElement);

      //POST PROCESSING
      //Create Shader Passes
      renderPass = new RenderPass(scene, camera);
      badTVPass = new ShaderPass(BadTVShader);
      rgbPass = new ShaderPass(RGBShiftShader);
      filmPass = new ShaderPass(FilmShader);
      staticPass = new ShaderPass(StaticShader);
      copyPass = new ShaderPass(CopyShader);

      //set shader uniforms
      filmPass.uniforms.grayscale.value = 0;

      //Init DAT GUI control panel
      badTVParams = {
        mute: true,
        show: true,
        distortion: 3.0,
        distortion2: 1.0,
        speed: 0.3,
        rollSpeed: 0.1,
      };

      staticParams = {
        show: true,
        amount: 0.5,
        size: 4.0,
      };

      rgbParams = {
        show: true,
        amount: 0.005,
        angle: 0.0,
      };

      filmParams = {
        show: true,
        count: 800,
        sIntensity: 0.9,
        nIntensity: 0.4,
      };

      onToggleShaders();
      onToggleMute();
      onParamsChange();

      window.addEventListener("resize", onResize, false);
      renderer.domElement.addEventListener("click", randomizeParams, false);
      onResize();
      randomizeParams();
    }

    function onParamsChange() {
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
    }

    function randomizeParams() {
      badTVParams.distortion = Math.random() * 6;
      badTVParams.distortion2 = Math.random() * 6;
      badTVParams.speed = Math.random() * 0.4;
      badTVParams.rollSpeed = Math.random() * 0.2;
      rgbParams.angle = Math.random() * 2;
      rgbParams.amount = Math.random() * 0.02;
      staticParams.amount = Math.random() * 0.2;

      onParamsChange();
    }

    function onToggleMute() {
      video.muted = badTVParams.mute;
    }

    function onToggleShaders() {
      //Add Shader Passes to Composer
      //order is important
      composer = new EffectComposer(renderer);
      composer.addPass(renderPass);

      if (filmParams.show) {
        composer.addPass(filmPass);
      }

      if (badTVParams.show) {
        composer.addPass(badTVPass);
      }

      if (rgbParams.show) {
        composer.addPass(rgbPass);
      }

      if (staticParams.show) {
        composer.addPass(staticPass);
      }

      composer.addPass(copyPass);
      copyPass.renderToScreen = true;
    }

    function animate() {
      shaderTime += 0.1;
      badTVPass.uniforms["time"].value = shaderTime;
      filmPass.uniforms["time"].value = shaderTime;
      staticPass.uniforms["time"].value = shaderTime;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (videoTexture) videoTexture.needsUpdate = true;
      }

      requestAnimationFrame(animate);
      // composer.render(0.1);
    }

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
  });

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
      }}
    />
  );
};
