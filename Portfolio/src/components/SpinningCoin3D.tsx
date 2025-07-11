import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface SpinningCoin3DProps {
  imageSrc: string;
  size?: number;
}

const SpinningCoin3D: React.FC<SpinningCoin3DProps> = ({ imageSrc, size = 320 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const coinRef = useRef<THREE.Mesh>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    let didSucceed = false;
    const timeoutId = setTimeout(() => {
      if (!didSucceed && isLoading) {
        setShowFallback(true);
        setIsLoading(false);
      }
    }, 5000);

    const width = size;
    const height = size;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.z = 3.2;
    camera.position.y = 0.1;
    scene.background = null;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Coin geometry - rotate 90 degrees to make it stand upright
    const geometry = new THREE.CylinderGeometry(1, 1, 0.18, 64, 1, false);
    geometry.rotateZ(Math.PI / 2);

    // Edge material
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.8,
      roughness: 0.3,
    });

    // Load both front and back logo textures
    const loader = new THREE.TextureLoader();
    let frontTexture: THREE.Texture | null = null;
    let backTexture: THREE.Texture | null = null;
    let disposed = false;

    loader.load(
      imageSrc,
      (texture) => {
        if (disposed) return;
        frontTexture = texture;
        frontTexture.colorSpace = THREE.SRGBColorSpace;
        // Now load the back texture (flipped horizontally)
        loader.load(
          imageSrc,
          (backTex) => {
            if (disposed) return;
            backTexture = backTex;
            backTexture.colorSpace = THREE.SRGBColorSpace;
            backTexture.center.set(0.5, 0.5);
            backTexture.rotation = Math.PI; // Flip horizontally
            // Materials: [side, top, bottom]
            const frontMaterial = new THREE.MeshStandardMaterial({
              map: frontTexture,
              metalness: 0.7,
              roughness: 0.25,
              color: 0xffffff,
            });
            const backMaterial = new THREE.MeshStandardMaterial({
              map: backTexture,
              metalness: 0.7,
              roughness: 0.25,
              color: 0xffffff,
            });
            const materials = [edgeMaterial, frontMaterial, backMaterial];
            const coin = new THREE.Mesh(geometry, materials);
            coin.castShadow = true;
            coin.receiveShadow = true;
            coin.position.y = 0.1;
            scene.add(coin);
            coinRef.current = coin;
            didSucceed = true;
            clearTimeout(timeoutId);
            setIsLoading(false);
          },
          undefined,
          (error) => {
            if (disposed) return;
            clearTimeout(timeoutId);
            setError('Failed to load back image');
            setIsLoading(false);
          }
        );
      },
      undefined,
      (error) => {
        if (disposed) return;
        clearTimeout(timeoutId);
        setError('Failed to load front image');
        setIsLoading(false);
      }
    );

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(3, 2, 3);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 2048;
    directional.shadow.mapSize.height = 2048;
    scene.add(directional);
    const pointLight = new THREE.PointLight(0xffffff, 0.6, 10);
    pointLight.position.set(-2, 1, 2);
    scene.add(pointLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 0, -3);
    scene.add(rimLight);

    // Animation loop
    const animate = () => {
      if (coinRef.current) {
        coinRef.current.rotation.y += 0.025;
        coinRef.current.rotation.z = Math.sin(Date.now() * 0.0005) * 0.05;
      }
      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };
    animate();

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Responsive resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const parent = mountRef.current.parentElement;
      if (!parent) return;
      const newSize = Math.min(parent.offsetWidth, 400);
      renderer.setSize(newSize, newSize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      disposed = true;
      clearTimeout(timeoutId);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      edgeMaterial.dispose();
      if (frontTexture) frontTexture.dispose();
      if (backTexture) backTexture.dispose();
      renderer.dispose();
    };
  }, [imageSrc, size]);

  if (error) {
    return (
      <div style={{ 
        width: size, 
        height: size, 
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        color: "#666"
      }}>
        <div>Failed to load 3D coin</div>
      </div>
    );
  }

  // Fallback component with CSS animation
  if (showFallback) {
    return (
      <div style={{
        width: size,
        height: size,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img 
          src={imageSrc} 
          alt="ACM Logo"
          style={{
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: "50%",
            animation: "spin 3s linear infinite",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
          }}
        />
        <style>{`
          @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: size, 
        height: size, 
        margin: "0 auto",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }} 
    >
      {isLoading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#666",
          fontSize: "14px"
        }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default SpinningCoin3D; 