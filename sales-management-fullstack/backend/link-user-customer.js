// Cách dùng:
// 1. Copy file này vào thư mục backend/ (cùng cấp với package.json)
// 2. Sửa 2 giá trị USER_EMAIL và CUSTOMER_ID bên dưới cho đúng dữ liệu của bạn
// 3. Chạy: node link-user-customer.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const USER_EMAIL = 'nam123@gmail.com'; // email của tài khoản CUSTOMER cần gán
const CUSTOMER_ID = 5; // id của bản ghi Customer muốn gán (lấy từ bảng Customer trong Prisma Studio)

async function main() {
    // Kiểm tra Customer có tồn tại không
    const customer = await prisma.customer.findUnique({
        where: { id: CUSTOMER_ID },
    });

    if (!customer) {
        console.error(`❌ Không tìm thấy Customer với id = ${CUSTOMER_ID}`);
        return;
    }

    // Kiểm tra Customer này đã bị User khác gán chưa (vì customerId là @unique)
    const existingLink = await prisma.user.findUnique({
        where: { customerId: CUSTOMER_ID },
    });

    if (existingLink) {
        console.error(
            `❌ Customer id=${CUSTOMER_ID} đã được gán cho user khác: ${existingLink.email} (id=${existingLink.id})`
        );
        return;
    }

    const updated = await prisma.user.update({
        where: { email: USER_EMAIL },
        data: { customerId: CUSTOMER_ID },
    });

    console.log('✅ Gán thành công:', updated);
}

main()
    .catch((err) => console.error('Lỗi:', err))
    .finally(() => prisma.$disconnect());