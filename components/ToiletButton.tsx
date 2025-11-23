"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

interface ToiletButtonProps {
    onFlush: () => void;
}

export function ToiletButton({ onFlush }: ToiletButtonProps) {
    const [isFlushing, setIsFlushing] = useState(false);

    const handleClick = () => {
        setIsFlushing(true);
        onFlush();
        setTimeout(() => setIsFlushing(false), 2000);
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {isFlushing && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 0 }}
                        animate={{ scale: 1.5, opacity: 0, y: -100 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 top-0 -translate-x-1/2 text-4xl font-bold text-primary"
                    >
                        PLOP! 💩
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                size="lg"
                onClick={handleClick}
                disabled={isFlushing}
                className="h-32 w-32 rounded-full text-xl font-bold shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:shadow-[0_0_80px_rgba(124,58,237,0.8)]"
            >
                {isFlushing ? "..." : "PUSH"}
            </Button>
        </div>
    );
}
