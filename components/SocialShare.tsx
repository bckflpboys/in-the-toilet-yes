"use client";

import { Twitter, Facebook, Instagram, Share2 } from "lucide-react";
import { Button } from "./ui/Button";

export function SocialShare() {
    const share = (platform: string) => {
        // Mock share
        alert(`Shared to ${platform}! (Mock)`);
    };

    return (
        <div className="flex space-x-2 justify-center">
            <Button
                size="icon"
                variant="ghost"
                className="hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2]"
                onClick={() => share("Twitter")}
            >
                <Twitter className="h-5 w-5" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="hover:bg-[#4267B2]/20 hover:text-[#4267B2]"
                onClick={() => share("Facebook")}
            >
                <Facebook className="h-5 w-5" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="hover:bg-[#E1306C]/20 hover:text-[#E1306C]"
                onClick={() => share("Instagram")}
            >
                <Instagram className="h-5 w-5" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary/20 hover:text-primary"
                onClick={() => share("Other")}
            >
                <Share2 className="h-5 w-5" />
            </Button>
        </div>
    );
}
