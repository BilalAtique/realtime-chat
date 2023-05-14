const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Commands = "zrange" | "sismember" | "get" | "smemebers";

export async function fetchRedis(
    command: Commands,
    ...args: (string | number)[]
) {
    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;
    const response = await fetch(commandUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        cache: "no-store",
    });

    if (!response.ok)
        throw new Error(
            `Error executing Redis command: ${response.statusText}`
        );

    const data = await response.json();
    return data.result;
}
