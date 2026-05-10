"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/SearchInput";

export const Socket = () => {
  const [socketName, setSocketName] = useState("");
  const [socketAddress, setSocketAddress] = useState("");
  const [sockets, setSockets] = useState<Array<{ id: string; name: string; address: string; status: string }>>([]);

  const handleAddSocket = () => {
    if (socketName && socketAddress) {
      setSockets([
        ...sockets,
        {
          id: Date.now().toString(),
          name: socketName,
          address: socketAddress,
          status: "connecting",
        },
      ]);
      setSocketName("");
      setSocketAddress("");
    }
  };

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-6 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Мастерская</h1>
        <p className="text-sm text-white/40">Управляйте вашими Socket подключениями</p>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-32 flex-1 flex flex-col gap-6">
        {/* Add socket form */}
        <Card variant="glass">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white/80">Добавить новый Socket</h2>

            <SearchInput
              placeholder="Название сокета"
              value={socketName}
              onChange={(e) => setSocketName(e.target.value)}
            />

            <SearchInput
              placeholder="Адрес (ws://...)"
              value={socketAddress}
              onChange={(e) => setSocketAddress(e.target.value)}
            />

            <Button
              variant="primary"
              size="md"
              onClick={handleAddSocket}
              disabled={!socketName || !socketAddress}
            >
              Добавить Socket
            </Button>
          </div>
        </Card>

        {/* Sockets list */}
        {sockets.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white/60">Активные подключения</h2>
            {sockets.map((socket) => (
              <Card key={socket.id} variant="outlined" className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white/90 mb-1">
                      {socket.name}
                    </h3>
                    <p className="text-xs text-white/40 font-mono break-all">
                      {socket.address}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="size-2 rounded-full bg-yellow-500/60" />
                      <span className="text-xs text-white/40">{socket.status}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSockets(sockets.filter((s) => s.id !== socket.id))
                    }
                  >
                    Удалить
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="size-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-30"
              >
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="19" cy="12" r="1" fill="currentColor" />
                <circle cx="5" cy="12" r="1" fill="currentColor" />
              </svg>
            </div>
            <p className="text-sm text-white/40">Нет активных подключений</p>
          </div>
        )}
      </div>
    </div>
  );
};
