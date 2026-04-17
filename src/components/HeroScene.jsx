import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Preload } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Subtle geometric rings/shapes floating in the background
function FloatingGeometry() {
  const groupRef = useRef(null)

  // Mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return
    const targetX = (state.pointer.x * 0.5)
    const targetY = (state.pointer.y * 0.5)
    
    // Smooth damp towards mouse
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 2
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * delta * 2
  })

  return (
    <group ref={groupRef}>
      {/* Torus 1 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[-2, 1, -4]}>
        <mesh>
          <torusGeometry args={[1.5, 0.04, 16, 100]} />
          <meshStandardMaterial color="#2997ff" transparent opacity={0.3} roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      {/* Torus 2 */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[3, -1, -5]}>
        <mesh>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#a259ff" transparent opacity={0.25} roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>
      
      {/* Icosahedron */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1} position={[0, -2.5, -3]}>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#1d1d1f" transparent opacity={0.15} wireframe />
        </mesh>
      </Float>
    </group>
  )
}

function SceneControls({ scrollTargetRef }) {
  const { camera } = useThree()
  
  // Set up GSAP scroll proxy for the camera
  useFrame(() => {
    if (scrollTargetRef.current) {
      // Create a zoom effect based on GSAP scrolling
      // We read the computed scale/opacity from the DOM element driven by GSAP
      const scaleStr = scrollTargetRef.current.style.getPropertyValue('--scroll-zoom') || "0"
      const zoomValue = parseFloat(scaleStr)
      if (!isNaN(zoomValue)) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 - (zoomValue * 4), 0.1)
      }
    }
  })

  return null
}

export default function HeroScene({ scrollTargetRef }) {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#2997ff" />
        
        <FloatingGeometry />
        <SceneControls scrollTargetRef={scrollTargetRef} />
        <Preload all />
      </Canvas>
    </div>
  )
}
