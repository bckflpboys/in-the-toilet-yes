"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
    "Pooping 💩",
    "Taking a dump 🚽",
    "Dropping the kids off at the pool 🏊",
    "Thinking about life 🤔",
    "Fighting for my life ⚔️",
];

interface StatusSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative w-full max-w-xs">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                <span className="truncate">{value || "Select Status..."}</span>
                <ChevronDown
                    className={cn(
                        "ml-2 h-4 w-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full z-50 mt-2 w-full origin-top rounded-lg border border-white/10 bg-zinc-900/95 p-1 shadow-xl backdrop-blur-xl"
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex w-full items-center rounded-md px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white",
                                    value === option && "bg-primary/20 text-primary"
                                )}
                            >
                                {option}
                                {value === option && <Check className="ml-auto h-4 w-4" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
