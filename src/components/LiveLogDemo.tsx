"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const SERVICES = [
  { name: "cloudstore-api", color: "bg-emerald-500/20 text-emerald-400" },
  { name: "cloudstore-web", color: "bg-blue-500/20 text-blue-400" },
  { name: "healthpulse-api", color: "bg-purple-500/20 text-purple-400" },
  { name: "financehub-api", color: "bg-amber-500/20 text-amber-400" },
  { name: "edulearn-api", color: "bg-cyan-500/20 text-cyan-400" },
  { name: "travelwise-api", color: "bg-pink-500/20 text-pink-400" },
  { name: "devforge-ci", color: "bg-indigo-500/20 text-indigo-400" },
  { name: "cloudstore-worker", color: "bg-teal-500/20 text-teal-400" },
  { name: "redis-cluster", color: "bg-red-500/20 text-red-400" },
  { name: "postgresql-primary", color: "bg-sky-500/20 text-sky-400" },
];

const LEVELS = ["INFO", "WARN", "ERROR", "DEBUG"] as const;
const LEVEL_COLORS: Record<string, string> = {
  INFO: "bg-blue-500/20 text-blue-400",
  WARN: "bg-amber-500/20 text-amber-400",
  ERROR: "bg-red-500/20 text-red-400",
  DEBUG: "bg-gray-500/20 text-gray-400",
};

const MESSAGES = [
  "GET /api/v1/health 200 OK",
  "Processing order #38291 for user_7291",
  "Cache miss for key session:user:4821",
  "Database query completed in 42ms",
  "WebSocket connection established from 10.0.3.47",
  "JWT token validated successfully",
  "Scheduled task cleanup_old_sessions started",
  "Rate limit check passed for API key ak_****7291",
  "Elasticsearch index refreshed: products_v3",
  "gRPC call to payment-service completed in 18ms",
  "SSL certificate valid for 89 more days",
  "Memory usage: 324MB / 512MB (63%)",
  "Worker process spawned (PID: 48291)",
  "Background job email_notifications completed",
  "Redis PING response: PONG (1ms)",
  "HTTP/2 stream multiplexed: 4 active streams",
  "Load balancer health check passed",
  "Deployment webhook received from GitHub",
  "Pod readiness probe succeeded",
  "Container image pulled: registry.io/api:v2.4.1",
  "Ingress rule matched: api.cloudstore.io/v1/*",
  "ConfigMap updated: feature-flags-production",
  "HPA scaled deployment from 3 to 5 replicas",
  "PersistentVolumeClaim bound: data-postgres-0",
  "NetworkPolicy applied to namespace production",
  "Connection pool: 18/50 active connections",
  "Request queued, estimated wait: 0ms",
  "Batch processing: 1,247 / 5,000 records",
  "Webhook delivery attempt 1/3 to https://hooks.slack.com",
  "File upload completed: 2.4MB in 340ms",
  "Error connecting to upstream: connection refused",
  "Timeout waiting for response from auth-service (5000ms)",
  "OOMKilled: container exceeded memory limit 256Mi",
  "CrashLoopBackOff: container restarting in 30s",
  "Failed to pull image: unauthorized access",
  "Disk usage warning: /data at 87% capacity",
  "Connection reset by peer: 10.0.2.15:5432",
  "Slow query detected: SELECT * FROM orders WHERE... (3.2s)",
];

const SOURCES = ["kubernetes", "kubernetes", "kubernetes", "vercel", "backend"];
const SOURCE_COLORS: Record<string, string> = {
  kubernetes: "bg-blue-600/30 text-blue-300",
  vercel: "bg-gray-600/30 text-gray-300",
  backend: "bg-green-600/30 text-green-300",
};

const COLUMNS = ["time", "service", "source", "level", "message"] as const;

interface LogEntry {
  id: number;
  time: string;
  service: (typeof SERVICES)[number];
  source: string;
  level: string;
  message: string;
}

function generateLog(id: number): LogEntry {
  const now = new Date();
  const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
  const isError = Math.random() < 0.08;
  const isWarn = !isError && Math.random() < 0.12;
  const isDebug = !isError && !isWarn && Math.random() < 0.1;
  const level = isError ? "ERROR" : isWarn ? "WARN" : isDebug ? "DEBUG" : "INFO";
  const msgPool = isError
    ? MESSAGES.filter((m) => m.includes("Error") || m.includes("OOM") || m.includes("Crash") || m.includes("Failed") || m.includes("Timeout"))
    : MESSAGES;
  const message = msgPool[Math.floor(Math.random() * msgPool.length)];
  const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  return {
    id,
    time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(3, "0")}`,
    service: svc,
    source,
    level,
    message,
  };
}

export default function LiveLogDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [visibleCols, setVisibleCols] = useState<Set<string>>(new Set(COLUMNS));
  const [levelFilter, setLevelFilter] = useState<Set<string>>(new Set(LEVELS));
  const [serviceFilter, setServiceFilter] = useState<Set<string>>(new Set(SERVICES.map((s) => s.name)));
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState(false);
  const [showColSelector, setShowColSelector] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  // Seed initial logs
  useEffect(() => {
    const initial: LogEntry[] = [];
    for (let i = 0; i < 50; i++) initial.push(generateLog(idRef.current++));
    setLogs(initial);
  }, []);

  // Stream logs
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 1;
      setLogs((prev) => {
        const next = [...prev];
        for (let i = 0; i < count; i++) next.push(generateLog(idRef.current++));
        if (next.length > 10000) {
          idRef.current = 0;
          const fresh: LogEntry[] = [];
          for (let i = 0; i < 50; i++) fresh.push(generateLog(idRef.current++));
          return fresh;
        }
        return next;
      });
    }, Math.random() * 400 + 200);
    return () => clearInterval(interval);
  }, [paused]);

  // Auto-scroll
  useEffect(() => {
    if (!paused && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, paused]);

  const toggleLevel = (l: string) => {
    setLevelFilter((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });
  };

  const toggleService = (s: string) => {
    setServiceFilter((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const toggleCol = (c: string) => {
    setVisibleCols((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  };

  const filtered = logs.filter((l) => {
    if (!levelFilter.has(l.level)) return false;
    if (!serviceFilter.has(l.service.name)) return false;
    if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-4">Interactive Demo</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100 mb-3">Live log aggregation.</h2>
        <p className="text-gray-500 text-lg">Real-time logs from every service, every cluster. Try the filters below.</p>
      </div>

      <div className="rounded-xl border border-gray-700/40 bg-[#0d1117] shadow-2xl shadow-black/60 overflow-hidden">
        {/* macOS bar */}
        <div className="flex items-center gap-[6px] px-3 py-[6px] bg-gray-800/60 border-b border-gray-700/20">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        </div>

        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-gray-800 flex flex-wrap items-center gap-3">
          {/* Level filters */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide mr-1">Level</span>
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => toggleLevel(l)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  levelFilter.has(l) ? LEVEL_COLORS[l] : "bg-gray-800/50 text-gray-600"
                }`}
              >
                {l.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-gray-800" />

          {/* Search */}
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/30 rounded px-3 py-1 text-xs text-gray-300 placeholder-gray-600 w-48 focus:outline-none focus:border-blue-500/50"
          />

          {/* Column selector */}
          <div className="relative">
            <button
              onClick={() => setShowColSelector(!showColSelector)}
              className="px-2 py-1 rounded text-[10px] font-medium bg-gray-800/50 text-gray-400 hover:text-gray-200 transition-colors"
            >
              Columns
            </button>
            {showColSelector && (
              <div className="absolute top-full mt-1 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-2 min-w-[120px]">
                {COLUMNS.map((c) => (
                  <label key={c} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                    <input type="checkbox" checked={visibleCols.has(c)} onChange={() => toggleCol(c)} className="w-3 h-3 rounded" />
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1" />

          {/* Pause / Live */}
          <button
            onClick={() => setPaused(!paused)}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              paused ? "bg-gray-700 text-gray-300" : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {paused ? "▶ Resume" : "● Live"}
          </button>

          <span className="text-[10px] text-gray-600 font-mono">{filtered.length.toLocaleString()} entries</span>
        </div>

        {/* Service pills */}
        <div className="px-4 py-2 border-b border-gray-800/50 flex flex-wrap gap-1">
          <button
            onClick={() => setServiceFilter(new Set(SERVICES.map((s) => s.name)))}
            className="text-[9px] text-blue-400 hover:text-blue-300 mr-1"
          >
            All
          </button>
          <button onClick={() => setServiceFilter(new Set())} className="text-[9px] text-gray-500 hover:text-gray-300 mr-2">
            None
          </button>
          {SERVICES.map((s) => (
            <button
              key={s.name}
              onClick={() => toggleService(s.name)}
              className={`px-2 py-0.5 rounded text-[9px] font-medium transition-colors ${
                serviceFilter.has(s.name) ? s.color : "bg-gray-800/30 text-gray-700"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Log header */}
        <div className="px-4 py-2 border-b border-gray-800/50 flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-wide font-semibold">
          {visibleCols.has("time") && <span className="w-[90px] flex-shrink-0">Time</span>}
          {visibleCols.has("service") && <span className="w-[120px] flex-shrink-0">Service</span>}
          {visibleCols.has("source") && <span className="w-[80px] flex-shrink-0">Source</span>}
          {visibleCols.has("level") && <span className="w-[48px] flex-shrink-0">Level</span>}
          {visibleCols.has("message") && <span className="flex-1">Message</span>}
        </div>

        {/* Log rows */}
        <div ref={scrollRef} className="h-[420px] overflow-y-auto overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
          {filtered.slice(-500).map((log, idx, arr) => {
            const prev = idx > 0 ? arr[idx - 1] : null;
            const sameGroup = prev && prev.service.name === log.service.name && prev.source === log.source && prev.level === log.level;
            return (
              <div key={log.id} className="px-4 py-[3px] flex items-start gap-3 text-[12px] hover:bg-gray-800/30 font-mono transition-colors">
                {visibleCols.has("time") && (
                  <span className="w-[90px] flex-shrink-0 text-gray-500">{log.time}</span>
                )}
                {visibleCols.has("service") && (
                  <span className="w-[120px] flex-shrink-0">
                    {!sameGroup ? (
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium truncate max-w-[110px] ${log.service.color}`}>
                        {log.service.name}
                      </span>
                    ) : null}
                  </span>
                )}
                {visibleCols.has("source") && (
                  <span className="w-[80px] flex-shrink-0">
                    {!sameGroup ? (
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${SOURCE_COLORS[log.source] || ""}`}>
                        {log.source}
                      </span>
                    ) : null}
                  </span>
                )}
                {visibleCols.has("level") && (
                  <span className="w-[48px] flex-shrink-0">
                    {!sameGroup ? (
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${LEVEL_COLORS[log.level]}`}>
                        {log.level.toLowerCase()}
                      </span>
                    ) : null}
                  </span>
                )}
                {visibleCols.has("message") && (
                  <span className="flex-1 text-gray-300 truncate">{log.message}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
