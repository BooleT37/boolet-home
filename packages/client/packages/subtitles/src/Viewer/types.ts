import React from "react";

export interface Frame {
    text: React.ReactNode;
    index: number;
    startTime: number;
    endTime: number;
}