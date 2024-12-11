import { getFileSrc } from "assets/utils/getFileSrc";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CarousellView({ projects }) {
  const mountRef = useRef(null);

  // Use refs for mutable variables
  const isDragging = useRef(false);
  const startMouseX = useRef(0);
  const startRotationY = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / (window.innerHeight / 2), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    mountRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 4;

    // Add lights
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    // scene.add(ambientLight);

    // Geometry and materials for the project thumbnails
    const planes = [];
    const radius = 1.7; // Distance from the center to the farthest edge of the planes
    const angleIncrement = (2 * Math.PI) / projects.length; // Angle between each plane

    projects.forEach((project, index) => {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(getFileSrc(project.thumbnail)); // Adjust the path to your image file

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const geometry = new THREE.PlaneGeometry(1.5, 1); // Landscape dimensions (wider than tall)
      const plane = new THREE.Mesh(geometry, material);

      const angle = index * angleIncrement;
      const planeWidth = geometry.parameters.width / 2; // Half the width of the plane
      const offsetX = Math.cos(angle) * planeWidth; // Offset to align the left edge
      const offsetZ = Math.sin(angle) * planeWidth;

      plane.position.set(Math.cos(angle) * radius - offsetX, 0, Math.sin(angle) * radius - offsetZ);
      plane.rotation.y = -angle;

      scene.add(plane);
      planes.push(plane);
    });

    // Event Handlers
    const onMouseDown = (event) => {
      isDragging.current = true;
      startMouseX.current = event.clientX;
      startRotationY.current = scene.rotation.y; // Capture the current rotation
    };

    const onMouseMove = (event) => {
      if (isDragging.current) {
        const deltaX = (event.clientX - startMouseX.current) * 0.001; // Adjust sensitivity
        scene.rotation.y = startRotationY.current + deltaX; // Apply the delta to the captured rotation
        velocity.current = deltaX; // Save velocity for inertia
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Add Event Listeners
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const handleResize = () => {
      camera.aspect = window.innerWidth / (window.innerHeight / 2);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isDragging.current) {
        velocity.current *= 0.99; // Gradually reduce velocity
        scene.rotation.y += velocity.current; // Apply velocity to rotation
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [projects]);

  return <div ref={mountRef} style={{ width: "100%", height: "50vh" }} />;
}
