 import { useState, useRef, Suspense, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Html } from '@react-three/drei'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Info, Hand, Package } from 'lucide-react'
import * as THREE from 'three'

// Inverse kinematics helper to calculate arm angles for target position
const calculateIK = (targetX, targetY, arm1Length, arm2Length) => {
  const distance = Math.sqrt(targetX * targetX + targetY * targetY)
  const maxReach = arm1Length + arm2Length
  const minReach = Math.abs(arm1Length - arm2Length)
  
  // Clamp distance to reachable range
  const clampedDistance = Math.max(minReach + 0.1, Math.min(maxReach - 0.1, distance))
  const scale = clampedDistance / distance
  const clampedX = targetX * scale
  const clampedY = targetY * scale
  
  // Calculate angles using law of cosines
  const cosAngle2 = (clampedX * clampedX + clampedY * clampedY - arm1Length * arm1Length - arm2Length * arm2Length) / (2 * arm1Length * arm2Length)
  const angle2 = Math.acos(Math.max(-1, Math.min(1, cosAngle2)))
  
  const k1 = arm1Length + arm2Length * Math.cos(angle2)
  const k2 = arm2Length * Math.sin(angle2)
  const angle1 = Math.atan2(clampedY, clampedX) - Math.atan2(k2, k1)
  
  return { angle1: angle1 - Math.PI / 2, angle2: Math.PI - angle2 }
}

// Robot Arm Component with mouse following
const RobotArm = ({ mousePosition, isHolding, gripperEndRef }) => {
  const baseRef = useRef()
  const arm1Ref = useRef()
  const arm2Ref = useRef()
  const gripperRef = useRef()
  const gripperLeftRef = useRef()
  const gripperRightRef = useRef()
  
  const arm1Length = 1.6
  const arm2Length = 1.2

  useFrame(() => {
    if (!mousePosition) return
    
    // Calculate base rotation to face mouse X position
    const baseAngle = Math.atan2(mousePosition.x, 2) * 0.8
    if (baseRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.lerp(baseRef.current.rotation.y, baseAngle, 0.1)
    }
    
    // Calculate IK for arm segments
    const targetY = mousePosition.y + 1.5 // Offset for base height
    const targetX = Math.sqrt(mousePosition.x * mousePosition.x + 4) - 1 // Distance from base
    
    const { angle1, angle2 } = calculateIK(targetX, targetY, arm1Length, arm2Length)
    
    if (arm1Ref.current) {
      arm1Ref.current.rotation.z = THREE.MathUtils.lerp(arm1Ref.current.rotation.z, angle1, 0.1)
    }
    if (arm2Ref.current) {
      arm2Ref.current.rotation.z = THREE.MathUtils.lerp(arm2Ref.current.rotation.z, angle2, 0.1)
    }
    
    // Animate gripper based on holding state
    const gripperOpen = isHolding ? 0.05 : 0.15
    if (gripperLeftRef.current) {
      gripperLeftRef.current.position.x = THREE.MathUtils.lerp(gripperLeftRef.current.position.x, -gripperOpen, 0.2)
    }
    if (gripperRightRef.current) {
      gripperRightRef.current.position.x = THREE.MathUtils.lerp(gripperRightRef.current.position.x, gripperOpen, 0.2)
    }
    
    // Update gripper end position for collision detection
    if (gripperRef.current && gripperEndRef) {
      const worldPos = new THREE.Vector3()
      gripperRef.current.getWorldPosition(worldPos)
      gripperEndRef.current = worldPos
    }
  })

  return (
    <group position={[0, -1.5, 0]}>
      {/* Base Platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.3, 32]} />
        <meshStandardMaterial color="#2D2D2D" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rotating Base */}
      <group ref={baseRef} position={[0, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#8B1A1A" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* First Arm Segment */}
        <group ref={arm1Ref} position={[0, 0.4, 0]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.4, 1.6, 0.4]} />
            <meshStandardMaterial color="#e86a0b" metalness={0.5} roughness={0.4} />
          </mesh>
          
          {/* Joint */}
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="#2D2D2D" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Second Arm Segment */}
          <group ref={arm2Ref} position={[0, 1.6, 0]}>
            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[0.3, 1.2, 0.3]} />
              <meshStandardMaterial color="#8B1A1A" metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Wrist Joint */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color="#2D2D2D" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Gripper */}
            <group ref={gripperRef} position={[0, 1.4, 0]}>
              <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.25, 0.3, 0.25]} />
                <meshStandardMaterial color="#e86a0b" metalness={0.5} roughness={0.4} />
              </mesh>
              
              {/* Gripper Fingers */}
              <mesh ref={gripperLeftRef} position={[-0.15, 0.4, 0]}>
                <boxGeometry args={[0.08, 0.3, 0.15]} />
                <meshStandardMaterial color="#2D2D2D" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh ref={gripperRightRef} position={[0.15, 0.4, 0]}>
                <boxGeometry args={[0.08, 0.3, 0.15]} />
                <meshStandardMaterial color="#2D2D2D" metalness={0.6} roughness={0.3} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Floor Grid */}
      <gridHelper args={[12, 24, '#8B1A1A', '#444444']} position={[0, -0.15, 0]} />
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

// Cube Component that can be picked up
const PickableCube = ({ id, initialPosition, isHeld, heldPosition, gripperEndRef, onDropped }) => {
  const meshRef = useRef()
  const [isOnRightBelt, setIsOnRightBelt] = useState(false)
  const [wasHeld, setWasHeld] = useState(false)
  const velocityRef = useRef({ x: 0, y: 0 })
  
  useFrame(() => {
    if (!meshRef.current) return
    
    if (isHeld && heldPosition) {
      // Follow gripper when held
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, heldPosition.x, 0.3)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, heldPosition.y - 0.4, 0.3)
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, heldPosition.z, 0.3)
      setWasHeld(true)
    } else if (wasHeld && !isHeld) {
      // Just dropped - check if on right belt
      const x = meshRef.current.position.x
      if (x > 1 && x < 6) {
        setIsOnRightBelt(true)
        meshRef.current.position.y = -1.05
        if (onDropped) onDropped(id)
      } else {
        // Dropped elsewhere - fall and reset
        meshRef.current.position.y -= 0.05
        if (meshRef.current.position.y < -3) {
          meshRef.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2])
          setWasHeld(false)
        }
      }
    } else if (isOnRightBelt) {
      // Move along right belt
      meshRef.current.position.x += 0.015
      if (meshRef.current.position.x > 7) {
        // Reset cube to left belt
        meshRef.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2])
        setIsOnRightBelt(false)
        setWasHeld(false)
      }
    } else {
      // Move along left belt (incoming)
      meshRef.current.position.x += 0.01
      // Stop at pickup zone
      if (meshRef.current.position.x > -1.5) {
        meshRef.current.position.x = -1.5
      }
    }
    
    // Rotate slightly for visual interest
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh 
      ref={meshRef} 
      position={initialPosition}
    >
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial 
        color={isHeld ? "#e86a0b" : "#8B1A1A"} 
        metalness={0.4} 
        roughness={0.5}
        emissive={isHeld ? "#e86a0b" : "#000000"}
        emissiveIntensity={isHeld ? 0.3 : 0}
      />
    </mesh>
  )
}

// Scene Manager Component
const SceneManager = ({ mousePosition, isHolding, setIsHolding, score, setScore }) => {
  const gripperEndRef = useRef(new THREE.Vector3())
  const [cubes] = useState([
    { id: 1, position: [-5, -1.05, 0] },
    { id: 2, position: [-7, -1.05, 0] },
    { id: 3, position: [-9, -1.05, 0] },
  ])
  const [heldCubeId, setHeldCubeId] = useState(null)
  const cubePositions = useRef({})
  
  // Register cube position updates
  const updateCubePosition = useCallback((id, position) => {
    cubePositions.current[id] = position.clone()
  }, [])
  
  // Check for cube pickup when holding starts
  useEffect(() => {
    if (isHolding && !heldCubeId && gripperEndRef.current) {
      // Find nearest cube within range
      let nearestId = null
      let nearestDist = 1.0 // Max pickup distance
      
      Object.entries(cubePositions.current).forEach(([id, pos]) => {
        if (pos) {
          const distance = gripperEndRef.current.distanceTo(pos)
          if (distance < nearestDist) {
            nearestDist = distance
            nearestId = parseInt(id)
          }
        }
      })
      
      if (nearestId !== null) {
        setHeldCubeId(nearestId)
      }
    }
  }, [isHolding])
  
  // Release cube when mouse released
  useEffect(() => {
    if (!isHolding && heldCubeId !== null) {
      setHeldCubeId(null)
    }
  }, [isHolding])
  
  const handleCubeDropped = useCallback((id) => {
    setScore(prev => prev + 1)
  }, [setScore])

  return (
    <>
      <RobotArm 
        mousePosition={mousePosition} 
        isHolding={isHolding && heldCubeId !== null}
        gripperEndRef={gripperEndRef}
      />
      
      {/* Left Conveyor Belt (incoming cubes) */}
      <ConveyorBelt position={[-3.5, -1.35, 0]} direction={1} color="#3d3d3d" />
      
      {/* Right Conveyor Belt (outgoing cubes) */}
      <ConveyorBelt position={[3.5, -1.35, 0]} direction={1} color="#3d3d3d" />
      
      {/* Cubes */}
      {cubes.map((cube) => (
        <PickableCubeWithRef
          key={cube.id}
          id={cube.id}
          initialPosition={cube.position}
          isHeld={heldCubeId === cube.id}
          heldPosition={gripperEndRef.current}
          onDropped={handleCubeDropped}
          updatePosition={updateCubePosition}
        />
      ))}
      
      {/* Drop Zone Indicator on right belt */}
      <mesh position={[3.5, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 1.2]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.15} />
      </mesh>
      
      {/* Pickup Zone Indicator on left belt */}
      <mesh position={[-1.5, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.2]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.15} />
      </mesh>
    </>
  )
}

// Wrapper component to track cube positions
const PickableCubeWithRef = ({ id, initialPosition, isHeld, heldPosition, onDropped, updatePosition }) => {
  const meshRef = useRef()
  const [isOnRightBelt, setIsOnRightBelt] = useState(false)
  const [wasHeld, setWasHeld] = useState(false)
  
  useFrame(() => {
    if (!meshRef.current) return
    
    // Update position tracking
    const worldPos = new THREE.Vector3()
    meshRef.current.getWorldPosition(worldPos)
    updatePosition(id, worldPos)
    
    if (isHeld && heldPosition) {
      // Follow gripper when held
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, heldPosition.x, 0.25)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, heldPosition.y - 0.5, 0.25)
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, heldPosition.z, 0.25)
      setWasHeld(true)
    } else if (wasHeld && !isHeld) {
      // Just dropped - check if on right belt
      const x = meshRef.current.position.x
      if (x > 1 && x < 6) {
        setIsOnRightBelt(true)
        meshRef.current.position.y = -1.05
        onDropped(id)
        setWasHeld(false)
      } else {
        // Dropped elsewhere - fall and reset
        meshRef.current.position.y -= 0.08
        if (meshRef.current.position.y < -3) {
          meshRef.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2])
          setWasHeld(false)
        }
      }
    } else if (isOnRightBelt) {
      // Move along right belt
      meshRef.current.position.x += 0.02
      if (meshRef.current.position.x > 7) {
        // Reset cube to left belt
        meshRef.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2])
        setIsOnRightBelt(false)
      }
    } else {
      // Move along left belt (incoming)
      meshRef.current.position.x += 0.012
      // Stop at pickup zone
      if (meshRef.current.position.x > -1.5) {
        meshRef.current.position.x = -1.5
      }
    }
    
    // Rotate slightly for visual interest
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[0.45, 0.45, 0.45]} />
      <meshStandardMaterial 
        color={isHeld ? "#e86a0b" : "#8B1A1A"} 
        metalness={0.4} 
        roughness={0.5}
        emissive={isHeld ? "#ff8800" : "#000000"}
        emissiveIntensity={isHeld ? 0.4 : 0}
      />
    </mesh>
  )
}

// Mouse tracker component
const MouseTracker = ({ setMousePosition }) => {
  const { camera, size } = useThree()
  
  const handleMouseMove = useCallback((event) => {
    const rect = event.target.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    
    // Convert to 3D position on a plane
    const vector = new THREE.Vector3(x, y, 0.5)
    vector.unproject(camera)
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(distance * 0.6))
    
    setMousePosition({ x: pos.x * 1.5, y: pos.y * 1.5 + 1 })
  }, [camera, setMousePosition])
  
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove)
      return () => canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])
  
  return null
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
  const [mousePosition, setMousePosition] = useState(null)
  const [isHolding, setIsHolding] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [score, setScore] = useState(0)
  const canvasRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) {
      setIsHolding(true)
    }
  }, [])

  const handleMouseUp = useCallback((e) => {
    if (e.button === 0) {
      setIsHolding(false)
    }
  }, [])

  const handleReset = () => {
    setScore(0)
  }

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
            Interactive Robot Arm Experience
          </h1>
          <p className="text-white/70 mt-2">
            Control the robot arm with your mouse to move cubes between conveyor belts!
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div 
            className="relative h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsHolding(false)}
          >
            <Canvas shadows ref={canvasRef}>
              <Suspense fallback={<LoadingSpinner />}>
                <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={50} />
                
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
                <SceneManager 
                  mousePosition={mousePosition}
                  isHolding={isHolding}
                  setIsHolding={setIsHolding}
                  score={score}
                  setScore={setScore}
                />
                
                <MouseTracker setMousePosition={setMousePosition} />
                
                <Environment preset="warehouse" />
              </Suspense>
            </Canvas>

            {/* Score Display */}
            <div className="absolute top-4 right-4 bg-stac-red text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Package size={20} />
                <span className="font-heading font-bold text-xl">{score}</span>
                <span className="text-sm opacity-80">cubes moved</span>
              </div>
            </div>

            {/* Instructions Overlay */}
            {showInstructions && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-stac-charcoal">How to Play</h3>
                  <button 
                    onClick={() => setShowInstructions(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <Hand size={16} className="text-stac-red flex-shrink-0 mt-0.5" />
                    <span><strong>Move mouse</strong> to control the robot arm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-stac-charcoal rounded flex-shrink-0 mt-0.5" />
                    <span><strong>Click & hold</strong> near a cube to grab it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package size={16} className="text-stac-orange flex-shrink-0 mt-0.5" />
                    <span><strong>Release</strong> over the right belt to drop</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Info Button */}
            {!showInstructions && (
              <button
                onClick={() => setShowInstructions(true)}
                className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stac-gray transition-colors"
              >
                <Info size={20} className="text-stac-charcoal" />
              </button>
            )}

            {/* Holding Indicator */}
            {isHolding && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-stac-orange text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <Hand size={18} />
                  <span className="font-medium">Grabbing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Controls Panel */}
          <div className="bg-stac-gray p-6 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Reset Score
                </button>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Tip:</span> Move cubes from the left belt to the right belt to score points!
              </div>
            </div>
          </div>
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
