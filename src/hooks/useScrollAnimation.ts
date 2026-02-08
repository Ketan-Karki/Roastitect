import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

export const useScrollAnimation = (
  groupRef: React.RefObject<Group | null>,
  scrollProgress: number
) => {
  const initialRotation = useRef({ x: 0.3, y: 0, z: 0 });
  const targetRotation = useRef({ x: 0.3, y: 0, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!groupRef.current) return;

    // Save initial rotation
    initialRotation.current = {
      x: groupRef.current.rotation.x,
      y: groupRef.current.rotation.y,
      z: groupRef.current.rotation.z,
    };
  }, [groupRef]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth interpolation factor
    const lerp = 0.1;

    // Phase 1: 0-0.3 scroll - Gentle lift and tilt forward (prepare to pour)
    if (scrollProgress <= 0.3) {
      const phase1Progress = scrollProgress / 0.3;
      targetRotation.current.x = initialRotation.current.x + phase1Progress * 0.4;
      targetRotation.current.z = phase1Progress * -0.2;
      targetPosition.current.y = phase1Progress * 0.5;
      targetPosition.current.z = phase1Progress * 1;
    }
    // Phase 2: 0.3-0.6 scroll - Pour motion (tilt dramatically)
    else if (scrollProgress <= 0.6) {
      const phase2Progress = (scrollProgress - 0.3) / 0.3;
      targetRotation.current.x = initialRotation.current.x + 0.4 + phase2Progress * 0.8;
      targetRotation.current.z = -0.2 + phase2Progress * -0.3;
      targetPosition.current.y = 0.5 + phase2Progress * 0.3;
      targetPosition.current.z = 1 + phase2Progress * 0.5;
      targetRotation.current.y = phase2Progress * 0.3;
    }
    // Phase 3: 0.6-1.0 scroll - Return to rest, move to side
    else {
      const phase3Progress = (scrollProgress - 0.6) / 0.4;
      // Ease back
      const easeOut = 1 - Math.pow(1 - phase3Progress, 3);
      targetRotation.current.x = initialRotation.current.x + 1.2 - easeOut * 0.5;
      targetRotation.current.z = -0.5 + easeOut * 0.5;
      targetRotation.current.y = 0.3 + easeOut * 0.5;
      targetPosition.current.y = 0.8 - easeOut * 0.3;
      targetPosition.current.z = 1.5 - easeOut * 0.5;
      targetPosition.current.x = easeOut * 2;
    }

    // Smooth lerp to target
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      lerp
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotation.current.z,
      lerp
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      lerp
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPosition.current.y,
      lerp
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetPosition.current.z,
      lerp
    );
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosition.current.x,
      lerp
    );
  });
};
