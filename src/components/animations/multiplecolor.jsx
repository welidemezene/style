import React, { useEffect } from 'react';
import { gsap } from 'gsap';

// Five class names: anim-1, anim-2, anim-3, anim-4, anim-5
// Each <rect> gets one of these, at least 10 per class, assigned in a shuffled order.

const rectClassNames = [
    "anim-1", "anim-2", "anim-3", "anim-4", "anim-5",
    "anim-2", "anim-3", "anim-4", "anim-5", "anim-1",
    "anim-3", "anim-4", "anim-5", "anim-1", "anim-2",
    "anim-4", "anim-5", "anim-1", "anim-2", "anim-3",
    "anim-5", "anim-1", "anim-2", "anim-3", "anim-4",
    "anim-1", "anim-2", "anim-3", "anim-4", "anim-5",
    "anim-2", "anim-3", "anim-4", "anim-5", "anim-1",
    "anim-3", "anim-4", "anim-5", "anim-1", "anim-2",
    "anim-4", "anim-5", "anim-1", "anim-2", "anim-3",
    "anim-5", "anim-1", "anim-2", "anim-3", "anim-4",
    "anim-1", "anim-2", "anim-3", "anim-4", "anim-5",
    "anim-2", "anim-3", "anim-4", "anim-5", "anim-1",
    "anim-3", "anim-4", "anim-5", "anim-1", "anim-2",
    "anim-4", "anim-5", "anim-1", "anim-2", "anim-3",
    "anim-5", "anim-1", "anim-2", "anim-3", "anim-4",
    "anim-1", "anim-2", "anim-3", "anim-4", "anim-5",
    "anim-2", "anim-3", "anim-4", "anim-5", "anim-1",
    "anim-3", "anim-4", "anim-5", "anim-1", "anim-2",
    "anim-4", "anim-5", "anim-1", "anim-2", "anim-3",
    "anim-5", "anim-1", "anim-2", "anim-3", "anim-4"
];
// There are 56 <rect> elements (excluding the <rect> in <defs> and <clipPath>), so we need at least 56 class assignments.
// The above array has 100 entries, so it's enough.

const MultipleColorLines = () => {
    useEffect(() => {
        // Animate all rects at the same time, with the same speed and no delay between them
        // Find all rects inside this SVG (excluding those in <defs> or <clipPath>)
        const svg = document.querySelector('svg');
        if (!svg) return;
        const g = svg.querySelector('g');
        if (!g) return;
        const rects = Array.from(g.querySelectorAll('rect'));

        // All rects progress equally: same duration, same delay (no stagger)
        const duration = 3;

        gsap.fromTo(
            rects,
            { opacity: 0, scaleX: 0, transformOrigin: "left center" },
            {
                opacity: 1,
                scaleX: 1,
                duration,
                delay: 0,
                ease: "power2.out"
            }
        );
    }, []);

    let rectIdx = 0;
    // Wrap the SVG in a div with overflow hidden to prevent both horizontal and vertical overflow
    return (
        <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
            <svg width="1919" height="1079" viewBox="0 0 1919 1079" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2_2)">
                    <rect className={rectClassNames[rectIdx++]} width="1919" height="1079" fill="white" />
                    <rect className={rectClassNames[rectIdx++]} x="-134" y="994.356" width="1584.1" height="55.487" transform="rotate(-43 -134 994.356)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-134" y="994.356" width="1584.1" height="55.487" transform="rotate(-43 -134 994.356)" fill="url(#paint0_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-144" y="967.356" width="1584.1" height="55.487" transform="rotate(-43 -144 967.356)" fill="url(#paint1_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="74" y="1092.6" width="1788.28" height="55.487" transform="rotate(-43 74 1092.6)" fill="url(#paint2_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="426" y="1173.6" width="1788.28" height="55.487" transform="rotate(-43 426 1173.6)" fill="url(#paint3_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="415" y="1101.6" width="1788.28" height="57.6893" transform="rotate(-43 415 1101.6)" fill="url(#paint4_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="732" y="1247.6" width="1788.28" height="57.6893" transform="rotate(-43 732 1247.6)" fill="#F2FF41" />
                    <rect className={rectClassNames[rectIdx++]} x="761" y="1330.6" width="1788.28" height="57.6893" transform="rotate(-43 761 1330.6)" fill="url(#paint5_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="642" y="1204.6" width="1788.28" height="57.6893" transform="rotate(-43 642 1204.6)" fill="url(#paint6_linear_2_2)" />
                    {/* path is not a rect, skip className assignment */}
                    <path d="M-319.241 879.602L988.622 -340L1008.29 -305.353L-299.569 914.248L-319.241 879.602Z" fill="#E3FD3C" />
                    <rect className={rectClassNames[rectIdx++]} x="635" y="1154.6" width="1788.28" height="26.1888" transform="rotate(-43 635 1154.6)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="16.4786" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 642.238 1204.65)" fill="url(#paint7_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="278" y="1127.6" width="1788.28" height="48.626" transform="rotate(-43 278 1127.6)" fill="url(#paint8_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="631" y="1094.6" width="1788.28" height="48.626" transform="rotate(-43 631 1094.6)" fill="url(#paint9_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="282" y="1087.6" width="1788.28" height="26.1888" transform="rotate(-43 282 1087.6)" fill="url(#paint10_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-62" y="1053.6" width="1788.28" height="43.72" transform="rotate(-43 -62 1053.6)" fill="url(#paint11_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-311" y="930.602" width="1788.28" height="26.1888" transform="rotate(-43 -311 930.602)" fill="#E03CEB" />
                    <rect className={rectClassNames[rectIdx++]} x="-465" y="894.602" width="1788.28" height="26.1888" transform="rotate(-43 -465 894.602)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-589" y="817.602" width="1788.28" height="64.3583" transform="rotate(-43 -589 817.602)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-695" y="733.602" width="1788.28" height="64.3583" transform="rotate(-43 -695 733.602)" fill="#E6F390" />
                    <rect className={rectClassNames[rectIdx++]} x="-589" y="817.602" width="1788.28" height="58.8692" transform="rotate(-43 -589 817.602)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-610" y="832.602" width="1788.28" height="58.8692" transform="rotate(-43 -610 832.602)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-610" y="832.602" width="1788.28" height="58.8692" transform="rotate(-43 -610 832.602)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-610" y="832.602" width="1788.28" height="58.8692" transform="rotate(-43 -610 832.602)" fill="url(#paint12_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-626" y="768.602" width="1788.28" height="58.8692" transform="rotate(-43 -626 768.602)" fill="#CE39D9" />
                    <rect className={rectClassNames[rectIdx++]} x="-610" y="734.602" width="1788.28" height="11.2025" transform="rotate(-43 -610 734.602)" fill="url(#paint13_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-713.947" y="747.514" width="1788.28" height="21.9972" transform="rotate(-43 -713.947 747.514)" fill="url(#paint14_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-570" y="884.602" width="1788.28" height="58.8692" transform="rotate(-43 -570 884.602)" fill="url(#paint15_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-366" y="1098.6" width="1788.28" height="58.8692" transform="rotate(-43 -366 1098.6)" fill="url(#paint16_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-385" y="1034.6" width="1788.28" height="58.8692" transform="rotate(-43 -385 1034.6)" fill="url(#paint17_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="94" y="1143.6" width="1788.28" height="67.6341" transform="rotate(-43 94 1143.6)" fill="url(#paint18_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="339" y="1141.6" width="1788.28" height="25.7282" transform="rotate(-43 339 1141.6)" fill="#F3FF47" />
                    <rect className={rectClassNames[rectIdx++]} x="590" y="1087.6" width="1788.28" height="31.326" transform="rotate(-43 590 1087.6)" fill="url(#paint19_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="706" y="1226.6" width="1788.28" height="13.0159" transform="rotate(-43 706 1226.6)" fill="url(#paint20_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="887" y="1490.6" width="1788.28" height="13.1796" transform="rotate(-43 887 1490.6)" fill="url(#paint21_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="861" y="1463.6" width="1788.28" height="38.9241" transform="rotate(-43 861 1463.6)" fill="url(#paint22_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="997" y="1649.6" width="1788.28" height="38.9241" transform="rotate(-43 997 1649.6)" fill="url(#paint23_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="778" y="1417.6" width="1788.28" height="38.9241" transform="rotate(-43 778 1417.6)" fill="#2DFFA1" />
                    <rect className={rectClassNames[rectIdx++]} x="-32" y="1090.6" width="1788.28" height="38.9241" transform="rotate(-43 -32 1090.6)" fill="url(#paint24_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-161" y="1090.6" width="1788.28" height="38.9241" transform="rotate(-43 -161 1090.6)" fill="url(#paint25_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-310" y="793.602" width="1788.28" height="38.9241" transform="rotate(-43 -310 793.602)" fill="url(#paint26_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-310" y="793.602" width="1788.28" height="7.06803" transform="rotate(-43 -310 793.602)" fill="#D9D9D9" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="17.6221" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 -292.982 785.49)" fill="#E8F80A" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="17.6221" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 -271.982 834.49)" fill="#E72424" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="40.7206" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 -5.22864 1163.38)" fill="url(#paint27_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="17.6221" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 275.018 1091.49)" fill="#F21C1C" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="25.4764" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 778.375 1208.23)" fill="url(#paint28_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="17.6221" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 799.018 1397.49)" fill="url(#paint29_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="17.6221" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 775.018 1312.49)" fill="url(#paint30_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="17.6221" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 1016.02 1624.49)" fill="url(#paint31_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="46.3436" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 1023.61 1583.5)" fill="#E70CB8" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="31.204" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 987.281 1549.42)" fill="#F2FF41" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="31.204" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 977.281 1473.42)" fill="url(#paint32_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="46.3436" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 860.606 1463.5)" fill="url(#paint33_linear_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="46.3436" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 1014.61 1926.5)" fill="white" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="28.155" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 977.202 1773.19)" fill="url(#paint34_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="28.155" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 819.202 1665.19)" fill="url(#paint35_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="15.2232" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 989.382 1878.74)" fill="url(#paint36_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="67.5169" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 991.931 1819.61)" fill="#22F248" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="21.8929" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 995.931 1835.61)" fill="url(#paint37_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} width="1788.28" height="21.8929" transform="matrix(0.731354 -0.681998 -0.681998 -0.731354 991.931 1794.61)" fill="url(#paint38_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-521" y="907.602" width="1788.28" height="57.6893" transform="rotate(-43 -521 907.602)" fill="url(#paint39_radial_2_2)" />
                    <rect className={rectClassNames[rectIdx++]} x="-677" y="634.602" width="1788.28" height="57.6893" transform="rotate(-43 -677 634.602)" fill="url(#paint40_radial_2_2)" />
                </g>
                <defs>
                    {/* ... gradients and clipPath unchanged ... */}
                    <linearGradient id="paint0_linear_2_2" x1="-134" y1="1022.1" x2="1450.1" y2="1022.1" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E3FD3C" />
                        <stop offset="1" stopColor="#879724" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_2_2" x1="-144" y1="995.1" x2="1440.1" y2="995.1" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F2FF41" />
                        <stop offset="0.0961538" stopColor="#E8F80A" />
                        <stop offset="0.288462" stopColor="#F3FF47" />
                        <stop offset="1" stopColor="#919927" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_2_2" x1="74" y1="1120.35" x2="1862.28" y2="1120.35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#CEEB0C" />
                        <stop offset="0.0528846" stopColor="#DEF73B" />
                        <stop offset="1" stopColor="#879724" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_2_2" x1="426" y1="1201.35" x2="2214.28" y2="1201.35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#37FA54" />
                        <stop offset="1" stopColor="#96AD00" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_2_2" x1="415" y1="1130.45" x2="2203.28" y2="1130.45" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0969F0" />
                        <stop offset="1" stopColor="#053D8A" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_2_2" x1="761" y1="1359.45" x2="2549.28" y2="1359.45" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E3FD3C" />
                        <stop offset="0.153846" stopColor="#EDFF77" />
                        <stop offset="1" stopColor="#879724" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_2_2" x1="642" y1="1233.45" x2="2430.28" y2="1233.45" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F241FF" />
                        <stop offset="0.0769231" stopColor="#A53EAD" />
                        <stop offset="1" stopColor="#912799" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_2_2" x1="1788.28" y1="8.23931" x2="0" y2="8.23931" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E6FC23" />
                        <stop offset="0.269231" stopColor="#CDE01F" />
                        <stop offset="0.384615" stopColor="#C2D51D" />
                        <stop offset="0.451923" stopColor="#BCCE1C" />
                        <stop offset="1" stopColor="#899615" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_2_2" x1="278" y1="1151.91" x2="2066.28" y2="1151.91" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC86E2" />
                        <stop offset="0.0384615" stopColor="#F884DF" />
                        <stop offset="0.0817308" stopColor="#E70CB8" />
                        <stop offset="0.350962" stopColor="#D873C2" />
                        <stop offset="1" stopColor="#965087" />
                    </linearGradient>
                    <linearGradient id="paint9_linear_2_2" x1="631" y1="1118.91" x2="2419.28" y2="1118.91" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#54FF68" />
                        <stop offset="1" stopColor="#33993F" />
                    </linearGradient>
                    <linearGradient id="paint10_linear_2_2" x1="282" y1="1100.7" x2="2070.28" y2="1100.7" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E3FD3C" />
                        <stop offset="0.0865385" stopColor="#DBF43A" />
                        <stop offset="0.144231" stopColor="#D6EE39" />
                        <stop offset="1" stopColor="#879724" />
                    </linearGradient>
                    <linearGradient id="paint11_linear_2_2" x1="-62" y1="1075.46" x2="1726.28" y2="1075.46" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2DFFA1" />
                        <stop offset="1" stopColor="#1B9960" />
                    </linearGradient>
                    <linearGradient id="paint12_linear_2_2" x1="-610" y1="862.036" x2="1178.28" y2="862.036" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E8F80A" />
                        <stop offset="0.538462" stopColor="#FAFFB1" />
                        <stop offset="1" stopColor="#CFDB2D" />
                    </linearGradient>
                    <linearGradient id="paint13_linear_2_2" x1="-610" y1="740.203" x2="1178.28" y2="740.203" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#295396" />
                        <stop offset="1" stopColor="#0D1A30" />
                    </linearGradient>
                    <radialGradient id="paint14_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180.191 758.512) scale(894.138 10.9986)">
                        <stop stopColor="#FBC2F4" />
                        <stop offset="1" stopColor="#957391" />
                    </radialGradient>
                    <linearGradient id="paint15_linear_2_2" x1="-570" y1="914.036" x2="1218.28" y2="914.036" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F241FF" />
                        <stop offset="1" stopColor="#912799" />
                    </linearGradient>
                    <linearGradient id="paint16_linear_2_2" x1="-366" y1="1128.04" x2="1422.28" y2="1128.04" gradientUnits="userSpaceOnUse">
                        <stop offset="0.0576923" stopColor="#EEFF81" />
                        <stop offset="1" stopColor="#879724" />
                    </linearGradient>
                    <linearGradient id="paint17_linear_2_2" x1="-385" y1="1064.04" x2="1403.28" y2="1064.04" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#36F13F" />
                        <stop offset="1" stopColor="#1F8B24" />
                    </linearGradient>
                    <linearGradient id="paint18_linear_2_2" x1="94" y1="1177.42" x2="1882.28" y2="1177.42" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F241FF" />
                        <stop offset="0.192308" stopColor="#E03CEB" />
                        <stop offset="1" stopColor="#912799" />
                    </linearGradient>
                    <linearGradient id="paint19_linear_2_2" x1="590" y1="1103.26" x2="2378.28" y2="1103.26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E03CEB" />
                        <stop offset="0.115385" stopColor="#D439E0" />
                        <stop offset="0.365385" stopColor="#BC32C6" />
                        <stop offset="1" stopColor="#7F2285" />
                    </linearGradient>
                    <linearGradient id="paint20_linear_2_2" x1="706" y1="1233.11" x2="2494.28" y2="1233.11" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="0.110577" stopColor="#E0E0E0" />
                        <stop offset="0.302885" stopColor="#D1D1D1" />
                        <stop offset="1" stopColor="#999999" />
                    </linearGradient>
                    <linearGradient id="paint21_linear_2_2" x1="887" y1="1497.19" x2="2675.28" y2="1497.19" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F241FF" />
                        <stop offset="1" stopColor="#912799" />
                    </linearGradient>
                    <linearGradient id="paint22_linear_2_2" x1="861" y1="1483.06" x2="2649.28" y2="1483.06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#36F13F" />
                        <stop offset="1" stopColor="#1F8B24" />
                    </linearGradient>
                    <linearGradient id="paint23_linear_2_2" x1="997" y1="1669.06" x2="2785.28" y2="1669.06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0969F0" />
                        <stop offset="1" stopColor="#053D8A" />
                    </linearGradient>
                    <linearGradient id="paint24_linear_2_2" x1="-32" y1="1110.06" x2="1756.28" y2="1110.06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D7F31E" />
                        <stop offset="0.216346" stopColor="#C3DD1B" />
                        <stop offset="1" stopColor="#7D8D11" />
                    </linearGradient>
                    <linearGradient id="paint25_linear_2_2" x1="-161" y1="1110.06" x2="1627.28" y2="1110.06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22F248" />
                        <stop offset="0.1875" stopColor="#1FDF42" />
                        <stop offset="1" stopColor="#138C29" />
                    </linearGradient>
                    <linearGradient id="paint26_linear_2_2" x1="-310" y1="813.064" x2="1478.28" y2="813.064" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E6FC23" />
                        <stop offset="1" stopColor="#899615" />
                    </linearGradient>
                    <linearGradient id="paint27_linear_2_2" x1="1788.28" y1="20.3603" x2="0" y2="20.3603" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F2FF41" />
                        <stop offset="1" stopColor="#919927" />
                    </linearGradient>
                    <linearGradient id="paint28_linear_2_2" x1="1788.28" y1="12.7382" x2="0" y2="12.7382" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#458BFC" />
                        <stop offset="1" stopColor="#295396" />
                    </linearGradient>
                    <linearGradient id="paint29_linear_2_2" x1="1788.28" y1="8.81106" x2="0" y2="8.81106" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E8F80A" />
                        <stop offset="0.163462" stopColor="#D9E70A" />
                        <stop offset="0.442308" stopColor="#BECB09" />
                        <stop offset="0.586538" stopColor="#B0BC08" />
                        <stop offset="1" stopColor="#899206" />
                    </linearGradient>
                    <linearGradient id="paint30_linear_2_2" x1="1788.28" y1="8.81106" x2="0" y2="8.81106" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2DFFA1" />
                        <stop offset="1" stopColor="#1B9960" />
                    </linearGradient>
                    <linearGradient id="paint31_linear_2_2" x1="1788.28" y1="8.81106" x2="0" y2="8.81106" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#458BFC" />
                        <stop offset="1" stopColor="#295396" />
                    </linearGradient>
                    <linearGradient id="paint32_linear_2_2" x1="1788.28" y1="15.602" x2="0" y2="15.602" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E81515" />
                        <stop offset="1" stopColor="#820C0C" />
                    </linearGradient>
                    <linearGradient id="paint33_linear_2_2" x1="1788.28" y1="23.1718" x2="0" y2="23.1718" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D439E0" />
                        <stop offset="0.0961538" stopColor="#CB36D6" />
                        <stop offset="0.384615" stopColor="#A12BA9" />
                        <stop offset="0.576923" stopColor="#84238B" />
                        <stop offset="1" stopColor="#741F7A" />
                    </linearGradient>
                    <radialGradient id="paint34_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(894.138 14.0775) rotate(-180) scale(894.138 14.0775)">
                        <stop stopColor="#F241FF" />
                        <stop offset="1" stopColor="#912799" />
                    </radialGradient>
                    <radialGradient id="paint35_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(894.138 14.0775) rotate(-180) scale(894.138 14.0775)">
                        <stop stopColor="#2DFFA1" />
                        <stop offset="1" stopColor="#1B9960" />
                    </radialGradient>
                    <radialGradient id="paint36_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(894.138 7.6116) rotate(-180) scale(894.138 7.6116)">
                        <stop stopColor="#3CBBCF" />
                        <stop offset="1" stopColor="#1E5F69" />
                    </radialGradient>
                    <radialGradient id="paint37_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(894.138 10.9464) rotate(-180) scale(894.138 10.9464)">
                        <stop stopColor="#6291DD" />
                        <stop offset="1" stopColor="#354E77" />
                    </radialGradient>
                    <radialGradient id="paint38_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(894.138 10.9464) rotate(-180) scale(894.138 10.9464)">
                        <stop stopColor="#53D8DC" />
                        <stop offset="1" stopColor="#2D7476" />
                    </radialGradient>
                    <radialGradient id="paint39_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(373.138 936.446) scale(894.138 28.8446)">
                        <stop stopColor="#75CE7F" />
                        <stop offset="1" stopColor="#3B6840" />
                    </radialGradient>
                    <radialGradient id="paint40_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(217.138 663.446) scale(894.138 28.8446)">
                        <stop stopColor="#C8420C" />
                        <stop offset="0.134615" stopColor="#BA3D0B" />
                        <stop offset="1" stopColor="#622006" />
                    </radialGradient>
                    <clipPath id="clip0_2_2">
                        <rect width="1919" height="1079" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default MultipleColorLines;
