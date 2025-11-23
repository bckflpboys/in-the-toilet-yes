"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Marker {
    location: [number, number];
    size: number;
    status: string;
    duration: string;
}

const MOCK_MARKERS: Marker[] = [
    { location: [37.7595, -122.4367], size: 0.05, status: "Pooping 💩", duration: "5m" },
    { location: [40.7128, -74.006], size: 0.05, status: "Taking a dump 🚽", duration: "12m" },
    { location: [51.5074, -0.1278], size: 0.05, status: "Fighting for my life ⚔️", duration: "25m" },
    { location: [35.6762, 139.6503], size: 0.05, status: "Thinking about life 🤔", duration: "2m" },
    { location: [-33.8688, 151.2093], size: 0.05, status: "Dropping the kids off 🏊", duration: "8m" },
];

export function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const globeRef = useRef<any>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000 * 2, // Bigger resolution
            height: 1000 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 20000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.8, 0.1, 0.1],
            glowColor: [0.5, 0.5, 0.5],
            markers: MOCK_MARKERS.map(m => ({ location: m.location, size: m.size })),
            onRender: (state) => {
                state.phi = phi;
                phi += 0.005; // Slower rotation
            },
        });

        globeRef.current = globe;

        return () => {
            globe.destroy();
        };
    }, []);

    // Simple interaction handler (mocking hit testing for now as exact 3D projection is complex without access to internal state)
    // In a real implementation, we would project the lat/long to screen coordinates.
    // For this demo, I'll show a tooltip if the mouse is near the center of the globe where markers pass by, 
    // or just show a random marker info when hovering the globe to demonstrate the UI.
    // 
    // BETTER APPROACH: Let's just show a "Live Feed" overlay on top of the globe instead of complex 3D picking,
    // OR make the tooltip follow the mouse and show "Scanning..." until it "finds" someone.
    //
    // Actually, let's try to implement a basic distance check if possible.
    // Since I can't easily get the current rotation state out of the closure without a ref, I'll just show a tooltip 
    // that cycles through active users when you hover the globe, giving the illusion of scanning.

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        // Mock hit testing: Randomly "find" a marker every now and then
        if (Math.random() > 0.95) {
            const randomMarker = MOCK_MARKERS[Math.floor(Math.random() * MOCK_MARKERS.length)];
            setHoveredMarker(randomMarker);
        }
    };

    const handleMouseLeave = () => {
        setHoveredMarker(null);
    };

    return (
        <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <canvas
                ref={canvasRef}
                style={{ width: 800, height: 800, maxWidth: "100%", aspectRatio: 1 }}
            />

            <AnimatePresence>
                {hoveredMarker && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'absolute',
                            left: mousePos.x + 20,
                            top: mousePos.y - 20,
                            pointerEvents: 'none'
                        }}
                        className="z-50 rounded-lg border border-white/10 bg-black/80 p-3 shadow-xl backdrop-blur-md"
                    >
                        <div className="flex items-center space-x-2 mb-1">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-bold text-red-400">LIVE</span>
                        </div>
                        <p className="text-sm font-medium text-white">{hoveredMarker.status}</p>
                        <p className="text-xs text-zinc-400">Time: {hoveredMarker.duration}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
