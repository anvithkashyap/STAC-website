import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Html } from '@react-three/drei'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Play, Pause, Info } from 'lucide-react'

const RobotArm = ({ isAnimating, jointAngles, setJointAngles }) => {
  const baseRef = useRef()
  const arm1Ref = useRef()
  const arm2Ref = useRef()
  const gripperRef = useRef()

  useFrame((state) => {
    if (isAnimating) {
      const time = state.clock.getElapsedTime()
      
      // Animate base rotation
      if (baseRef.current) {
        baseRef.current.rotation.y = Math.sin(time * 0.5) * 0.8
      }
      
      // Animate first arm segment
      if (arm1Ref.current) {
        arm1Ref.current.rotation.z = Math.sin(time * 0.7) * 0.3 - 0.3
      }
      
      // Animate second arm segment
      if (arm2Ref.current) {
        arm2Ref.current.rotation.z = Math.sin(time * 0.9 + 1) * 0.4
      }
      
      // Animate gripper
      if (gripperRef.current) {
        gripperRef.current.rotation.x = Math.sin(time * 2) * 0.2
      }
    } else {
      // Apply manual joint angles
      if (baseRef.current) baseRef.current.rotation.y = jointAngles.base
      if (arm1Ref.current) arm1Ref.current.rotation.z = jointAngles.arm1
      if (arm2Ref.current) arm2Ref.current.rotation.z = jointAngles.arm2
      if (gripperRef.current) gripperRef.current.rotation.x = jointAngles.gripper
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
              <mesh position={[-0.15, 0.4, 0]}>
                <boxGeometry args={[0.08, 0.3, 0.15]} />
                <meshStandardMaterial color="#2D2D2D" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh position={[0.15, 0.4, 0]}>
                <boxGeometry args={[0.08, 0.3, 0.15]} />
                <meshStandardMaterial color="#2D2D2D" metalness={0.6} roughness={0.3} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Floor Grid */}
      <gridHelper args={[10, 20, '#8B1A1A', '#444444']} position={[0, -0.15, 0]} />
    </group>
  )
}

const ConveyorBelt = () => {
  const beltRef = useRef()

  useFrame((state) => {
    if (beltRef.current) {
      beltRef.current.position.x = ((state.clock.getElapsedTime() * 0.5) % 2) - 1
    }
  })

  return (
    <group position={[3, -1.2, 0]}>
      {/* Belt Base */}
      <mesh>
        <boxGeometry args={[4, 0.2, 1]} />
        <meshStandardMaterial color="#444444" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Belt Surface */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[4, 0.1, 0.9]} />
        <meshStandardMaterial color="#2D2D2D" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Moving Objects */}
      <group ref={beltRef}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#8B1A1A" metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* Legs */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, -0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
          <meshStandardMaterial color="#666666" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
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
  const [isAnimating, setIsAnimating] = useState(true)
  const [showInstructions, setShowInstructions] = useState(true)
  const [jointAngles, setJointAngles] = useState({
    base: 0,
    arm1: -0.3,
    arm2: 0,
    gripper: 0
  })

  const resetAngles = () => {
    setJointAngles({
      base: 0,
      arm1: -0.3,
      arm2: 0,
      gripper: 0
    })
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
            Explore our manufacturing automation capabilities with this interactive 3D demo.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-[500px] md:h-[600px]">
            <Canvas shadows>
              <Suspense fallback={<LoadingSpinner />}>
                <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
                <OrbitControls 
                  enablePan={false}
                  minDistance={4}
                  maxDistance={12}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2}
                />
                
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight 
                  position={[10, 10, 5]} 
                  intensity={1} 
                  castShadow 
                  shadow-mapSize={[2048, 2048]}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#e86a0b" />
                
                {/* Scene */}
                <RobotArm 
                  isAnimating={isAnimating} 
                  jointAngles={jointAngles}
                  setJointAngles={setJointAngles}
                />
                <ConveyorBelt />
                
                <Environment preset="warehouse" />
              </Suspense>
            </Canvas>

            {/* Instructions Overlay */}
            {showInstructions && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-stac-charcoal">Controls</h3>
                  <button 
                    onClick={() => setShowInstructions(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Drag</strong> to rotate view</li>
                  <li>• <strong>Scroll</strong> to zoom in/out</li>
                  <li>• Use controls below to adjust arm</li>
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
          </div>

          {/* Controls Panel */}
          <div className="bg-stac-gray p-6 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`btn-primary ${isAnimating ? 'bg-stac-red' : 'bg-stac-charcoal'}`}
                >
                  {isAnimating ? (
                    <>
                      <Pause size={18} className="mr-2" />
                      Pause Animation
                    </>
                  ) : (
                    <>
                      <Play size={18} className="mr-2" />
                      Play Animation
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetAngles}
                  className="btn-secondary"
                  disabled={isAnimating}
                >
                  <RotateCcw size={18} className="mr-2" />
                  Reset
                </button>
              </div>

              {/* Manual Controls */}
              {!isAnimating && (
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-stac-charcoal">Base:</label>
                    <input
                      type="range"
                      min="-1.5"
                      max="1.5"
                      step="0.1"
                      value={jointAngles.base}
                      onChange={(e) => setJointAngles(prev => ({ ...prev, base: parseFloat(e.target.value) }))}
                      className="w-24 accent-stac-red"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-stac-charcoal">Arm 1:</label>
                    <input
                      type="range"
                      min="-1"
                      max="0.5"
                      step="0.1"
                      value={jointAngles.arm1}
                      onChange={(e) => setJointAngles(prev => ({ ...prev, arm1: parseFloat(e.target.value) }))}
                      className="w-24 accent-stac-red"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-stac-charcoal">Arm 2:</label>
                    <input
                      type="range"
                      min="-0.8"
                      max="0.8"
                      step="0.1"
                      value={jointAngles.arm2}
                      onChange={(e) => setJointAngles(prev => ({ ...prev, arm2: parseFloat(e.target.value) }))}
                      className="w-24 accent-stac-red"
                    />
                  </div>
                </div>
              )}
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
