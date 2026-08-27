"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import AuthHeaderActions from "../../../components/layout/AuthHeaderActions";

export default function PublicProductClient({ initialProducts = [] }) {
    const { user, logout } = useAuth();
    const [search, setSearch] = useState("");

    const products = Array.isArray(initialProducts)
        ? initialProducts
        : initialProducts?.items || [];

    const filteredProducts = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return products;

        return products.filter((product) =>
            product.name?.toLowerCase().includes(keyword)
        );
    }, [products, search]);

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#111827",
                color: "#f9fafb",
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
        >
            {/* HEADER */}
            <header
                style={{
                    height: "70px",
                    padding: "0 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #374151",
                    background: "#111827",
                }}
            >
                <Link
                    href="/"
                    style={{
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: "700",
                        textDecoration: "none",
                    }}
                >
                    Sales Manager
                </Link>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            color: "#d1d5db",
                            textDecoration: "none",
                            padding: "9px 14px",
                        }}
                    >
                        Sản phẩm
                    </Link>

                    <AuthHeaderActions
                        user={user}
                        onLogout={logout}
                    />
                </div>
            </header>

            {/* CONTENT */}
            <section
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 24px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "25px",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "28px",
                                fontWeight: "700",
                            }}
                        >
                            Sản phẩm
                        </h1>

                        <p
                            style={{
                                marginTop: "6px",
                                color: "#9ca3af",
                                fontSize: "14px",
                            }}
                        >
                            Khám phá các sản phẩm đang được bán
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "300px",
                            padding: "11px 14px",
                            borderRadius: "8px",
                            border: "1px solid #374151",
                            background: "#1f2937",
                            color: "#fff",
                            outline: "none",
                        }}
                    />
                </div>

                {/* PRODUCTS */}
                {filteredProducts.length === 0 ? (
                    <div
                        style={{
                            padding: "60px",
                            textAlign: "center",
                            background: "#1f2937",
                            borderRadius: "12px",
                            border: "1px solid #374151",
                            color: "#9ca3af",
                        }}
                    >
                        Không có sản phẩm nào
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(220px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    background: "#1f2937",
                                    border: "1px solid #374151",
                                    borderRadius: "12px",
                                    padding: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        height: "150px",
                                        borderRadius: "8px",
                                        background: "#111827",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "15px",
                                        overflow: "hidden",
                                    }}
                                >
                                    {product.imageUrl ? (
                                        <img
                                            src={
                                                product.imageUrl.startsWith(
                                                    "http"
                                                )
                                                    ? product.imageUrl
                                                    : `http://localhost:3001${product.imageUrl}`
                                            }
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <span style={{ color: "#6b7280" }}>
                                            Không có ảnh
                                        </span>
                                    )}
                                </div>

                                <h2
                                    style={{
                                        fontSize: "16px",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    {product.name}
                                </h2>

                                <p
                                    style={{
                                        color: "#9ca3af",
                                        fontSize: "13px",
                                        minHeight: "38px",
                                        margin: "0 0 12px",
                                    }}
                                >
                                    {product.description || "Không có mô tả"}
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <strong
                                        style={{
                                            color: "#60a5fa",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {Number(product.price).toLocaleString(
                                            "vi-VN"
                                        )}{" "}
                                        ₫
                                    </strong>

                                    <span
                                        style={{
                                            color: "#9ca3af",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Còn {product.quantity}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}