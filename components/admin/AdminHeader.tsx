"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ShieldCheck,
  Globe,
  Sliders,
  Eye,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";
import { AdminUser, AdminUIMode } from "@/lib/admin/types";
import { CommandPalette } from "./CommandPalette";
import { LiveWebsiteOverlay } from "./LiveWebsiteOverlay";

interface AdminHeaderProps {
  user: AdminUser;
  onOpenMobileMenu: () => void;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  unreadNotificationCount?: number;
  currentMode?: AdminUIMode;
  onToggleMode?: (mode: AdminUIMode) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  user,
  onOpenMobileMenu,
  title,
  breadcrumbs = [],
  unreadNotificationCount = 0,
  currentMode: externalMode,
  onToggleMode: externalToggleMode,
}) => {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [liveOverlayOpen, setLiveOverlayOpen] = useState(false);
  const [internalMode, setInternalMode] = useState<AdminUIMode>("tactical");
  const [streamTicker, setStreamTicker] = useState(0);

  const activeMode = externalMode || internalMode;

  const handleModeSwitch = (newMode: AdminUIMode) => {
    setInternalMode(newMode);
    if (externalToggleMode) {
      externalToggleMode(newMode);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ricoz_mode_change", { detail: { mode: newMode } }));
    }
  };

  useEffect(() => {
    const handleOpen = () => setPaletteOpen(true);
    window.addEventListener("ricoz_open_palette", handleOpen);

    // Live telemetry pulse ticker (< 3 seconds streaming simulation)
    const interval = setInterval(() => {
      setStreamTicker((prev) => (prev + 1) % 100);
    }, 2800);

    return () => {
      window.removeEventListener("ricoz_open_palette", handleOpen);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <header className="h-16 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile trigger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col">
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={b.label}>
                    {i > 0 && <span>/</span>}
                    {b.href ? (
                      <Link href={b.href} className="hover:text-slate-300 transition-colors">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="text-slate-400">{b.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}
            <div className="flex items-center gap-2 mt-0.5">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                {title || "Operations Control"}
              </h1>

              {/* Real-time Telemetry Streaming Pill */}
              <span className="hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>STREAM 2.8s</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Mode Toggle, Command Palette, Live Site Preview, Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Executive vs Tactical Mode Switcher (FR-03) */}
          <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl p-0.5 font-mono text-[11px]">
            <button
              onClick={() => handleModeSwitch("executive")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                activeMode === "executive"
                  ? "bg-purple-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Executive Mode: Abstract parameters, focus on KPIs, margin charts, and strategic alerts"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Executive</span>
            </button>
            <button
              onClick={() => handleModeSwitch("tactical")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                activeMode === "tactical"
                  ? "bg-red-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Tactical Mode: Dense tables, raw event logs, and micro-action triggers"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden sm:inline">Tactical</span>
            </button>
          </div>

          {/* Global Cmd+K Command Palette Trigger (FR-03) */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 font-mono transition-colors group"
            title="Launch Command Palette (Cmd+K / Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-red-500 group-hover:text-red-400" />
            <span className="hidden md:inline text-slate-400">Commands...</span>
            <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 font-bold">
              ⌘K
            </kbd>
          </button>

          {/* Direct Link to Live Public Website */}
          <Link
            href="/live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/50 transition-all shadow-sm shadow-emerald-950/50"
            title="Open the Public Live Website in a new tab"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">Live Website</span>
            <ExternalLink className="w-3 h-3 text-emerald-300 opacity-80" />
          </Link>

          {/* Live Website Preview & Funnel Overlay Switcher (FR-04) */}
          <button
            onClick={() => setLiveOverlayOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/40 transition-colors shadow-sm"
            title="Toggle Live Website Preview & Funnel Overlay Switcher"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Telemetry Overlay</span>
          </button>

          {/* Notifications */}
          <Link
            href="/admin/notifications"
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0A0D14]" />
            )}
          </Link>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleMode={handleModeSwitch}
        currentMode={activeMode}
      />

      {/* Live Website Overlay Modal */}
      <LiveWebsiteOverlay
        isOpen={liveOverlayOpen}
        onClose={() => setLiveOverlayOpen(false)}
      />
    </>
  );
};
