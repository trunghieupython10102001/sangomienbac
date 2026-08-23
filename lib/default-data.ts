export interface SiteSettings {
  shopName: string;
  phones: string[];
  email: string;
  address: string;
  workingHours: string;
  slogan: string;
  tagline: string;
  facebookUrl: string;
  zaloUrl: string;
  /** Optional so settings saved before TikTok existed still parse. */
  tiktokUrl?: string;
}

/**
 * A grouping layer above `Category` — "Sàn gỗ công nghiệp", "Phụ kiện"…
 * Members are referenced by category slug so a group never duplicates
 * product data.
 */
export interface ProductGroup {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  /** Blank falls back to the first member category's image. */
  image: string;
  categorySlugs: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  description: string;
  quickLinksTitle: string;
  quickLinks: FooterLink[];
  contactTitle: string;
  hoursTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  copyright: string;
  credit: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroHighlight {
  title: string;
  description: string;
}

export interface HomeHero {
  enabled: boolean;
  badge: string;
  title: string;
  description: string;
  /** Blank renders the hero centred full-width instead of two columns. */
  image: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  highlights: HeroHighlight[];
}

export interface BestSeller {
  code: string;
  price: string;
  image: string;
  /** Optional display name shown above the code on the homepage card. */
  name?: string;
  /** Optional original (pre-discount) price; shown struck-through with a % badge. */
  originalPrice?: string;
}

export interface MediaItem {
  type: 'video' | 'image';
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
}

export interface AboutSection {
  title: string;
  content: string;
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  sections: AboutSection[];
}

export const defaultSiteSettings: SiteSettings = {
  shopName: 'Kho sàn gỗ Miền Bắc',
  phones: ['0363974768', '0969897297'],
  email: 'Sangomienbac86@gmail.com',
  address: '26a, ngõ 31 Cầu Diễn, Xuân Phương, Hà Nội',
  workingHours: 'Thứ 2 - Chủ nhật: 8:00 - 18:00',
  slogan: 'Tư vấn miễn phí - Thi công chuyên nghiệp',
  tagline: 'Chất lượng - Uy tín - Giá tốt',
  facebookUrl: 'https://www.facebook.com/Khosangomienbac',
  zaloUrl: 'https://zalo.me/0363974768',
  tiktokUrl: '',
};

export const defaultProductGroups: ProductGroup[] = [
  {
    id: '1',
    name: 'Sàn gỗ công nghiệp',
    slug: 'san-go-cong-nghiep',
    shortDescription:
      'Các dòng sàn gỗ công nghiệp cốt xanh, cốt đen, xương cá — bền đẹp, chịu nước, phù hợp mọi không gian.',
    image: '',
    categorySlugs: [
      'san-go-cot-xanh',
      'san-go-cao-cap-malaysia',
      'san-go-cot-den-cao-cap',
      'san-go-xuong-ca',
      'san-go-cot-den-viet-nam',
      'san-go-cong-nghe-duc',
      'san-go-cot-nau',
      'san-go-chau-au',
      'san-go-8mm-viet-nam',
    ],
  },
  {
    id: '2',
    name: 'Sàn nhựa trong nhà',
    slug: 'san-nhua-trong-nha',
    shortDescription:
      'Sàn nhựa SPC hèm khóa chống nước tuyệt đối, thi công nhanh, phù hợp căn hộ và nhà phố hiện đại.',
    image: '',
    categorySlugs: [
      'san-nhua-7-5mm-spc-cao-cap',
      'san-nhua-4mm-spc-cao-cap',
      'san-nhua-xuong-ca-spc-cao-cap',
    ],
  },
  {
    id: '3',
    name: 'Tấm ốp nội thất',
    slug: 'tam-op-noi-that',
    shortDescription:
      'Tấm ốp tường, ốp trần nano hoàn thiện nhanh, chống ẩm mốc, nâng tầm không gian sống.',
    image: '',
    categorySlugs: ['tam-op-noi-that'],
  },
  {
    id: '4',
    name: 'Phụ kiện',
    slug: 'phu-kien',
    shortDescription:
      'Phào, nẹp và các phụ kiện hỗ trợ thi công, giúp công trình hoàn thiện khít khao và bền lâu.',
    image: '',
    categorySlugs: ['phu-kien-phao-nep'],
  },
  {
    id: '5',
    name: 'Xốp lót',
    slug: 'xop-lot',
    shortDescription:
      'Xốp lót và cao su non — lớp nền quan trọng giúp sàn êm chân, cách âm và chống ẩm từ nền.',
    image: '',
    categorySlugs: ['xop-lot-cao-su-non'],
  },
];

export const defaultFooterContent: FooterContent = {
  description:
    'Chuyên cung cấp và thi công sàn gỗ công nghiệp, sàn nhựa cao cấp với giá tốt nhất thị trường.',
  quickLinksTitle: 'Liên kết nhanh',
  quickLinks: [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', href: '/gioi-thieu' },
    { label: 'Sản phẩm', href: '/san-pham' },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Báo giá', href: '/bao-gia' },
    { label: 'Liên hệ', href: '/lien-he' },
  ],
  contactTitle: 'Liên hệ',
  hoursTitle: 'Giờ làm việc',
  ctaTitle: 'Tư vấn 24/7',
  ctaSubtitle: 'Luôn sẵn sàng hỗ trợ bạn',
  copyright: '© 2024 Kho sàn gỗ Miền Bắc. All rights reserved.',
  credit: 'Designed with ❤️ for quality flooring',
};

export const defaultHomeHero: HomeHero = {
  enabled: true,
  badge: 'PHÂN PHỐI & THI CÔNG TRỌN GÓI',
  title: 'Kho Sàn Gỗ Miền Bắc – Đơn vị cung cấp sàn gỗ, sàn nhựa giá tại kho',
  description:
    'Chúng tôi cung cấp và trực tiếp thi công sàn gỗ công nghiệp, sàn nhựa SPC chịu nước, nhập khẩu Malaysia, Bỉ và Thổ Nhĩ Kỳ. Tư vấn tận nơi, báo giá chân thực, đảm bảo mức giá gốc từ nhà kho tiết kiệm tối ưu chi phí.',
  image: '',
  primaryCta: { label: 'Xem sản phẩm', href: '/san-pham' },
  secondaryCta: { label: 'Nhận tư vấn chọn sàn', href: '/lien-he' },
  highlights: [
    { title: 'Tư vấn mẫu theo mặt bằng', description: 'Báo giá thực tế không phát sinh' },
    { title: 'Hỗ trợ thi công trọn gói', description: 'Nhanh chóng, đúng tiến độ cam kết' },
  ],
};

export const defaultBestSellers: BestSeller[] = [
  { code: 'W93', price: '590.000', image: '/Sản phẩm bán chạy/W93 - 590.000.jpg' },
  { code: 'W96', price: '590.000', image: '/Sản phẩm bán chạy/W96 - 590.000.jpg' },
  { code: 'OX8', price: '550.000', image: '/Sản phẩm bán chạy/OX8 - 550.000.jpg' },
  { code: 'M162', price: '460.000', image: '/Sản phẩm bán chạy/M162 - 460.000.jpg' },
  { code: 'M168', price: '460.000', image: '/Sản phẩm bán chạy/M168 - 460.000.jpg' },
  { code: 'PX99-1', price: '430.000', image: '/Sản phẩm bán chạy/PX99-1 - 430.000.JPG' },
  { code: 'Z001', price: '390.000', image: '/Sản phẩm bán chạy/Z001 - 390.000.jpg' },
  { code: 'Z008', price: '390.000', image: '/Sản phẩm bán chạy/Z008 - 390.000.jpg' },
  { code: 'N777', price: '370.000', image: '/Sản phẩm bán chạy/N777 - 370.000.jpg' },
];

export const defaultMediaItems: MediaItem[] = [
  {
    type: 'video',
    src: '/Video & hình ảnh thực tế/MONAS Cốt xanh N777.mp4',
    thumbnail: '/Video & hình ảnh thực tế/MONAS N776.JPG',
    title: 'MONAS Cốt xanh N777',
    description: 'Video thi công sàn gỗ MONAS cốt xanh',
  },
  {
    type: 'video',
    src: '/Video & hình ảnh thực tế/OPEN W93.mp4',
    thumbnail: '/Video & hình ảnh thực tế/OPEN W91.JPG',
    title: 'OPEN W93',
    description: 'Video hoàn thiện sàn gỗ OPEN W93',
  },
  {
    type: 'video',
    src: '/Video & hình ảnh thực tế/Sàn nhựa SPC Z001.mov',
    thumbnail: '/Video & hình ảnh thực tế/OPEN Z001.JPG',
    title: 'Sàn nhựa SPC Z001',
    description: 'Video thi công sàn nhựa SPC Z001',
  },
  {
    type: 'video',
    src: '/Video & hình ảnh thực tế/Video O13.mov',
    thumbnail: '/Video & hình ảnh thực tế/OPEN OX6.jpeg',
    title: 'Video O13',
    description: 'Video hoàn thiện công trình',
  },
  {
    type: 'video',
    src: '/Video & hình ảnh thực tế/Video OX6.mov',
    thumbnail: '/Video & hình ảnh thực tế/OPEN OX6.jpeg',
    title: 'Video OX6',
    description: 'Video thi công sàn gỗ xương cá OX6',
  },
  {
    type: 'video',
    src: '/Video & hình ảnh thực tế/video OX9.mov',
    thumbnail: '/Video & hình ảnh thực tế/OPEN OX8.JPG',
    title: 'Video OX9',
    description: 'Video hoàn thiện sàn gỗ xương cá OX9',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/MONAS N776(1).JPG',
    title: 'MONAS N776',
    description: 'Hình ảnh hoàn thiện sàn gỗ MONAS N776',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/MONAS N776.JPG',
    title: 'MONAS N776',
    description: 'Sàn gỗ MONAS N776 sau thi công',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/MONAS N778.JPG',
    title: 'MONAS N778',
    description: 'Hình ảnh hoàn thiện sàn gỗ MONAS N778',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/OPEN OX6.jpeg',
    title: 'OPEN OX6',
    description: 'Sàn gỗ xương cá OPEN OX6',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/OPEN OX8(1).JPG',
    title: 'OPEN OX8',
    description: 'Hình ảnh hoàn thiện sàn gỗ OPEN OX8',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/OPEN OX8.JPG',
    title: 'OPEN OX8',
    description: 'Sàn gỗ OPEN OX8 sau thi công',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/OPEN W91.JPG',
    title: 'OPEN W91',
    description: 'Hình ảnh hoàn thiện sàn gỗ OPEN W91',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/OPEN Z001.JPG',
    title: 'OPEN Z001',
    description: 'Sàn nhựa OPEN Z001 sau thi công',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/OPEN Z008.JPG',
    title: 'OPEN Z008',
    description: 'Hình ảnh hoàn thiện sàn nhựa OPEN Z008',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/PX99-2.JPG',
    title: 'PX99',
    description: 'Sàn gỗ PX99 sau thi công',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/PX99-3.jpeg',
    title: 'PX99',
    description: 'Hình ảnh hoàn thiện sàn gỗ PX99',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/z5734371078601_90d3ae5ed7edeff1f81738a260f34c34-1024x768.jpeg',
    title: 'Công trình hoàn thiện',
    description: 'Hình ảnh thực tế công trình',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/ỐP NANO 2.JPG',
    title: 'Ốp NANO',
    description: 'Ốp tường NANO hoàn thiện',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/ỐP NANO.PNG',
    title: 'Ốp NANO',
    description: 'Hình ảnh ốp tường NANO',
  },
  {
    type: 'image',
    src: '/Video & hình ảnh thực tế/Ốp NANO.JPG',
    title: 'Ốp NANO',
    description: 'Ốp tường NANO sau thi công',
  },
];

export const defaultAboutContent: AboutContent = {
  heroTitle: 'Kho sàn gỗ Miền Bắc',
  heroSubtitle: 'Chuyên cung cấp và thi công sàn gỗ công nghiệp, sàn nhựa chất lượng cao - Giá tại kho',
  sections: [
    {
      title: 'Giới thiệu',
      content: 'Kho Sàn Gỗ Miền Bắc là đơn vị chuyên cung cấp và thi công các dòng sàn gỗ công nghiệp, sàn nhựa chất lượng cao với mức giá cạnh tranh trực tiếp tại kho.',
    },
    {
      title: 'Sứ mệnh',
      content: 'Mang đến cho khách hàng những giải pháp sàn bền – đẹp – phù hợp khí hậu Miền Bắc, giúp không gian sống trở nên hiện đại, tiện nghi và lâu dài theo thời gian.',
    },
    {
      title: 'Dịch vụ thi công',
      content: 'Thi công nhanh – gọn – đúng tiến độ. Đảm bảo kỹ thuật: phẳng nền, khít hèm, hạn chế cong vênh. Tư vấn tận nơi, khảo sát miễn phí.',
    },
  ],
};
