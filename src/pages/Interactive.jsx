 import { useState, useRef, Suspense, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Html, OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Info, Package, Maximize2, Minimize2, ArrowUp, ArrowDown, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import * as THREE from 'three'

// Robot Arm with keyboard controls
const RobotArm = ({ controls, isHolding, gripperEndRef }) => {
  const baseRef = useRef()
  const arm1Ref = useRef()
  const arm2Ref = useRef()
  const gripperRef = useRef()
  const gripperLeftRef = useRef()
  const gripperRightRef = useRef()
  
  // Joint angles controlled by keyboard
  const angles = useRef({
    base: 0,      // unlimited rotation (360 degrees)
    arm1: 0.2,    // -0.8 to 1.0 (shoulder) - adjusted for better reach
    arm2: 0.5     // -1.0 to 1.8 (elbow) - extended range
  })

  useFrame(() => {
    // Update angles based on keyboard input
    const speed = 0.03
    
    // Left/Right arrow - rotate base (360 degrees, no limits)
    if (controls.left) angles.current.base += speed
    if (controls.right) angles.current.base -= speed
    
    // Up/Down arrow - move arm1 (shoulder)
    if (controls.up) angles.current.arm1 = Math.max(-0.8, angles.current.arm1 - speed)
    if (controls.down) angles.current.arm1 = Math.min(1.0, angles.current.arm1 + speed)
    
    // W/S - move arm2 (elbow)
    if (controls.w) angles.current.arm2 = Math.max(-1.0, angles.current.arm2 - speed)
    if (controls.s) angles.current.arm2 = Math.min(1.8, angles.current.arm2 + speed)
    
    // Apply angles with smooth interpolation
    if (baseRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.lerp(baseRef.current.rotation.y, angles.current.base, 0.1)
    }
    if (arm1Ref.current) {
      arm1Ref.current.rotation.z = THREE.MathUtils.lerp(arm1Ref.current.rotation.z, angles.current.arm1, 0.1)
    }
    if (arm2Ref.current) {
      arm2Ref.current.rotation.z = THREE.MathUtils.lerp(arm2Ref.current.rotation.z, angles.current.arm2, 0.1)
    }
    
    // Animate gripper based on holding state
    const gripperOpen = isHolding ? 0.08 : 0.18
    if (gripperLeftRef.current) {
      gripperLeftRef.current.position.x = THREE.MathUtils.lerp(gripperLeftRef.current.position.x, -gripperOpen, 0.15)
    }
    if (gripperRightRef.current) {
      gripperRightRef.current.position.x = THREE.MathUtils.lerp(gripperRightRef.current.position.x, gripperOpen, 0.15)
    }
    
    // Update gripper end position for collision detection
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
                  color={isHolding ? "#00ff00" : "#ff6600"} 
                  emissive={isHolding ? "#00ff00" : "#ff6600"}
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
const SceneManager = ({ controls, isHolding, score, setScore, gameOver, setGameOver, resetTrigger }) => {
  const gripperEndRef = useRef(new THREE.Vector3())
  const [cubes] = useState([
    { id: 1, position: [-4, -1.55, 0] },
    { id: 2, position: [-5.5, -1.55, 0] },
    { id: 3, position: [-7, -1.55, 0] },
  ])
  const [heldCubeId, setHeldCubeId] = useState(null)
  const cubePositions = useRef({})
  const prevIsHolding = useRef(false)
  const cubesInPickupZone = useRef(0)
  const droppedCubes = useRef(new Set())
  const cubeResetTrigger = useRef(0)
  
  // Register cube position updates
  const updateCubePosition = useCallback((id, position) => {
    cubePositions.current[id] = position.clone()
  }, [])
  
  // Reset game state when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > cubeResetTrigger.current) {
      setHeldCubeId(null)
      cubePositions.current = {}
      droppedCubes.current = new Set()
      cubesInPickupZone.current = 0
      cubeResetTrigger.current = resetTrigger
    }
  }, [resetTrigger])

  // Check for cube pickup and game over conditions
  useFrame(() => {
    if (gameOver) return // Don't process if game is over
    
    // Count cubes in pickup zone
    let cubesInZone = 0
    Object.entries(cubePositions.current).forEach(([id, pos]) => {
      if (pos && pos.x >= -3.5 && pos.x <= -1.5 && pos.y >= -2) {
        cubesInZone++
      }
    })
    cubesInPickupZone.current = cubesInZone
    
    // Game over if 3 or more cubes stack in pickup zone
    if (cubesInZone >= 3) {
      setGameOver('Too many cubes stacked! The conveyor belt is blocked.')
      return
    }
    
    // Detect grab key press transition
    if (isHolding && !prevIsHolding.current && heldCubeId === null) {
      // Find nearest cube within range
      let nearestId = null
      let nearestDist = 1.2 // Max pickup distance
      
      const gripperPos = gripperEndRef.current
      if (gripperPos) {
        Object.entries(cubePositions.current).forEach(([id, pos]) => {
          if (pos) {
            const distance = gripperPos.distanceTo(pos)
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
    }
    
    // Detect grab key release transition
    if (!isHolding && prevIsHolding.current && heldCubeId !== null) {
      setHeldCubeId(null)
    }
    
    prevIsHolding.current = isHolding
  })
  
  const handleCubeDropped = useCallback((id, droppedInCorrectZone) => {
    if (droppedInCorrectZone) {
      setScore(prev => prev + 1)
    } else {
      // Game over if cube dropped in wrong place
      setGameOver('Cube dropped in wrong location! Game Over.')
    }
  }, [setScore, setGameOver])

  const handleCubeReset = useCallback((id) => {
    // Remove cube from dropped set when it resets to allow pickup again
    droppedCubes.current.delete(id)
  }, [])

  return (
    <>
      <RobotArm 
        controls={controls} 
        isHolding={isHolding && heldCubeId !== null}
        gripperEndRef={gripperEndRef}
      />
      
      {/* Left Conveyor Belt (incoming cubes) */}
      <ConveyorBelt position={[-3.5, -1.85, 0]} direction={1} color="#3d3d3d" />
      
      {/* Right Conveyor Belt (outgoing cubes) */}
      <ConveyorBelt position={[3.5, -1.85, 0]} direction={1} color="#3d3d3d" />
      
      {/* Cubes */}
      {cubes.map((cube) => (
        <PickableCubeWithRef
          key={cube.id}
          id={cube.id}
          initialPosition={cube.position}
          isHeld={heldCubeId === cube.id}
          heldPosition={gripperEndRef.current}
          onDropped={handleCubeDropped}
          onReset={handleCubeReset}
          updatePosition={updateCubePosition}
          resetTrigger={resetTrigger}
        />
      ))}
      
      {/* Drop Zone Indicator on right belt */}
      <mesh position={[3.5, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 1.2]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
      </mesh>
      
      {/* Pickup Zone Indicator on left belt */}
      <mesh position={[-2.5, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 1.2]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

// Wrapper component to track cube positions
const PickableCubeWithRef = ({ id, initialPosition, isHeld, heldPosition, onDropped, onReset, updatePosition, resetTrigger }) => {
  const meshRef = useRef()
  const [isOnRightBelt, setIsOnRightBelt] = useState(false)
  const [wasHeld, setWasHeld] = useState(false)
  const [isDropped, setIsDropped] = useState(false)
  const lastResetTrigger = useRef(0)
  
  // Reset cube position when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > lastResetTrigger.current && meshRef.current) {
      meshRef.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2])
      setIsOnRightBelt(false)
      setWasHeld(false)
      setIsDropped(false)
      lastResetTrigger.current = resetTrigger
    }
  }, [resetTrigger, initialPosition])

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
    } else if (wasHeld && !isHeld && !isDropped) {
      // Just dropped - check if on right belt (green zone)
      const x = meshRef.current.position.x
      const y = meshRef.current.position.y
      
      if (x > 1.5 && x < 5.5 && y > -2.5) {
        // Dropped in correct zone (right belt)
        setIsOnRightBelt(true)
        meshRef.current.position.y = -1.55
        onDropped(id, true) // true = dropped in correct zone
        setWasHeld(false)
        setIsDropped(true)
      } else {
        // Dropped in wrong location - trigger game over
        onDropped(id, false) // false = dropped in wrong zone
        setWasHeld(false)
        setIsDropped(true)
      }
    } else if (isOnRightBelt && !isHeld) {
      // Move along right belt
      meshRef.current.position.x += 0.02
      if (meshRef.current.position.x > 7) {
        // Reset cube to left belt
        meshRef.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2])
        setIsOnRightBelt(false)
        setIsDropped(false)
        // Call onReset to remove from droppedCubes set
        if (onReset) onReset(id)
      }
    } else if (!isDropped && !isHeld) {
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

// Mouse tracker component - simple screen-space to world-space mapping
const MouseTracker = ({ setMousePosition }) => {
  const { gl } = useThree()
  
  useEffect(() => {
    const canvas = gl.domElement
    
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      // Normalize mouse position to -1 to 1
      const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const normalizedY = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      // Simple direct mapping to world coordinates
      // X: -5 to 5 (covers both belts)
      // Y: 0.5 to 3 (height range for gripper)
      const worldX = normalizedX * 5
      const worldY = normalizedY * 1.5 + 1.5
      
      setMousePosition({ 
        x: Math.max(-5, Math.min(5, worldX)), 
        y: Math.max(0.3, Math.min(3, worldY)) 
      })
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    return () => canvas.removeEventListener('mousemove', handleMouseMove)
  }, [gl, setMousePosition])
  
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
  const [controls, setControls] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    w: false,
    s: false
  })
  const [isHolding, setIsHolding] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(null)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setControls(prev => ({ ...prev, left: true }))
          e.preventDefault()
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          setControls(prev => ({ ...prev, right: true }))
          e.preventDefault()
          break
        case 'ArrowUp':
          setControls(prev => ({ ...prev, up: true }))
          e.preventDefault()
          break
        case 'ArrowDown':
          setControls(prev => ({ ...prev, down: true }))
          e.preventDefault()
          break
        case 'w':
        case 'W':
          setControls(prev => ({ ...prev, w: true }))
          e.preventDefault()
          break
        case 's':
        case 'S':
          setControls(prev => ({ ...prev, s: true }))
          e.preventDefault()
          break
        case ' ':
          setIsHolding(true)
          e.preventDefault()
          break
      }
    }
    
    const handleKeyUp = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setControls(prev => ({ ...prev, left: false }))
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          setControls(prev => ({ ...prev, right: false }))
          break
        case 'ArrowUp':
          setControls(prev => ({ ...prev, up: false }))
          break
        case 'ArrowDown':
          setControls(prev => ({ ...prev, down: false }))
          break
        case 'w':
        case 'W':
          setControls(prev => ({ ...prev, w: false }))
          break
        case 's':
        case 'S':
          setControls(prev => ({ ...prev, s: false }))
          break
        case ' ':
          setIsHolding(false)
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleReset = () => {
    setScore(0)
    setGameOver(null)
    setResetTrigger(prev => prev + 1) // Trigger cube reset
  }

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

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
      <div className={isFullscreen ? "" : "container-custom py-8"}>
        <div 
          ref={containerRef}
          className={`bg-white rounded-lg shadow-xl overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
        >
          <div 
            className={`relative ${isFullscreen ? 'h-screen' : 'h-[500px] md:h-[600px]'}`}
            tabIndex={0}
          >
            <Canvas shadows ref={canvasRef}>
              <Suspense fallback={<LoadingSpinner />}>
                <PerspectiveCamera makeDefault position={[0, 8, 15]} fov={60} />
                <OrbitControls 
                  enablePan={false} 
                  enableZoom={true} 
                  enableRotate={true}
                  minDistance={10}
                  maxDistance={25}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2.2}
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
                <SceneManager 
                  controls={controls}
                  isHolding={isHolding}
                  score={score}
                  setScore={setScore}
                  gameOver={gameOver}
                  setGameOver={setGameOver}
                  resetTrigger={resetTrigger}
                />
                
                <Environment preset="warehouse" />
              </Suspense>
            </Canvas>

            {/* Score Display */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="bg-stac-red text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Package size={20} />
                  <span className="font-heading font-bold text-xl">{score}</span>
                  <span className="text-sm opacity-80">cubes moved</span>
                </div>
              </div>
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-stac-gray transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={20} className="text-stac-charcoal" /> : <Maximize2 size={20} className="text-stac-charcoal" />}
              </button>
            </div>

            {/* Instructions Overlay */}
            {showInstructions && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-bold text-stac-charcoal">Keyboard Controls</h3>
                  <button 
                    onClick={() => setShowInstructions(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 bg-gray-100 border rounded text-xs font-mono">←</kbd>
                      <kbd className="px-2 py-1 bg-gray-100 border rounded text-xs font-mono">→</kbd>
                    </div>
                    <span>Rotate base left/right</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 bg-gray-100 border rounded text-xs font-mono">↑</kbd>
                      <kbd className="px-2 py-1 bg-gray-100 border rounded text-xs font-mono">↓</kbd>
                    </div>
                    <span>Move shoulder up/down</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 bg-gray-100 border rounded text-xs font-mono">W</kbd>
                      <kbd className="px-2 py-1 bg-gray-100 border rounded text-xs font-mono">S</kbd>
                    </div>
                    <span>Move elbow up/down</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <kbd className="px-3 py-1 bg-stac-red text-white border rounded text-xs font-mono">SPACE</kbd>
                    <span><strong>Hold</strong> to grab cube</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Move cubes from the <span className="text-orange-500 font-medium">orange zone</span> to the <span className="text-green-500 font-medium">green zone</span></p>
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="font-medium">🤖 Gripper Closed - Holding SPACE</span>
                </div>
              </div>
            )}
            
            {/* Active Keys Indicator */}
            {!gameOver && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs font-mono">
                <div className="flex gap-2">
                  <span className={controls.left ? 'text-green-400' : 'text-gray-500'}>←</span>
                  <span className={controls.right ? 'text-green-400' : 'text-gray-500'}>→</span>
                  <span className={controls.up ? 'text-green-400' : 'text-gray-500'}>↑</span>
                  <span className={controls.down ? 'text-green-400' : 'text-gray-500'}>↓</span>
                  <span className={controls.w ? 'text-green-400' : 'text-gray-500'}>W</span>
                  <span className={controls.s ? 'text-green-400' : 'text-gray-500'}>S</span>
                  <span className={isHolding ? 'text-green-400' : 'text-gray-500'}>SPACE</span>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-2xl">
                  <div className="text-6xl mb-4">🤖💥</div>
                  <h2 className="text-2xl font-heading font-bold text-stac-red mb-4">Game Over!</h2>
                  <p className="text-gray-600 mb-6">{gameOver}</p>
                  <div className="mb-6">
                    <div className="text-lg font-semibold text-stac-charcoal">Final Score</div>
                    <div className="text-3xl font-heading font-bold text-stac-red">{score}</div>
                    <div className="text-sm text-gray-500">cubes successfully moved</div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="btn-primary w-full"
                  >
                    <RotateCcw size={18} className="mr-2" />
                    Play Again
                  </button>
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
