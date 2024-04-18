"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        comment: string;
        name: string;
        designation: string;
        image: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[370px] h-[395px] max-w-full relative rounded-2xl  flex-shrink-0 border-slate-700 px-8 py-12 md:w-[370px]"
                        style={{
                            background:
                                "linear-gradient(116deg, #35333D, #171320,#171320)",
                        }}
                        key={item.name}
                    >
                        {/* <blockquote> */}
                        <div
                            aria-hidden="true"
                            className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                        ></div>
                        <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                            <svg width="43" height="28" viewBox="0 0 43 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7984 27.6L18.9984 0H12.3984L0.398438 27.6H11.7984ZM35.7984 27.6L42.9984 0H36.3984L24.3984 27.6H35.7984Z" fill="url(#paint0_linear_1_54)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1_54" x1="28.8615" y1="-24.7969" x2="41.7939" y2="24.1471" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.00887753" stop-color="rgb(99 102 241)" />
                                        <stop offset="0.1723" stop-color="rgb(67 56 202)" />
                                        <stop offset="0.4204" stop-color="rgb(139 92 246)" />
                                        <stop offset="0.5512" stop-color=" rgb(124 58 237)" />
                                        <stop offset="0.7154" stop-color="rgb(192 132 252)" />
                                        <stop offset="1" stop-color="rgb(168 85 247)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <div className="my-10 text-lg h-[128px] max-h-[128px]">{item.comment}</div>
                        <div className="relative z-20 mt-6 flex flex-row items-center">
                            <div className="flex flex-col pr-5"><Image
                                height={100}
                                width={100}
                                src={item.image}
                                alt={item.name}
                                className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                            /></div>
                            <span className="flex flex-col gap-1">
                                <span className=" text-xl leading-[1.5] text-white font-normal">
                                    {item.name}
                                </span>
                                <span className=" text-md leading-[1.6] text-gray-400 font-normal">
                                    {item.designation}
                                </span>
                            </span>
                        </div>
                        {/* </blockquote> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
