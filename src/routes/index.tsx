import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Clock, Search } from "lucide-react";
import { gyms } from "@/data/gyms";
import { useReviews } from "@/hooks/useReviews";
import { StarRating } from "@/components/StarRating";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "暖窩健身評價 — 瀏覽健身房與真實評價" },
      {
        name: "description",
        content: "比較台北與新北的健身房價格、營業時間與會員評分，並留下你自己的評價。",
      },
      { property: "og:title", content: "暖窩健身評價 — 瀏覽健身房與真實評價" },
      {
        property: "og:description",
        content: "比較台北與新北的健身房價格、營業時間與會員評分，並留下你自己的評價。",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { statsFor } = useReviews();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return gyms;
    return gyms.filter((g) =>
      [g.name, g.district, ...g.tags].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <section
        className="border-b border-border/70"
        style={{ background: "var(--gradient-soft)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:py-20">
          <p className="text-sm font-medium tracking-widest text-muted-foreground">GYM REVIEWS</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold sm:text-5xl">
            找到<span className="warm-gradient-text">最適合你</span>的那間健身房
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            看看其他人怎麼說：器材、教練、尖峰人潮與真實價格，都在這裡。
          </p>
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜尋健身房、地區或標籤"
              className="h-12 rounded-full border-border bg-card pl-11 text-base shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <h2 className="truncate text-2xl font-bold">健身房列表</h2>
          <span className="shrink-0 text-sm text-muted-foreground">{list.length} 間場館</span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((gym) => {
            const { average, count } = statsFor(gym.id);
            return (
              <Link
                key={gym.id}
                to="/gyms/$gymId"
                params={{ gymId: gym.id }}
                className="card-warm group flex flex-col overflow-hidden rounded-3xl"
              >
                <img
                  src={gym.image}
                  alt={`${gym.name} 環境照`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <h3 className="min-w-0 truncate text-lg font-bold">{gym.name}</h3>
                    <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-sm font-bold text-accent-foreground">
                      {count ? average.toFixed(1) : "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <StarRating value={average} size={14} />
                    <span>{count} 則評價</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{gym.description}</p>
                  <div className="mt-auto space-y-2 pt-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{gym.district}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {gym.hours} · {gym.price}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {gym.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!list.length && (
          <p className="py-16 text-center text-muted-foreground">找不到符合的健身房。</p>
        )}
      </section>
    </div>
  );
}
