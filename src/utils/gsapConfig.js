// GSAP configuration for optimal mobile performance
import { gsap } from 'gsap';
import { getPlatformInfo } from './platformUtils';

// Mobile-optimized GSAP settings
export const initGSAPConfig = () => {
    const platformInfo = getPlatformInfo();
    
    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        gsap.config({
            force3D: true,
            autoSleep: 60,
            stringFilter: "",
            nullTargetWarn: false,
        });
        
        // Reduce motion for mobile performance
        gsap.defaults({
            duration: 0.8,
            ease: "power2.out",
        });
    } else {
        gsap.config({
            force3D: true,
            autoSleep: 120,
        });
    }
    
    // Platform-specific optimizations
    if (platformInfo.isWebKit) {
        gsap.ticker.fps(60);
    }
};

// Mobile-safe animation wrapper
export const mobileOptimizedTo = (target, vars) => {
    const isMobile = window.innerWidth <= 768;
    const optimizedVars = {
        ...vars,
        force3D: true,
        ...(isMobile && {
            duration: Math.min(vars.duration || 1, 0.6),
            ease: vars.ease || "power2.out",
        }),
    };
    
    return gsap.to(target, optimizedVars);
};

// Cleanup helper for mobile
export const cleanupMobileAnimations = () => {
    if (window.innerWidth <= 768) {
        gsap.killTweensOf("*");
        gsap.globalTimeline.clear();
    }
};
