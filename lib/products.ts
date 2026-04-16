export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
}

export interface ProductSpecifications {
  origin: string;
  size: string;
  thickness: string;
  waterproof?: string;
  durability?: string;
  installation: string;
  surface: string[];
  warranty: string;
  width?: string;
  material?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  priceRange?: string;
  originalPrice?: string;
  discountedPrice?: string;
  colorCount: number;
  colors: string[];
  specifications: ProductSpecifications;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Sàn Gỗ 8mm Việt Nam',
    slug: 'san-go-8mm-viet-nam',
    description: 'Xuất xứ Việt Nam • Kích thước: 1223×146×8mm • Chống ẩm, chống mối mọt • Hèm khóa • Tiêu chuẩn AC chống trầy xước • Vân gỗ tự nhiên • Bảo hành 10 năm',
    shortDescription: 'Sàn gỗ 8mm Việt Nam, giá tốt, chất lượng ổn định',
    image: '/products/Sàn gỗ 8mm Việt Nam/IMG_9463.JPG',
    originalPrice: '240.000đ/m²',
    discountedPrice: '179.000đ/m²',
    colorCount: 10,
    colors: [
      '/products/Sàn gỗ 8mm Việt Nam/IMG_9463.JPG',
      '/products/Sàn gỗ 8mm Việt Nam/IMG_9464.JPG',
      '/products/Sàn gỗ 8mm Việt Nam/IMG_9465.JPG',
      '/products/Sàn gỗ 8mm Việt Nam/IMG_9466.JPG'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '1223 × 146 × 8mm',
      thickness: '8mm',
      durability: 'Chống ẩm, chống mối mọt',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '10 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '2',
    name: 'Sàn Gỗ Việt Nam',
    slug: 'san-go-cot-nau',
    description: 'Xuất xứ Việt Nam • Kích thước: 1220×146×12mm • Chống ẩm, chống mối mọt • Hèm khóa • Tiêu chuẩn AC4 chống trầy xước • Vân gỗ tự nhiên • Bảo hành 10 năm',
    shortDescription: 'Sàn gỗ cốt nâu giá tốt, chất lượng ổn định',
    image: '/products/Sàn gỗ cốt nâu/O13.jpg',
    originalPrice: '299.000đ/m²',
    discountedPrice: '250.000đ/m²',
    colorCount: 14,
    colors: [
      '/products/Sàn gỗ cốt nâu/1235.jpg',
      '/products/Sàn gỗ cốt nâu/1250.jpg',
      '/products/Sàn gỗ cốt nâu/1260.jpg',
      '/products/Sàn gỗ cốt nâu/1261.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '1220 × 146 × 12mm',
      thickness: '12mm',
      durability: 'Chống ẩm, chống mối mọt',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '10 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '3',
    name: 'Sàn Nhựa 4mm SPC Cao Cấp',
    slug: 'san-nhua-4mm-spc-cao-cap',
    description: 'Xuất xứ Việt Nam • Kích thước: 915×153×4mm • Chống nước: Bảo hành ngập nước 2 năm • Hèm khóa • Chống trầy xước, chống mài mòn cao • Vân gỗ tự nhiên • Bảo hành 10 năm',
    shortDescription: 'Sàn nhựa SPC dày 4mm, giá tốt, chất lượng ổn định',
    image: '/products/Sàn nhựa 4mm SPC cao cấp/B418.jpg',
    originalPrice: '350.000đ/m²',
    discountedPrice: '200.000đ/m²',
    colorCount: 12,
    colors: [
      '/products/Sàn nhựa 4mm SPC cao cấp/B418.jpg',
      '/products/Sàn nhựa 4mm SPC cao cấp/B428.jpg',
      '/products/Sàn nhựa 4mm SPC cao cấp/B438.jpg',
      '/products/Sàn nhựa 4mm SPC cao cấp/B458.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '915 × 153 × 4mm',
      thickness: '4mm',
      waterproof: 'Bảo hành ngập nước 2 năm',
      installation: 'Hèm khóa',
      surface: ['Chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '10 năm về ẩm mốc, mối mọt'
    }
  },
  {
    id: '4',
    name: 'Sàn Gỗ Cốt Xanh Malaysia Cao Cấp',
    slug: 'san-go-cot-xanh',
    description: 'Xuất xứ Việt Nam • Kích thước: 1221×168×12mm • Chống ẩm, chống mối mọt, chịu nước 24H • Hèm khóa • Tiêu chuẩn AC4 chống trầy xước • Vân gỗ tự nhiên • Bảo hành 15 năm',
    shortDescription: 'Sàn gỗ cốt xanh chống ẩm tốt',
    image: '/products/Sàn gỗ cốt xanh/N773.jpg',
    originalPrice: '379.000đ/m²',
    discountedPrice: '335.000đ/m²',
    colorCount: 16,
    colors: [
      '/products/Sàn gỗ cốt xanh/A200.jpg',
      '/products/Sàn gỗ cốt xanh/A250.jpg',
      '/products/Sàn gỗ cốt xanh/A300.jpg',
      '/products/Sàn gỗ cốt xanh/A350.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '1221 × 168 × 12mm',
      thickness: '12mm',
      durability: 'Chống ẩm, chống mối mọt, chịu nước 24H',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '15 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '5',
    name: 'Sàn Gỗ Cao Cấp Malaysia',
    slug: 'san-go-cao-cap-malaysia',
    description: 'Xuất xứ Malaysia • Kích thước: 1219×168×12mm • Chống nước: Bảo hành ngập nước 2 năm • Hèm khóa 5G Thụy Điển • Tiêu chuẩn AC4 chống trầy xước • Bảo hành 20 năm',
    shortDescription: 'Sàn gỗ cao cấp nhập khẩu Malaysia, chất lượng vượt trội',
    image: '/products/Sàn gỗ cao cấp Malaysia /W91.jpg',
    originalPrice: '645.000đ/m²',
    discountedPrice: '550.000đ/m²',
    colorCount: 15,
    colors: [
      '/products/Sàn gỗ cao cấp Malaysia /W91.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /W92.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /W93.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /W94.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /W95.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /W96.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /W97.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-200.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-350.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-450.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-901.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-904.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-908.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-950.jpg',
      '/products/Sàn gỗ cao cấp Malaysia /AS-960.jpg'
    ],
    specifications: {
      origin: 'Malaysia',
      size: '1219 × 168 × 12mm',
      thickness: '12mm',
      waterproof: 'Bảo hành ngập nước 2 năm',
      installation: 'Hèm khóa 5G Thụy Điển',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '20 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '6',
    name: 'Sàn Gỗ Cốt Đen Nhập Khẩu',
    slug: 'san-go-cot-den-cao-cap',
    description: 'Xuất xứ Indonesia • Kích thước: 1221×168×12mm • Chống nước: Bảo hành ngập nước 1 năm • Hèm khóa • Tiêu chuẩn AC4 chống trầy xước • Vân gỗ tự nhiên • Bảo hành 20 năm',
    shortDescription: 'Sàn gỗ cốt đen cao cấp, chống nước tuyệt đối',
    image: '/products/Sàn gỗ cốt đen cao cấp /M161.jpg',
    originalPrice: '530.000đ/m²',
    discountedPrice: '450.000đ/m²',
    colorCount: 15,
    colors: [
      '/products/Sàn gỗ cốt đen cao cấp /M161.jpg',
      '/products/Sàn gỗ cốt đen cao cấp /M162.jpg',
      '/products/Sàn gỗ cốt đen cao cấp /M164.jpg',
      '/products/Sàn gỗ cốt đen cao cấp /M165.jpg'
    ],
    specifications: {
      origin: 'Indonesia',
      size: '1221 × 168 × 12mm',
      thickness: '12mm',
      waterproof: 'Bảo hành ngập nước 1 năm',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '20 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '7',
    name: 'Sàn Gỗ Cốt Đen Việt Nam',
    slug: 'san-go-cot-den-viet-nam',
    description: 'Xuất xứ Việt Nam • Kích thước: 1221×168×12mm • Chống ẩm, chống mối mọt, chịu nước 48H • Hèm khóa • Tiêu chuẩn AC4 chống trầy xước • Vân gỗ tự nhiên • Bảo hành 15 năm',
    shortDescription: 'Sàn gỗ cốt đen Việt Nam, chống ẩm tốt, giá cạnh tranh',
    image: '/products/Sàn gỗ cốt đen Việt Nam/E331.jpg',
    originalPrice: '479.000đ/m²',
    discountedPrice: '389.000đ/m²',
    colorCount: 6,
    colors: [
      '/products/Sàn gỗ cốt đen Việt Nam/E331.jpg',
      '/products/Sàn gỗ cốt đen Việt Nam/E332.jpg',
      '/products/Sàn gỗ cốt đen Việt Nam/E333.jpg',
      '/products/Sàn gỗ cốt đen Việt Nam/E337.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '1221 × 168 × 12mm',
      thickness: '12mm',
      durability: 'Chống ẩm, chống mối mọt, chịu nước 48H',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '15 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '8',
    name: 'Sàn Gỗ Công Nghệ Đức',
    slug: 'san-go-cong-nghe-duc',
    description: 'Xuất xứ CHLB Đức • Kích thước: 1219×168×12mm / 604×130×12mm • Chống nước: Bảo hành ngập nước 2 năm • Hèm khóa 5G Thụy Điển • Tiêu chuẩn AC4 • Bảo hành 20 năm',
    shortDescription: 'Sàn gỗ công nghệ Đức, bền đẹp theo thời gian',
    image: '/products/Sàn gỗ Công Nghệ Đức/OC-607.jpg',
    originalPrice: '650.000đ/m²',
    discountedPrice: '589.000đ/m²',
    colorCount: 10,
    colors: [
      '/products/Sàn gỗ Công Nghệ Đức/OC-607.jpg',
      '/products/Sàn gỗ Công Nghệ Đức/OC-608.jpg',
      '/products/Sàn gỗ Công Nghệ Đức/OC-609.jpg',
      '/products/Sàn gỗ Công Nghệ Đức/OC-610.jpg'
    ],
    specifications: {
      origin: 'CHLB Đức',
      size: '1219 × 168 × 12mm / 604 × 130 × 12mm',
      thickness: '12mm',
      waterproof: 'Bảo hành ngập nước 2 năm',
      installation: 'Hèm khóa 5G Thụy Điển',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '20 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '9',
    name: 'Sàn Gỗ Châu Âu',
    slug: 'san-go-chau-au',
    description: 'Xuất xứ Thổ Nhĩ Kỳ • Kích thước: 1195×189×12mm • Chống nước: Bảo hành ngập nước 2 năm • Hèm khóa • Tiêu chuẩn AC4 chống trầy xước • Vân gỗ tự nhiên • Bảo hành 20 năm',
    shortDescription: 'Sàn gỗ nhập khẩu Châu Âu, thiết kế hiện đại',
    image: '/products/Sàn gỗ Châu Âu/PRK-901.jpg',
    originalPrice: '799.000đ/m²',
    discountedPrice: '689.000đ/m²',
    colorCount: 8,
    colors: [
      '/products/Sàn gỗ Châu Âu/PRK-901.jpg',
      '/products/Sàn gỗ Châu Âu/PRK-902.jpg',
      '/products/Sàn gỗ Châu Âu/PRK-905.jpg',
      '/products/Sàn gỗ Châu Âu/PRK-906.jpg'
    ],
    specifications: {
      origin: 'Thổ Nhĩ Kỳ',
      size: '1195 × 189 × 12mm',
      thickness: '12mm',
      waterproof: 'Bảo hành ngập nước 2 năm',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '20 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '10',
    name: 'Sàn Nhựa 7.5mm SPC Cao Cấp',
    slug: 'san-nhua-7-5mm-spc-cao-cap',
    description: 'Xuất xứ Việt Nam • Kích thước: 1224×185×7.5mm • Chống nước: Bảo hành ngập nước 2 năm • Hèm khóa • Chống trầy xước, chống mài mòn cao • Vân gỗ tự nhiên • Bảo hành 10 năm',
    shortDescription: 'Sàn nhựa SPC dày 7.5mm, chống nước tuyệt đối, độ bền cao',
    image: '/products/Sàn Nhựa 7,5mm SPC cao cấp/Z-001.jpg',
    originalPrice: '399.000đ/m²',
    discountedPrice: '335.000đ/m²',
    colorCount: 7,
    colors: [
      '/products/Sàn Nhựa 7,5mm SPC cao cấp/Z-001.jpg',
      '/products/Sàn Nhựa 7,5mm SPC cao cấp/Z-002.jpg',
      '/products/Sàn Nhựa 7,5mm SPC cao cấp/Z-003.jpg',
      '/products/Sàn Nhựa 7,5mm SPC cao cấp/Z-006.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '1224 × 185 × 7.5mm',
      thickness: '7.5mm',
      waterproof: 'Bảo hành ngập nước 2 năm',
      installation: 'Hèm khóa',
      surface: ['Chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '10 năm về ẩm mốc, mối mọt'
    }
  },
  {
    id: '11',
    name: 'Sàn Nhựa Xương Cá SPC Cao Cấp',
    slug: 'san-nhua-xuong-ca-spc-cao-cap',
    description: 'Xuất xứ Việt Nam • Kích thước: 600×130×7.5mm • Chống nước: Bảo hành ngập nước 2 năm • Hèm khóa • Chống trầy xước, chống mài mòn cao • Vân gỗ tự nhiên • Bảo hành 10 năm',
    shortDescription: 'Sàn nhựa xương cá SPC, thiết kế độc đáo, sang trọng',
    image: '/products/Sàn nhựa xương cá SPC cao cấp/FB-7566.jpg',
    originalPrice: '500.000đ/m²',
    discountedPrice: '450.000đ/m²',
    colorCount: 5,
    colors: [
      '/products/Sàn nhựa xương cá SPC cao cấp/FB-7566.jpg',
      '/products/Sàn nhựa xương cá SPC cao cấp/FB-7568.jpg',
      '/products/Sàn nhựa xương cá SPC cao cấp/FB-7569.jpg',
      '/products/Sàn nhựa xương cá SPC cao cấp/FB-7572.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '600 × 130 × 7.5mm',
      thickness: '7.5mm',
      waterproof: 'Bảo hành ngập nước 2 năm',
      installation: 'Hèm khóa',
      surface: ['Chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '10 năm về ẩm mốc, mối mọt'
    }
  },
  {
    id: '12',
    name: 'Sàn Gỗ Xương Cá',
    slug: 'san-go-xuong-ca',
    description: 'Xuất xứ Malaysia • Kích thước: 604×115×12mm • Chống nước: Bảo hành ngập nước 1 năm • Hèm khóa • Tiêu chuẩn AC4 chống trầy xước • Vân gỗ tự nhiên • Bảo hành 20 năm',
    shortDescription: 'Sàn gỗ xương cá, kiểu dáng độc đáo sang trọng',
    image: '/products/Sàn gỗ xương cá /OX1.jpg',
    priceRange: '430.000đ - 550.000đ/m²',
    colorCount: 12,
    colors: [
      '/products/Sàn gỗ xương cá /OX1.jpg',
      '/products/Sàn gỗ xương cá /OX2.jpg',
      '/products/Sàn gỗ xương cá /OX3.jpg',
      '/products/Sàn gỗ xương cá /OX6.jpg'
    ],
    specifications: {
      origin: 'Malaysia',
      size: '604 × 115 × 12mm',
      thickness: '12mm',
      waterproof: 'Bảo hành ngập nước 1 năm',
      installation: 'Hèm khóa',
      surface: ['Tiêu chuẩn AC4 chống trầy xước, chống mài mòn cao', 'Vân gỗ tự nhiên'],
      warranty: '20 năm về cong vênh, mối mọt'
    }
  },
  {
    id: '13',
    name: 'Tấm Ốp Nội Thất',
    slug: 'tam-op-noi-that',
    description: 'Xuất xứ Việt Nam • Kích thước: 3000×400×9mm • Chống ẩm mốc, chống nước, chống mối mọt • Hèm khóa • Chống trầy xước, chống mài mòn • Đa dạng màu sắc, mẫu mã • Bảo hành 15 năm',
    shortDescription: 'Tấm ốp tường nội thất cao cấp, đa dạng mẫu mã',
    image: '/products/Tấm ốp Nội Thất/ảnh hoàn thiện 6.jpg',
    priceRange: '250.000đ - 350.000đ/m²',
    colorCount: 9,
    colors: [
      '/products/Tấm ốp Nội Thất/ảnh mẫu.jpg',
      '/products/Tấm ốp Nội Thất/Bảng màu.jpg',
      '/products/Tấm ốp Nội Thất/ảnh hoàn thiện 1.jpg',
      '/products/Tấm ốp Nội Thất/ảnh hoàn thiện 2.jpg'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '3000 × 400 × 9mm',
      thickness: '9mm',
      durability: 'Chống ẩm mốc, chống nước, chống mối mọt',
      installation: 'Hèm khóa',
      surface: ['Chống trầy xước, chống mài mòn', 'Đa dạng màu sắc, mẫu mã'],
      warranty: '15 năm về ẩm mốc, mối mọt'
    }
  },
  {
    id: '14',
    name: 'Phụ Kiện Phào Nẹp',
    slug: 'phu-kien-phao-nep',
    description: 'Xuất xứ Việt Nam • Kích thước: Phào 2.44m, Nẹp 2.7m • Độ rộng: 2.5cm • Chống ẩm mốc, chống mối mọt • Nẹp có đế • Đa dạng màu sắc, mẫu mã • Bảo hành 10 năm',
    shortDescription: 'Phụ kiện phào nẹp chân tường, nẹp kết thúc đa dạng',
    image: '/products/Phụ kiện phào nẹp/IMG_9477.JPG',
    priceRange: '20.000đ - 60.000đ/md',
    colorCount: 18,
    colors: [
      '/products/Phụ kiện phào nẹp/IMG_9477.JPG',
      '/products/Phụ kiện phào nẹp/IMG_9479.JPG',
      '/products/Phụ kiện phào nẹp/IMG_9480.JPG',
      '/products/Phụ kiện phào nẹp/IMG_9481.JPG'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: 'Phào: 2.44m, Nẹp: 2.7m',
      thickness: '2.5cm',
      width: '2.5cm',
      durability: 'Chống ẩm mốc, chống mối mọt',
      installation: 'Nẹp có đế',
      surface: ['Đa dạng màu sắc, mẫu mã'],
      warranty: '10 năm về ẩm mốc, mối mọt'
    }
  },
  {
    id: '15',
    name: 'Xốp Lót, Cao Su Non',
    slug: 'xop-lot-cao-su-non',
    description: 'Xuất xứ Việt Nam • Kích thước: 50m - 100m - 150m • Chống ẩm mốc • Lắp đặt: trải sàn • Chất liệu: xốp trắng, xốp tráng bạc, cao su non',
    shortDescription: 'Xốp lót sàn gỗ, cao su non chống ồn, chống ẩm',
    image: '/products/Xốp lót, cao su non/IMG_9475.PNG',
    priceRange: '10.000đ - 20.000đ/m²',
    colorCount: 3,
    colors: [
      '/products/Xốp lót, cao su non/IMG_9475.PNG',
      '/products/Xốp lót, cao su non/IMG_9476.PNG',
      '/products/Xốp lót, cao su non/Xốp trắng.PNG'
    ],
    specifications: {
      origin: 'Việt Nam',
      size: '50m - 100m - 150m',
      thickness: 'Tùy loại',
      durability: 'Chống ẩm mốc',
      installation: 'Trải sàn',
      material: 'Xốp trắng, xốp tráng bạc, cao su non',
      surface: [],
      warranty: 'Không'
    }
  }
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const categoryMap: Record<string, string> = {
    'san-go-cao-cap-malaysia': 'Sàn gỗ cao cấp Malaysia ',
    'san-go-chau-au': 'Sàn gỗ Châu Âu',
    'san-go-cong-nghe-duc': 'Sàn gỗ Công Nghệ Đức',
    'san-go-cot-xanh': 'Sàn gỗ cốt xanh',
    'san-go-cot-den-cao-cap': 'Sàn gỗ cốt đen cao cấp ',
    'san-go-xuong-ca': 'Sàn gỗ xương cá ',
    'san-go-cot-nau': 'Sàn gỗ cốt nâu',
    'san-nhua-7-5mm-spc-cao-cap': 'Sàn Nhựa 7,5mm SPC cao cấp',
    'san-nhua-4mm-spc-cao-cap': 'Sàn nhựa 4mm SPC cao cấp',
    'san-nhua-xuong-ca-spc-cao-cap': 'Sàn nhựa xương cá SPC cao cấp',
    'san-go-cot-den-viet-nam': 'Sàn gỗ cốt đen Việt Nam',
    'tam-op-noi-that': 'Tấm ốp Nội Thất',
    'san-go-8mm-viet-nam': 'Sàn gỗ 8mm Việt Nam',
    'phu-kien-phao-nep': 'Phụ kiện phào nẹp',
    'xop-lot-cao-su-non': 'Xốp lót, cao su non'
  };

  const folderName = categoryMap[categorySlug];
  if (!folderName) return [];

  return [];
};
