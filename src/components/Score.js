import React, { useState, useEffect } from "react";

export const Score = ({score, bestScore}) => {

    return (
        <div>
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
        </div>
    )
}
