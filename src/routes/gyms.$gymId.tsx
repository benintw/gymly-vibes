import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, MapPin, Clock, Wallet } from "lucide-react";
import { toast } from "sonner";
import { gyms } from "@/data/gyms";
import { useReviews } from "@/hooks/useReviews";
import { StarRating, StarPicker } from "@/components/StarRating";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/gyms/$gymId")({
  loader: ({ params }) => {
    const gym = gyms.find((g) => g.id === params.gymId);
    if (!gym) throw notFound();
    return { name: gym.name, description: gym.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "找不到場館 — 暖窩健身評價" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} 評價 — 暖窩健身評價`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: GymDetail,
  errorComponent: ({ error }) => (
    <p role="alert" className="p-16 text-center text-muted-foreground">
      {error.message}
    </p>
  ),
  notFoundComponent: () => (
    <div className="p-16 text-center">
      <p className="text-muted-foreground">找不到這間健身房。</p>
      <Link to="/" className="mt-4 inline-block font-medium text-primary underline">
        回到列表
      </Link>
    </div>
  ),
});

function GymDetail() {
  const { gymId } = Route.useParams();
  const gym = gyms.find((g) => g.id === gymId)!;
  const { reviews, addReview, statsFor } = useReviews();
  const { average, count } = statsFor(gymId);
  const gymReviews = reviews.filter((r) => r.gymId === gymId);

  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      toast.error("請填寫暱稱與評論內容");
      return;
    }
    addReview({ gymId, author: author.trim(), rating, comment: comment.trim() });
    setAuthor("");
    setComment("");
    setRating(5);
    toast.success("評價已送出，感謝分享！");
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> 返回列表
      </Link>

      <div className="card-warm mt-4 overflow-hidden rounded-3xl">
        <img
          src={gym.image}
          alt={`${gym.name} 環境照`}
          width={1024}
          height={768}
          className="h-56 w-full object-cover sm:h-72"
        />
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-3xl font-extrabold">{gym.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{gym.address}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-extrabold text-primary">
                {count ? average.toFixed(1) : "—"}
              </p>
              <StarRating value={average} />
              <p className="text-xs text-muted-foreground">{count} 則評價</p>
            </div>
          </div>
          <p className="text-muted-foreground">{gym.description}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <InfoTile icon={<MapPin className="h-4 w-4" />} label="地區" value={gym.district} />
            <InfoTile icon={<Clock className="h-4 w-4" />} label="營業時間" value={gym.hours} />
            <InfoTile icon={<Wallet className="h-4 w-4" />} label="費用" value={gym.price} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {gym.tags.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <h2 className="text-xl font-bold">會員評價</h2>
          <div className="mt-4 space-y-4">
            {gymReviews.map((r) => (
              <article key={r.id} className="card-warm rounded-2xl p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-bold text-accent-foreground">
                      {r.author.slice(0, 1)}
                    </span>
                    <span className="truncate font-semibold">{r.author}</span>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{r.date}</span>
                </div>
                <StarRating value={r.rating} size={14} className="mt-3" />
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.comment}</p>
              </article>
            ))}
            {!gymReviews.length && (
              <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                還沒有評價，成為第一個分享的人吧！
              </p>
            )}
          </div>
        </section>

        <aside>
          <form onSubmit={onSubmit} className="card-warm sticky top-24 space-y-4 rounded-2xl p-5">
            <h2 className="text-lg font-bold">新增評價</h2>
            <div className="space-y-2">
              <Label htmlFor="author">暱稱</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="你的名字"
              />
            </div>
            <div className="space-y-2">
              <Label>評分</Label>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">心得</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                placeholder="器材、教練、環境、人潮如何？"
              />
            </div>
            <Button type="submit" className="w-full rounded-full">
              送出評價
            </Button>
          </form>
        </aside>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-muted px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 truncate font-semibold">{value}</p>
    </div>
  );
}
