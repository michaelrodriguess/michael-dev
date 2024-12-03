"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ProjectModal } from "./ProjectModal";
import { ProjectDetails } from "./ProjectCard";

interface Node {
  id: string;
  group: number;
  project: ProjectDetails;
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
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null
  );

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

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

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

      // Associando o ID do nó ao Mesh para referência no clique
      sphere.userData = { project: node.project };
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

    const handleMouseClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Object.values(nodeObjects));

      if (intersects.length > 0) {
        const project = intersects[0].object.userData.project;
        setSelectedProject(project);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);
    currentMount.addEventListener("click", handleMouseClick);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      currentMount.removeEventListener("click", handleMouseClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [data, isActive]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      {!isActive && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="p-2 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
              🚧 Work in Progress 🚀
            </h2>
            <p className="mt-1 text-xs text-white/70 italic">
              Something amazing is coming soon!
            </p>
          </div>
        </div>
      )}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default MultiverseScene;
