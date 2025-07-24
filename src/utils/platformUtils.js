// Platform and browser detection utilities for cross-platform animations

export const getPlatformInfo = () => {
    if (typeof window === 'undefined') {
        return {
            isMac: false,
            isWindows: false,
            isSafari: false,
            isWebKit: false,
            hasNotch: false,
        };
    }

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    
    const isMac = /Mac|iPhone|iPad|iPod/.test(platform) || /Macintosh/.test(userAgent);
    const isWindows = /Win/.test(platform);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isWebKit = /WebKit/.test(userAgent);
    
    // Detect if device has notch (affects viewport calculations)
    const hasNotch = window.screen && (
        window.screen.height === 812 || // iPhone X/XS
        window.screen.height === 896 || // iPhone XR/XS Max
        window.screen.height === 844 || // iPhone 12/13
        window.screen.height === 926    // iPhone 12/13 Pro Max
    );

    return {
        isMac,
        isWindows,
        isSafari,
        isWebKit,
        hasNotch,
    };
};

// Get safe viewport height that works across platforms
export const getSafeViewportHeight = () => {
    if (typeof window === 'undefined') return '100vh';
    
    const { isSafari, isMac } = getPlatformInfo();
    
    // For Safari and Mac, use actual viewport height instead of 100vh
    if (isSafari || isMac) {
        return `${window.innerHeight}px`;
    }
    
    return '100vh';
};

// Get adjusted viewport width for consistent sizing
export const getSafeViewportWidth = () => {
    if (typeof window === 'undefined') return '100vw';
    
    const { isMac } = getPlatformInfo();
    
    // Mac sometimes has scrollbar issues with 100vw
    if (isMac) {
        return `${window.innerWidth}px`;
    }
    
    return '100vw';
};

// Get responsive positioning adjustments for different platforms
export const getPlatformAdjustments = (width) => {
    const { isMac, isWebKit } = getPlatformInfo();
    
    const baseAdjustments = {
        mobile: { scale: 1, translateX: 0, translateY: 0 },
        tablet: { scale: 1, translateX: 0, translateY: 0 },
        desktop: { scale: 1, translateX: 0, translateY: 0 },
    };

    if (isMac || isWebKit) {
        // Mac/WebKit specific adjustments
        return {
            mobile: { 
                scale: 0.98, 
                translateX: isMac ? -2 : 0, 
                translateY: isMac ? -3 : 0 
            },
            tablet: { 
                scale: 0.99, 
                translateX: isMac ? -1 : 0, 
                translateY: isMac ? -2 : 0 
            },
            desktop: { 
                scale: 1, 
                translateX: isMac ? 0 : 0, 
                translateY: isMac ? -1 : 0 
            },
        };
    }

    return baseAdjustments;
};

// Get device-responsive breakpoints that work consistently
export const getResponsiveBreakpoint = (width) => {
    if (width <= 600) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
};

// Debounced resize handler for performance
export const createResizeHandler = (callback, delay = 100) => {
    let timeoutId;
    
    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback();
        }, delay);
    };
};

// Get optimized transform properties for different browsers
export const getOptimizedTransform = (transforms) => {
    const { isWebKit, isMac } = getPlatformInfo();
    
    let transformString = '';
    const willChange = ['transform'];
    
    if (transforms.translateX !== undefined || transforms.translateY !== undefined) {
        const x = transforms.translateX || 0;
        const y = transforms.translateY || 0;
        transformString += `translate3d(${x}px, ${y}px, 0) `;
        
        // Use translate3d for hardware acceleration on WebKit
        if (isWebKit) {
            willChange.push('transform');
        }
    }
    
    if (transforms.scale !== undefined) {
        transformString += `scale(${transforms.scale}) `;
    }
    
    if (transforms.rotate !== undefined) {
        transformString += `rotate(${transforms.rotate}deg) `;
    }
    
    if (transforms.rotateX !== undefined) {
        transformString += `rotateX(${transforms.rotateX}deg) `;
    }
    
    if (transforms.rotateY !== undefined) {
        transformString += `rotateY(${transforms.rotateY}deg) `;
    }
    
    return {
        transform: transformString.trim(),
        willChange: willChange.join(', '),
        // Add backface-visibility for smoother animations on WebKit
        ...(isWebKit && { backfaceVisibility: 'hidden' }),
        // Force hardware acceleration on Mac
        ...(isMac && { WebkitTransform: transformString.trim() }),
    };
};