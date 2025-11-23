"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Users } from "lucide-react";
import { Globe } from "@/components/Globe";
import { ToiletButton } from "@/components/ToiletButton";
import { StatusSelector } from "@/components/StatusSelector";
import { FriendList } from "@/components/FriendList";
import { SocialShare } from "@/components/SocialShare";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
    const [activePoopers, setActivePoopers] = useState(12453);
    const [status, setStatus] = useState("Pooping 💩");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [lastPoopTime, setLastPoopTime] = useState<Date | null>(null);

    // Mock real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePoopers((prev) => prev + Math.floor(Math.random() * 5) - 2);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleFlush = () => {
        setLastPoopTime(new Date());
        // In a real app, this would send API requests
        console.log(`User is ${status}`);
    };

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Globe */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Globe />
            </div>

            {/* Header */}
            <header className="absolute top-0 z-10 flex w-full items-center justify-between p-6">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary animate-pulse" />
                    <h1 className="text-2xl font-bold tracking-tighter">In the Toilet</h1>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSettingsOpen(true)}
                    className="rounded-full bg-white/5 hover:bg-white/10"
                >
                    <Settings className="h-5 w-5" />
                </Button>
            </header>

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center space-y-8 p-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                        <Users className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">
                            <span className="text-green-400">{activePoopers.toLocaleString()}</span>{" "}
                            people are pooping right now
                        </span>
                    </div>
                </motion.div>

                <div className="space-y-6">
                    <StatusSelector value={status} onChange={setStatus} />
                    <ToiletButton onFlush={handleFlush} />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: lastPoopTime ? 1 : 0 }}
                    className="max-w-md"
                >
                    {lastPoopTime && (
                        <Card className="border-primary/20 bg-primary/10 backdrop-blur-xl">
                            <CardContent className="pt-6">
                                <p className="text-lg font-medium text-primary-foreground">
                                    Alert sent! 🚀
                                </p>
                                <p className="text-sm text-zinc-400 mb-4">
                                    Your friends have been notified that you are {status.toLowerCase()}.
                                </p>
                                <SocialShare />
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>

            {/* Settings Modal */}
            <Modal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Settings & Friends"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-zinc-400">Manage Friends</h3>
                        <FriendList />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-zinc-400">Custom Alerts</h3>
                        <p className="text-xs text-zinc-500">
                            Add custom messages to your status list (Coming soon).
                        </p>
                    </div>
                </div>
            </Modal>
        </main>
    );
}
