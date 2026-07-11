export interface RateLimiter {
  check: (ip: string) => boolean;
}

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const requests = new Map<string, { count: number; expiresAt: number }>();

  return {
    check: (ip: string) => {
      const now = Date.now();
      const record = requests.get(ip);

      if (!record) {
        requests.set(ip, { count: 1, expiresAt: now + windowMs });
        return true; // Allowed
      }

      if (now > record.expiresAt) {
        requests.set(ip, { count: 1, expiresAt: now + windowMs });
        return true; // Allowed (window reset)
      }

      if (record.count >= limit) {
        return false; // Blocked
      }

      record.count++;
      return true; // Allowed
    }
  };
}

// Pre-configured rate limiters
// 5 requests per minute for login/register
export const authRateLimiter = createRateLimiter(5, 60 * 1000);
