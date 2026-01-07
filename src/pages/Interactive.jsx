 import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Html, OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import * as THREE from 'three'

// Automated Robot Arm - moves automatically to pick and place cubes
const RobotArm = ({ gripperEndRef }) => {
  const baseRef = useRef()
  const arm1Ref = useRef()
  const arm2Ref = useRef()
  const gripperRef = useRef()
  const gripperLeftRef = useRef()
  const gripperRightRef = useRef()
  
  // Automated animation state
  const animationState = useRef({
    phase: 'pickup', // 'pickup', 'lift', 'rotate', 'drop', 'return'
    time: 0
  })

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Automated smooth animation cycle
    const cycleTime = 8 // seconds per full cycle
    const t = (time % cycleTime) / cycleTime
    
    // Define keyframes for the animation
    let baseAngle, arm1Angle, arm2Angle, gripperOpen
    
    if (t < 0.15) {
      // Phase 1: Position over left belt (pickup position)
      baseAngle = Math.PI / 2.5
      arm1Angle = 0.6
      arm2Angle = 1.2
      gripperOpen = 0.18
    } else if (t < 0.25) {
      // Phase 2: Close gripper (grab)
      baseAngle = Math.PI / 2.5
      arm1Angle = 0.6
      arm2Angle = 1.2
      gripperOpen = 0.08
    } else if (t < 0.4) {
      // Phase 3: Lift up
      baseAngle = Math.PI / 2.5
      arm1Angle = 0.2
      arm2Angle = 0.6
      gripperOpen = 0.08
    } else if (t < 0.6) {
      // Phase 4: Rotate to right belt
      baseAngle = -Math.PI / 2.5
      arm1Angle = 0.2
      arm2Angle = 0.6
      gripperOpen = 0.08
    } else if (t < 0.75) {
      // Phase 5: Lower to drop position
      baseAngle = -Math.PI / 2.5
      arm1Angle = 0.6
      arm2Angle = 1.2
      gripperOpen = 0.08
    } else if (t < 0.85) {
      // Phase 6: Open gripper (release)
      baseAngle = -Math.PI / 2.5
      arm1Angle = 0.6
      arm2Angle = 1.2
      gripperOpen = 0.18
    } else {
      // Phase 7: Return to pickup position
      baseAngle = Math.PI / 2.5
      arm1Angle = 0.3
      arm2Angle = 0.8
      gripperOpen = 0.18
    }
    
    // Apply smooth interpolation
    if (baseRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.lerp(baseRef.current.rotation.y, baseAngle, 0.05)
    }
    if (arm1Ref.current) {
      arm1Ref.current.rotation.z = THREE.MathUtils.lerp(arm1Ref.current.rotation.z, arm1Angle, 0.05)
    }
    if (arm2Ref.current) {
      arm2Ref.current.rotation.z = THREE.MathUtils.lerp(arm2Ref.current.rotation.z, arm2Angle, 0.05)
    }
    
    // Animate gripper
    if (gripperLeftRef.current) {
      gripperLeftRef.current.position.x = THREE.MathUtils.lerp(gripperLeftRef.current.position.x, -gripperOpen, 0.1)
    }
    if (gripperRightRef.current) {
      gripperRightRef.current.position.x = THREE.MathUtils.lerp(gripperRightRef.current.position.x, gripperOpen, 0.1)
    }
    
    // Update gripper end position
    if (gripperRef.current && gripperEndRef) {
      const worldPos = new THREE.Vector3()
      gripperRef.current.getWorldPosition(worldPos)
      gripperEndRef.current = worldPos
    }
  })

  return (
    <group position={[0, -2, 0]}>
      {/* Base Platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.2, 0.4, 32]} />
        <meshStandardMaterial color="#2D2D2D" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rotating Base */}
      <group ref={baseRef} position={[0, 0.4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.7, 0.5, 32]} />
          <meshStandardMaterial color="#8B1A1A" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* First Arm Segment (Shoulder) */}
        <group ref={arm1Ref} position={[0, 0.5, 0]}>
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[0.35, 1.8, 0.35]} />
            <meshStandardMaterial color="#e86a0b" metalness={0.5} roughness={0.4} />
          </mesh>
          
          {/* Shoulder Joint */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color="#2D2D2D" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Elbow Joint */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#2D2D2D" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Second Arm Segment (Forearm) */}
          <group ref={arm2Ref} position={[0, 1.8, 0]}>
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[0.28, 1.4, 0.28]} />
              <meshStandardMaterial color="#8B1A1A" metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Wrist Joint */}
            <mesh position={[0, 1.4, 0]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#2D2D2D" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Gripper */}
            <group ref={gripperRef} position={[0, 1.6, 0]}>
              <mesh position={[0, 0.12, 0]}>
                <boxGeometry args={[0.3, 0.25, 0.3]} />
                <meshStandardMaterial color="#e86a0b" metalness={0.5} roughness={0.4} />
              </mesh>
              
              {/* Gripper Fingers */}
              <mesh ref={gripperLeftRef} position={[-0.18, 0.35, 0]}>
                <boxGeometry args={[0.08, 0.35, 0.18]} />
                <meshStandardMaterial color="#2D2D2D" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh ref={gripperRightRef} position={[0.18, 0.35, 0]}>
                <boxGeometry args={[0.08, 0.35, 0.18]} />
                <meshStandardMaterial color="#2D2D2D" metalness={0.6} roughness={0.3} />
              </mesh>
              
              {/* Gripper indicator */}
              <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial 
                  color="#ff6600" 
                  emissive="#ff6600"
                  emissiveIntensity={0.6}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Floor Grid */}
      <gridHelper args={[14, 28, '#8B1A1A', '#444444']} position={[0, 0, 0]} />
    </group>
  )
}

// Conveyor Belt Component
const ConveyorBelt = ({ position, direction = 1, color = "#444444" }) => {
  const stripeRefs = useRef([])
  
  useFrame((state) => {
    stripeRefs.current.forEach((stripe, i) => {
      if (stripe) {
        const offset = ((state.clock.getElapsedTime() * direction * 0.5) + i * 0.5) % 4 - 2
        stripe.position.x = offset
      }
    })
  })

  return (
    <group position={position}>
      {/* Belt Base */}
      <mesh>
        <boxGeometry args={[5, 0.3, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Belt Surface */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[5, 0.1, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Moving Stripes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh 
          key={i} 
          ref={el => stripeRefs.current[i] = el}
          position={[i * 0.5 - 2, 0.26, 0]}
        >
          <boxGeometry args={[0.1, 0.02, 1.0]} />
          <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}

      {/* Side Rails */}
      <mesh position={[0, 0.35, 0.55]}>
        <boxGeometry args={[5, 0.2, 0.1]} />
        <meshStandardMaterial color="#666666" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.35, -0.55]}>
        <boxGeometry args={[5, 0.2, 0.1]} />
        <meshStandardMaterial color="#666666" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Legs */}
      {[-2, 0, 2].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.5, 0.4]}>
            <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
            <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[x, -0.5, -0.4]}>
            <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
            <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Automated Cube Component - moves automatically with the robot arm
const AutomatedCube = ({ id, initialPosition, gripperEndRef }) => {
  const meshRef = useRef()
  const stateRef = useRef({
    phase: 'belt', // 'belt', 'held', 'dropping', 'rightBelt'
    startTime: id * 2.5 // Stagger cube timing
  })
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    const cycleTime = 8
    const offset = stateRef.current.startTime
    const t = ((time + offset) % cycleTime) / cycleTime
    
    // Sync cube movement with robot arm animation
    if (t < 0.15) {
      // Move along left belt toward pickup
      const beltProgress = t / 0.15
      meshRef.current.position.x = THREE.MathUtils.lerp(-6, -2.5, beltProgress)
      meshRef.current.position.y = -1.55
      meshRef.current.position.z = 0
    } else if (t < 0.25) {
      // Being grabbed - stay at pickup position
      meshRef.current.position.x = -2.5
      meshRef.current.position.y = -1.55
      meshRef.current.position.z = 0
    } else if (t < 0.4) {
      // Being lifted
      const liftProgress = (t - 0.25) / 0.15
      meshRef.current.position.x = -2.5
      meshRef.current.position.y = THREE.MathUtils.lerp(-1.55, 0.5, liftProgress)
      meshRef.current.position.z = 0
    } else if (t < 0.6) {
      // Being moved to right belt
      const moveProgress = (t - 0.4) / 0.2
      meshRef.current.position.x = THREE.MathUtils.lerp(-2.5, 2.5, moveProgress)
      meshRef.current.position.y = 0.5
      meshRef.current.position.z = 0
    } else if (t < 0.75) {
      // Being lowered
      const lowerProgress = (t - 0.6) / 0.15
      meshRef.current.position.x = 2.5
      meshRef.current.position.y = THREE.MathUtils.lerp(0.5, -1.55, lowerProgress)
      meshRef.current.position.z = 0
    } else if (t < 0.85) {
      // Released on right belt
      meshRef.current.position.x = 2.5
      meshRef.current.position.y = -1.55
      meshRef.current.position.z = 0
    } else {
      // Move along right belt and reset
      const exitProgress = (t - 0.85) / 0.15
      meshRef.current.position.x = THREE.MathUtils.lerp(2.5, 7, exitProgress)
      meshRef.current.position.y = -1.55
      meshRef.current.position.z = 0
    }
    
    // Rotate slightly for visual interest
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[0.45, 0.45, 0.45]} />
      <meshStandardMaterial 
        color="#8B1A1A" 
        metalness={0.4} 
        roughness={0.5}
      />
    </mesh>
  )
}

// Simplified Scene Manager Component - automated demo
const SceneManager = () => {
  const gripperEndRef = useRef(new THREE.Vector3())
  const cubes = [
    { id: 1, position: [-6, -1.55, 0] },
    { id: 2, position: [-6, -1.55, 0] },
    { id: 3, position: [-6, -1.55, 0] },
  ]

  return (
    <>
      <RobotArm gripperEndRef={gripperEndRef} />
      
      {/* Left Conveyor Belt (incoming cubes) */}
      <ConveyorBelt position={[-3.5, -1.85, 0]} direction={1} color="#3d3d3d" />
      
      {/* Right Conveyor Belt (outgoing cubes) */}
      <ConveyorBelt position={[3.5, -1.85, 0]} direction={1} color="#3d3d3d" />
      
      {/* Automated Cubes */}
      {cubes.map((cube) => (
        <AutomatedCube
          key={cube.id}
          id={cube.id}
          initialPosition={cube.position}
          gripperEndRef={gripperEndRef}
        />
      ))}
    </>
  )
}

const LoadingSpinner = () => (
  <Html center>
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-stac-red border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-stac-charcoal font-medium">Loading 3D Scene...</p>
    </div>
  </Html>
)

const Interactive = () => {
  const canvasRef = useRef(null)

  return (
    <div className="min-h-screen bg-stac-gray pt-20">
      {/* Header */}
      <div className="bg-stac-charcoal py-8">
        <div className="container-custom">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Automated Robot Arm Demo
          </h1>
          <p className="text-white/70 mt-2">
            Watch our precision robotic arm automatically transfer cubes between conveyor belts.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="container-custom py-8">
        <div className="h-[500px] md:h-[600px] overflow-hidden">
          <Canvas shadows ref={canvasRef}>
            <Suspense fallback={<LoadingSpinner />}>
              <PerspectiveCamera makeDefault position={[0, 8, 15]} fov={60} />
              <OrbitControls 
                enablePan={true} 
                enableZoom={true} 
                enableRotate={true}
                minDistance={8}
                maxDistance={30}
              />
              
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1.2} 
                castShadow 
                shadow-mapSize={[2048, 2048]}
              />
              <pointLight position={[-5, 5, -5]} intensity={0.5} color="#e86a0b" />
              <pointLight position={[5, 3, 5]} intensity={0.3} color="#ffffff" />
              
              {/* Scene */}
              <SceneManager />
              
              <Environment preset="warehouse" />
            </Suspense>
          </Canvas>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: 'Precision Control',
              description: 'Our robotic systems offer sub-millimeter accuracy for consistent, high-quality production.'
            },
            {
              title: 'Automation Integration',
              description: 'Seamlessly integrate robotic handling with injection molding for efficient manufacturing.'
            },
            {
              title: 'Custom Solutions',
              description: 'We design custom automation solutions tailored to your specific production requirements.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="font-heading font-bold text-lg text-stac-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 pb-8">
          <p className="text-gray-600 mb-4">
            Interested in automation solutions for your manufacturing process?
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interactive
