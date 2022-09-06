import React, { useState } from "react";

export const Score = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <p>Score:</p>
            <p>Best score:</p>
        </div>
    )
}
