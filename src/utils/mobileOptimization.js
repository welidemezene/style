// Mobile Optimization Utilities
// This file contains mobile-specific optimizations and performance improvements

// Check if device is mobile
export const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 600;
};

// Check if device is very small mobile
export const isSmallMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 480;
};

// Check if device is tablet
export const isTablet = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 600 && window.innerWidth <= 1024;
};

// Check if device is desktop
export const isDesktop = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024;
};

// Get device type
export const getDeviceType = () => {
    if (isSmallMobile()) return 'small-mobile';
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
};

// Mobile-optimized animation durations
export const getMobileAnimationDurations = () => {
    const deviceType = getDeviceType();

    switch (deviceType) {
        case 'small-mobile':
            return {
                fast: 0.2,
                normal: 0.4,
                slow: 0.8,
                verySlow: 1.2
            };
        case 'mobile':
            return {
                fast: 0.3,
                normal: 0.5,
                slow: 1.0,
                verySlow: 1.5
            };
        case 'tablet':
            return {
                fast: 0.4,
                normal: 0.6,
                slow: 1.2,
                verySlow: 1.8
            };
        default:
            return {
                fast: 0.5,
                normal: 0.8,
                slow: 1.5,
                verySlow: 2.0
            };
    }
};

// Mobile-optimized delays
export const getMobileDelays = () => {
    const deviceType = getDeviceType();

    switch (deviceType) {
        case 'small-mobile':
            return {
                short: 20,
                medium: 40,
                long: 60
            };
        case 'mobile':
            return {
                short: 30,
                medium: 50,
                long: 80
            };
        case 'tablet':
            return {
                short: 35,
                medium: 55,
                long: 90
            };
        default:
            return {
                short: 40,
                medium: 60,
                long: 100
            };
    }
};

// Mobile performance optimizations
export const getMobilePerformanceSettings = () => {
    const deviceType = getDeviceType();

    return {
        useForce3D: deviceType === 'mobile' || deviceType === 'small-mobile',
        reduceComplexity: deviceType === 'small-mobile',
        optimizeMemory: deviceType === 'mobile' || deviceType === 'small-mobile',
        useHardwareAcceleration: true
    };
};

// Mobile viewport utilities
export const getMobileViewport = () => {
    if (typeof window === 'undefined') {
        return {
            width: 375,
            height: 667,
            isLandscape: false
        };
    }

    return {
        width: window.innerWidth,
        height: window.innerHeight,
        isLandscape: window.innerWidth > window.innerHeight
    };
};

// Mobile safe area utilities
export const getMobileSafeArea = () => {
    if (typeof window === 'undefined') return { top: 0, bottom: 0, left: 0, right: 0 };

    const style = getComputedStyle(document.documentElement);

    return {
        top: parseInt(style.getPropertyValue('--sat') || '0'),
        bottom: parseInt(style.getPropertyValue('--sab') || '0'),
        left: parseInt(style.getPropertyValue('--sal') || '0'),
        right: parseInt(style.getPropertyValue('--sar') || '0')
    };
};

// Mobile touch utilities
export const getMobileTouchSettings = () => {
    const deviceType = getDeviceType();

    return {
        enableTouch: true,
        preventZoom: deviceType === 'mobile' || deviceType === 'small-mobile',
        preventScroll: false,
        enableSwipe: true
    };
};

// Mobile memory management
export const optimizeMobileMemory = () => {
    if (!isMobile()) return;

    // Reduce animation complexity on mobile
    const animations = document.querySelectorAll('[class*="animation"]');
    animations.forEach(el => {
        el.style.willChange = 'auto';
    });

    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (isMobile()) {
            img.loading = 'lazy';
        }
    });
};

// Mobile scroll optimization
export const optimizeMobileScroll = () => {
    if (!isMobile()) return;

    // Add smooth scrolling for mobile
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optimize scroll performance
    const containers = document.querySelectorAll('.mobile-scroll-container');
    containers.forEach(container => {
        container.style.webkitOverflowScrolling = 'touch';
        container.style.overflowScrolling = 'touch';
    });
};

// Mobile animation optimization
export const optimizeMobileAnimations = () => {
    if (!isMobile()) return;

    const settings = getMobilePerformanceSettings();

    // Apply mobile optimizations to GSAP animations
    if (window.gsap) {
        window.gsap.defaults({
            force3D: settings.useForce3D,
            overwrite: 'auto'
        });
    }
};

// Mobile initialization
export const initializeMobileOptimizations = () => {
    if (typeof window === 'undefined') return;

    // Set CSS custom properties for safe areas
    const safeArea = getMobileSafeArea();
    document.documentElement.style.setProperty('--sat', `${safeArea.top}px`);
    document.documentElement.style.setProperty('--sab', `${safeArea.bottom}px`);
    document.documentElement.style.setProperty('--sal', `${safeArea.left}px`);
    document.documentElement.style.setProperty('--sar', `${safeArea.right}px`);

    // Apply mobile optimizations
    optimizeMobileMemory();
    optimizeMobileScroll();
    optimizeMobileAnimations();

    // Add mobile-specific classes to body
    const deviceType = getDeviceType();
    document.body.classList.add(`device-${deviceType}`);

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            initializeMobileOptimizations();
        }, 100);
    });

    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeMobileOptimizations();
        }, 250);
    });
};

// Export default settings
export const mobileSettings = {
    isMobile: isMobile(),
    isSmallMobile: isSmallMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    deviceType: getDeviceType(),
    animationDurations: getMobileAnimationDurations(),
    delays: getMobileDelays(),
    performanceSettings: getMobilePerformanceSettings(),
    viewport: getMobileViewport(),
    safeArea: getMobileSafeArea(),
    touchSettings: getMobileTouchSettings()
}; 