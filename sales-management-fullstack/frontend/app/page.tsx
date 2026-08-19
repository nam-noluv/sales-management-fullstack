import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header>
        <h1>Sales Manager</h1>

        <div>
          <Link href="/login">
            Đăng nhập
          </Link>

          <Link href="/register">
            Đăng ký
          </Link>
        </div>
      </header>

      <section>
        <h2>Chào mừng đến với cửa hàng</h2>

        <p>
          Quản lý và mua sắm sản phẩm dễ dàng.
        </p>
      </section>
    </main>
  );
}