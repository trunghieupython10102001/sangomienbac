import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const categoryMap: Record<string, string> = {
    'san-go-cao-cap-malaysia': 'Sàn gỗ cao cấp Malaysia ',
    'san-go-8mm-viet-nam': 'Sàn gỗ 8mm Việt Nam',
    'san-go-cot-den-cao-cap': 'Sàn gỗ cốt đen cao cấp ',
    'san-go-cot-den-viet-nam': 'Sàn gỗ cốt đen Việt Nam',
    'san-go-cot-xanh': 'Sàn gỗ cốt xanh',
    'san-go-xuong-ca': 'Sàn gỗ xương cá ',
    'san-go-cong-nghe-duc': 'Sàn gỗ Công Nghệ Đức',
    'san-go-chau-au': 'Sàn gỗ Châu Âu',
    'san-go-cot-nau': 'Sàn gỗ cốt nâu',
    'san-nhua-7-5mm-spc-cao-cap': 'Sàn Nhựa 7,5mm SPC cao cấp',
    'san-nhua-4mm-spc-cao-cap': 'Sàn nhựa 4mm SPC cao cấp',
    'san-nhua-xuong-ca-spc-cao-cap': 'Sàn nhựa xương cá SPC cao cấp',
    'tam-op-noi-that': 'Tấm ốp Nội Thất',
    'phu-kien-phao-nep': 'Phụ kiện phào nẹp',
    'xop-lot-cao-su-non': 'Xốp lót, cao su non'
  };

  const folderName = categoryMap[slug];
  
  if (!folderName) {
    return NextResponse.json({ images: [] });
  }

  try {
    const publicDir = path.join(process.cwd(), 'public', 'products', folderName);
    const files = fs.readdirSync(publicDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );
    
    const images = imageFiles.map(file => `/products/${folderName}/${file}`);
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json({ images: [] });
  }
}
