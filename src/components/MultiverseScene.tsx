"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

interface MultiverseData {
  nodes: Node[];
  links: Link[];
}

const MultiverseScene: React.FC<{ data: MultiverseData }> = ({ data }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const nodeObjects: { [key: string]: THREE.Mesh } = {};
    data.nodes.forEach((node) => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: node.group === 1 ? 0x4299e1 : 0x48bb78,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      scene.add(sphere);
      nodeObjects[node.id] = sphere;
    });

    data.links.forEach((link) => {
      const sourceNode = nodeObjects[link.source];
      const targetNode = nodeObjects[link.target];
      if (sourceNode && targetNode) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          sourceNode.position,
          targetNode.position,
        ]);
        const material = new THREE.LineBasicMaterial({ color: 0x999999 });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      }
    });

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [data, isActive]);

  const handleActivate = () => setIsActive(true);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-4">
        {!isActive && (
          <button
            className="bg-gradient-to-r from-[#86AB89] to-[#A28B55] text-xl font-semibold py-2 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl hover:underline focus:outline-none"
            onClick={handleActivate}
          >
            🌌 Explore the Knowledge Tree
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiverseScene;
