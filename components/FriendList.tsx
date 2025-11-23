"use client";

import { useState } from "react";
import { Plus, Trash2, Mail } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { motion, AnimatePresence } from "framer-motion";

export function FriendList() {
    const [friends, setFriends] = useState<string[]>([
        "mom@example.com",
        "bestie@example.com",
    ]);
    const [newEmail, setNewEmail] = useState("");

    const addFriend = () => {
        if (newEmail && !friends.includes(newEmail)) {
            setFriends([...friends, newEmail]);
            setNewEmail("");
        }
    };

    const removeFriend = (email: string) => {
        setFriends(friends.filter((f) => f !== email));
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex space-x-2">
                <Input
                    placeholder="Add friend's email..."
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFriend()}
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                />
                <Button onClick={addFriend} size="icon" variant="secondary">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                <AnimatePresence>
                    {friends.map((friend) => (
                        <motion.div
                            key={friend}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-between rounded-md bg-white/5 p-2 text-sm text-zinc-300"
                        >
                            <div className="flex items-center space-x-2">
                                <Mail className="h-3 w-3 text-zinc-500" />
                                <span>{friend}</span>
                            </div>
                            <button
                                onClick={() => removeFriend(friend)}
                                className="text-zinc-500 hover:text-red-400"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
