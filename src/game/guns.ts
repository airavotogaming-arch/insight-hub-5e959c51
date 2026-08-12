export type GunShape = "blaster" | "pistol" | "ranger" | "raygun" | "smg";

export interface GunPalette {
  body: number;
  bodyDark: number;
  accent: number;
  accentDark: number;
  trim: number;
  glow: number;
}

export interface GunSkin {
  id: string;
  name: string;
  blurb: string;
  cost: number;
  shape: GunShape;
  palette: GunPalette;
  /** css colours for the 2D shop preview */
  css: { body: string; bodyDark: string; accent: string; trim: string };
}

export const GUN_ITEMS: GunSkin[] = [
  {
    id: "carnival",
    name: "Carnival Blaster",
    blurb: "Classic fairground toy",
    cost: 0,
    shape: "blaster",
    palette: { body: 0x1f6fd0, bodyDark: 0x14508f, accent: 0xf4661d, accentDark: 0xc94c10, trim: 0xffc122, glow: 0x2ad4ff },
    css: { body: "#1f6fd0", bodyDark: "#14508f", accent: "#f4661d", trim: "#ffc122" },
  },
  {
    id: "olive",
    name: "Olive Sidearm",
    blurb: "Compact 3D pistol",
    cost: 750,
    shape: "pistol",
    palette: { body: 0x6f7d2c, bodyDark: 0x3f4a18, accent: 0xf2d31c, accentDark: 0xc9a800, trim: 0xa8c04a, glow: 0xf2d31c },
    css: { body: "#6f7d2c", bodyDark: "#3f4a18", accent: "#f2d31c", trim: "#a8c04a" },
  },
  {
    id: "ranger",
    name: "Ranger Pistol",
    blurb: "Green & red icon build",
    cost: 1800,
    shape: "ranger",
    palette: { body: 0x1f7a3d, bodyDark: 0x0f4a25, accent: 0xe0342c, accentDark: 0x9c2019, trim: 0xf5c400, glow: 0xffe066 },
    css: { body: "#1f7a3d", bodyDark: "#0f4a25", accent: "#e0342c", trim: "#f5c400" },
  },
  {
    id: "mint",
    name: "Mint Ray Gun",
    blurb: "Retro energy coils",
    cost: 3500,
    shape: "raygun",
    palette: { body: 0x3fd0c9, bodyDark: 0x22262d, accent: 0xf6c026, accentDark: 0xc79413, trim: 0xeceadd, glow: 0x66ffcc },
    css: { body: "#3fd0c9", bodyDark: "#22262d", accent: "#f6c026", trim: "#eceadd" },
  },
  {
    id: "recon",
    name: "Recon SMG",
    blurb: "Suppressor + red dot",
    cost: 6000,
    shape: "smg",
    palette: { body: 0xc9be9a, bodyDark: 0x7d7563, accent: 0xe23b2e, accentDark: 0x8f231b, trim: 0x9aa0a6, glow: 0xff5544 },
    css: { body: "#c9be9a", bodyDark: "#7d7563", accent: "#e23b2e", trim: "#9aa0a6" },
  },
];

export const getGunSkin = (id: string): GunSkin => GUN_ITEMS.find((g) => g.id === id) ?? GUN_ITEMS[0]!;
