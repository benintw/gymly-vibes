import gym1 from "@/assets/gym-1.jpg";
import gym2 from "@/assets/gym-2.jpg";
import gym3 from "@/assets/gym-3.jpg";
import gym4 from "@/assets/gym-4.jpg";

export type Review = {
  id: string;
  gymId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Gym = {
  id: string;
  name: string;
  district: string;
  address: string;
  price: string;
  hours: string;
  tags: string[];
  image: string;
  description: string;
};

export const gyms: Gym[] = [
  {
    id: "iron-loft",
    name: "鐵峰健身工坊",
    district: "台北 · 信義區",
    address: "台北市信義區松高路 68 號 3F",
    price: "月費 NT$1,680",
    hours: "06:00 – 24:00",
    tags: ["自由重量", "教練課", "淋浴間"],
    image: gym1,
    description:
      "以自由重量為核心的老派健身房，器材保養細緻，深蹲架永遠有空位，適合認真練力量的人。",
  },
  {
    id: "forge-box",
    name: "熔爐 Functional Box",
    district: "台北 · 大安區",
    address: "台北市大安區敦化南路二段 12 號 B1",
    price: "單堂 NT$450",
    hours: "07:00 – 22:30",
    tags: ["功能性訓練", "團課", "壺鈴"],
    image: gym2,
    description:
      "木地板團課空間，每日課表輪替，教練會依照個人狀況調整重量，社群氣氛非常好。",
  },
  {
    id: "amber-studio",
    name: "琥珀瑜伽・皮拉提斯",
    district: "台北 · 中山區",
    address: "台北市中山區南京東路一段 5 號 6F",
    price: "月費 NT$2,200",
    hours: "08:00 – 21:00",
    tags: ["瑜伽", "皮拉提斯", "小班制"],
    image: gym3,
    description:
      "採光極好的小班制工作室，最多 8 人一堂，適合久坐族放鬆肩頸與建立核心。",
  },
  {
    id: "sunset-24",
    name: "日落 24H 健身中心",
    district: "新北 · 板橋區",
    address: "新北市板橋區文化路一段 188 號 2F",
    price: "月費 NT$1,199",
    hours: "24 小時",
    tags: ["24 小時", "有氧器材", "免綁約"],
    image: gym4,
    description:
      "跑步機與飛輪數量充足，深夜也不用排隊，免綁約制度對通勤族相當友善。",
  },
];

export const seedReviews: Review[] = [
  {
    id: "r1",
    gymId: "iron-loft",
    author: "阿澤",
    rating: 5,
    comment: "器材新舊都保養得很好，尖峰時段也不太需要等，教練不會硬推課程。",
    date: "2026-07-12",
  },
  {
    id: "r2",
    gymId: "iron-loft",
    author: "Wendy",
    rating: 4,
    comment: "更衣室乾淨，唯一缺點是停車位有點難找。",
    date: "2026-06-28",
  },
  {
    id: "r3",
    gymId: "forge-box",
    author: "小賴",
    rating: 5,
    comment: "團課氣氛超好，第一次來就有人主動帶動作，教練細心。",
    date: "2026-07-30",
  },
  {
    id: "r4",
    gymId: "amber-studio",
    author: "Iris",
    rating: 5,
    comment: "小班制真的差很多，老師會一個一個調整姿勢，下課肩頸鬆了一半。",
    date: "2026-08-01",
  },
  {
    id: "r5",
    gymId: "sunset-24",
    author: "Kevin",
    rating: 3,
    comment: "價格很甜，但重訓區空間偏小，晚上八點左右人最多。",
    date: "2026-07-19",
  },
  {
    id: "r6",
    gymId: "sunset-24",
    author: "阿豪",
    rating: 4,
    comment: "半夜來練完全沒人，很適合上大夜班的人。",
    date: "2026-05-09",
  },
];
