import { useState, useEffect } from 'react';

/**
 * useDeviceCapability — Detects device performance tier for adaptive rendering.
 *
 * @returns {{ tier: 'high'|'medium'|'low', isMobile: boolean, dpr: [number, number], particleCount: number }}
 */
const useDeviceCapability = () => {
  const [capability, setCapability] = useState({
    tier: 'high',
    isMobile: false,
    dpr: [1, 2],
    particleCount: 200,
    enableThreeJS: true,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || window.innerWidth < 768;

    // Check WebGL support
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch (e) {
      hasWebGL = false;
    }

    // Check GPU tier via renderer info
    let gpuTier = 'high';
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        if (ext) {
          const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // Low-end GPU indicators
          if (renderer.includes('mali') || renderer.includes('adreno 3') ||
              renderer.includes('powervr') || renderer.includes('intel hd 4') ||
              renderer.includes('swiftshader')) {
            gpuTier = 'low';
          } else if (renderer.includes('adreno 5') || renderer.includes('intel hd 5') ||
                     renderer.includes('intel uhd')) {
            gpuTier = 'medium';
          }
        }
      }
    } catch (e) {
      // Fallback — mobile = medium, desktop = high
      gpuTier = isMobile ? 'medium' : 'high';
    }

    // Memory check
    const memoryGB = navigator.deviceMemory || 4;
    if (memoryGB <= 2) gpuTier = 'low';
    else if (memoryGB <= 4 && gpuTier === 'high') gpuTier = 'medium';

    const config = {
      high:   { dpr: [1, 2],   particleCount: 200, enableThreeJS: true },
      medium: { dpr: [1, 1.5], particleCount: 100, enableThreeJS: true },
      low:    { dpr: [1, 1],   particleCount: 40,  enableThreeJS: hasWebGL },
    };

    const tierConfig = config[gpuTier];

    setCapability({
      tier: gpuTier,
      isMobile,
      ...tierConfig,
    });
  }, []);

  return capability;
};

export default useDeviceCapability;
