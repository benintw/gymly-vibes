import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedReviews, type Review } from "@/data/gyms";

const STORAGE_KEY = "gym-reviews-v1";

type ReviewsContextValue = {
  reviews: Review[];
  addReview: (input: Omit<Review, "id" | "date">) => void;
  statsFor: (gymId: string) => { average: number; count: number };
};

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReviews(JSON.parse(raw) as Review[]);
    } catch {
      /* ignore */
    }
  }, []);

  const addReview = useCallback((input: Omit<Review, "id" | "date">) => {
    setReviews((prev) => {
      const next = [
        {
          ...input,
          id: `${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const statsFor = useCallback(
    (gymId: string) => {
      const list = reviews.filter((r) => r.gymId === gymId);
      if (!list.length) return { average: 0, count: 0 };
      const average = list.reduce((s, r) => s + r.rating, 0) / list.length;
      return { average: Math.round(average * 10) / 10, count: list.length };
    },
    [reviews],
  );

  const value = useMemo(() => ({ reviews, addReview, statsFor }), [reviews, addReview, statsFor]);

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}
