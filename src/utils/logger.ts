function Logger(msg: string, type: string, emoji: string) {
  let d = new Date().toLocaleDateString("fr", {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  console.log(`${d}: ${emoji}  [${type}] ${msg}`);
}

export function LogInfo(msg: string) {
  Logger(msg, "INFO", "💡");
}

export function LogWarn(msg: string) {
  Logger(msg, "WARN", "⚠️");
}

export function LogError(msg: string) {
  Logger(msg, "ERROR", "❌");
}

export function LogApiRes(msg: string) {
  Logger(msg, "API", "🔽");
}

export function LogApiReq(msg: string) {
  Logger(msg, "API", "🔼");
}

export function LogApiPing(msg: string) {
  Logger(msg, "API", "🏓");
}

export function LogApiError(msg: string) {
  Logger(msg, "API", "🚨");
}

export function LogApiBuffer(msg: string) {
  Logger(msg, "API", "🐌");
}
