"use client";

import dashboardStyles from "../styles";
import { buildStatCards } from "../utils/dashboardHelpers";

export default function StatCards({ stats, isAdmin }) {
    const cards = buildStatCards(stats);
    const visibleCards = isAdmin ? cards : cards.filter(c => c.label === 'SẢN PHẨM');

    return (
        <div style={dashboardStyles.cards}>
            {visibleCards.map(card => (
                <div key={card.label} style={dashboardStyles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={dashboardStyles.cardLabel}>{card.label}</p>
                            <p style={dashboardStyles.cardValue}>{card.value}</p>
                        </div>
                        <div style={{ ...dashboardStyles.cardIcon, background: card.iconBg }}>
                            {card.icon}
                        </div>
                    </div>
                    <p style={{ ...dashboardStyles.cardSub, color: card.subColor }}>{card.sub}</p>
                </div>
            ))}
        </div>
    );
}