import "./styles.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { Suspense, useState } from "react";
import { useGLTF } from "@react-three/drei";
import Popup from "./popUpModal";
import { useControls, button } from "leva";
import { Vector3 } from "three";
import { Building } from "./Buidling";
import { create } from "zustand";
import { Area } from "./Area";
import cracks from "./cracks.json";
import { useRef } from "react";
useGLTF.preload("/original.glb");
cracks.forEach((val) => {
	useGLTF.preload(val.path);
});

export default function App() {
	const [isModelOpen, setisModelOpen] = useState(false);
	const [imageFile, setImageFile] = useState("");
	const showModel = (imageFile) => {
		console.log(`showModel imageFile: ${imageFile}`);
		setisModelOpen(true);
		setImageFile(imageFile);
	};
	const onHide = () => {
		setisModelOpen(false);
	};
	const ref = useRef();
	return (
		<div className="App">
			<Canvas
				camera={{ position: [1, 4, 4] }}
				onPointerDown={() => setLerping(false)}
				onWheel={() => setLerping(false)}
			>
				<ambientLight />
				<Suspense fallback={null}>
					<group position-y={-0.75} dispose={null} scale={0.07}>
						<Building controls={ref} areas={cracks} />
						{cracks.map((crack) => {
							return (
								<Area
									key={crack.path}
									title={crack.title}
									showModel={showModel}
									path={crack.path}
									crackParam={crack.crackParam}
								></Area>
							);
						})}
					</group>

					<OrbitControls ref={ref} target={[0, 1, 0]} />
				</Suspense>
			</Canvas>
			<Popup visible={isModelOpen} onHide={onHide} imageFile={imageFile} />
		</div>
	);
}
