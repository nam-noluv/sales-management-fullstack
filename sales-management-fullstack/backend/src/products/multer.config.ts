import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const productImageMulterOptions = {
  storage: diskStorage({
    destination: './uploads/products',
    filename: (req, file, callback) => {
      // Đặt tên file mới để tránh trùng: thời-gian + số ngẫu nhiên + đuôi file gốc
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `product-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowed = /\.(jpg|jpeg|png|webp)$/i;
    if (!allowed.test(extname(file.originalname))) {
      return callback(
        new BadRequestException('Chỉ chấp nhận file ảnh: jpg, jpeg, png, webp'),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // giới hạn 5MB / ảnh
  },
};
