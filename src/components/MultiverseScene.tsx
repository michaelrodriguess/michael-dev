import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
  const [isActive, setIsActive] = useState(false); // Estado para controlar se o componente está ativo

  useEffect(() => {
    if (!mountRef.current || !isActive) return; // Só inicializa o Three.js se estiver ativo

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );

    // Configuração para fundo transparente
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparente
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create nodes
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

    // Create links
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    // Handle keypress for 'Esc' to deactivate
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsActive(false); // Desativa o componente ao pressionar 'Esc'
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [data, isActive]); // Dependência adicionada para o estado ativo

  // Função para ativar a renderização ao clicar
  const handleActivate = () => setIsActive(true);

  // Ajuste o tamanho e a visibilidade
  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '50vh', cursor: 'pointer' }}
      onClick={handleActivate}
    >
      {!isActive && (
        <div className="flex items-center justify-center h-full w-full text-white">
          Clique para ativar
        </div>
      )}
    </div>
  );
};

export default MultiverseScene;
