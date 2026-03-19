import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, ScrollControls, useScroll } from '@react-three/drei';
import * as easing from 'maath/easing';

function Scene({ items, rows, onItemClick }) {
  const scroll = useScroll();
  const group = useRef();
  
  // Calculate how many items are in each row
  const itemsPerRow = Math.ceil(items.length / rows);
  const radius = Math.max(800, itemsPerRow * 40); // Radius grows as columns increase

  useFrame((state, delta) => {
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      scroll.offset * Math.PI * 2,
      delta * 2
    );
  });

  return (
    <group ref={group}>
      {items.map((item, i) => {
        // Row calculation: 0, 1, or 2
        const row = i % rows; 
        const col = Math.floor(i / rows);
        
        // Circular math for columns
        const angle = (col / itemsPerRow) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Vertical spacing for the 3 rows
        const yOffset = (row - 1) * (radius / 4); 

        return (
          <GalleryItem 
            key={i} 
            url={item.imageUrl} 
            pos={[x, yOffset, z]} 
            rot={[0, angle + Math.PI, 0]} 
            radius={radius}
            onClick={() => onItemClick(item.imageUrl)}
          />
        );
      })}
    </group>
  );
}

function GalleryItem({ url, pos, rot, radius, onClick }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    const scale = hovered ? 1.2 : 1;
    easing.damp3(ref.current.scale, [radius/5 * scale, radius/8 * scale, 1], 0.15, delta);
  });

  return (
    <Image
      ref={ref}
      url={url}
      position={pos}
      rotation={rot}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      transparent
      opacity={0.8}
    />
  );
}

export default function DomeGallery({ items, rows = 3, onItemClick }) {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
      <ScrollControls pages={Math.ceil(items.length/3)} horizontal damping={0.4}>
        <Scene items={items} rows={rows} onItemClick={onItemClick} />
      </ScrollControls>
    </Canvas>
  );
}