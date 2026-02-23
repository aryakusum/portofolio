import { useRef, useEffect, useMemo } from 'react';
import { getProject, types } from '@theatre/core';

/**
 * useTheatreScroll — Binds a Theatre.js sheet to scroll progress.
 *
 * @param {string} projectName - Unique Theatre.js project name
 * @param {string} sheetName   - Sheet name inside the project
 * @param {object} props       - Theatre.js props definition (key→type mapping)
 * @param {object} scrollOptions - { target, offset } for scroll binding
 * @returns {{ values: object, progress: number }}
 */
const useTheatreScroll = (projectName, sheetName, props = {}, scrollOptions = {}) => {
  const containerRef = useRef(null);
  const valuesRef = useRef({});
  const progressRef = useRef(0);

  const project = useMemo(() => {
    try {
      return getProject(projectName);
    } catch {
      return getProject(projectName + '_' + Math.random().toString(36).slice(2, 6));
    }
  }, [projectName]);

  const sheet = useMemo(() => project.sheet(sheetName), [project, sheetName]);

  const theatreObj = useMemo(() => {
    const propsDef = {};
    Object.entries(props).forEach(([key, config]) => {
      if (typeof config === 'number') {
        propsDef[key] = types.number(config, { range: [0, 1] });
      } else if (typeof config === 'object' && config.default !== undefined) {
        propsDef[key] = types.number(config.default, {
          range: config.range || [0, 1],
        });
      }
    });
    return sheet.object('ScrollProps', propsDef);
  }, [sheet, props]);

  useEffect(() => {
    const target = scrollOptions.target?.current || containerRef.current;
    if (!target) return;

    const handleScroll = () => {
      const rect = target.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = rect.height - windowH;

      let progress = 0;
      if (totalH > 0) {
        progress = Math.max(0, Math.min(1, -rect.top / totalH));
      }

      progressRef.current = progress;
      sheet.sequence.position = progress * sheet.sequence.length;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sheet, scrollOptions.target]);

  useEffect(() => {
    const unsub = theatreObj.onValuesChange((newValues) => {
      valuesRef.current = newValues;
    });
    return unsub;
  }, [theatreObj]);

  return {
    containerRef,
    values: valuesRef,
    progress: progressRef,
    sheet,
    project,
  };
};

export default useTheatreScroll;
