/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 original.glb --transform 
Files: original.glb [7.65MB] > original-transformed.glb [2.31MB] (70%)
*/
import { Stats, OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useControls, button } from "leva";
import { Vector3 } from "three";
import { create } from "zustand";

export const useStore = create((set) => ({
	to: new Vector3(10, 10, 10),
	target: new Vector3(0, 1, 0),
	lerping: false,
	setLerping: (v) => set({ lerping: v }),
}));

export function Building({ controls, areas }) {
	const { scene } = useGLTF("/original-transformed.glb");
	const { to, target, lerping, setLerping } = useStore((state) => state);
	useControls("Camera", () => {
		console.log("creating buttons");

		const _buttons = areas.reduce(
			(acc, { title, position, lookAt }) =>
				Object.assign(acc, {
					[title]: button(() => {
						to.copy(position);
						target.copy(lookAt);
						setLerping(true);
					}),
				}),
			{}
		);
		return _buttons;
	});
	useFrame(({ camera }, delta) => {
		if (lerping) {
			camera.position.lerp(to, delta);
			controls.current.target.lerp(target, delta);
		}
	});
	useEffect(() => {
		console.log(scene, "scene");
	}, [scene.children]);

	return (
		<primitive
			object={scene.children[0]}
			castShadow
			receiveShadow
			material-envMapIntensity={0.4}
			onDoubleClick={({ camera, intersections }) => {
				to.copy(camera.position);
				target.copy(intersections[0].point);
				setLerping(true);
			}}
		/>
	);
}
