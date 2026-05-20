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
}

export interface BestSeller {
  code: string;
  price: string;
  image: string;
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
  facebookUrl: '#',
  zaloUrl: '#',
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
