// LifeSource product catalog and pipe-size rules.
// The app reads this, and so does the model generator, so the two never disagree.
(function () {
  'use strict';

  // Sizes from the 1620S, 2250S and 4140LE Ultimate Protection Package spec sheets.
  const FILTERS = {
    '1620': { name: '1620S Elite Water Filter', short: '1620S Elite', dim: '10" × 62.5"' },
    '2250': { name: '2250S Premier Water Filter', short: '2250S Premier', dim: '13" × 62.5"' },
    '4140': { name: '4140LE Estate Water Filter', short: '4140LE Estate', dim: '16" × 76.5"' },
  };
  const FILTER_NOTE = 'Needs an outlet within 5 ft. Leave 4" above for the valve cover.';

  const SCALES = {
    '5544': { name: '5544 ScaleSolver', dim: '10" × 59.75"' },
    '6633': { name: '6633 ScaleSolver', dim: '12" × 56.5"' },
  };
  const SCALE_NOTE = 'No backwash, no electricity needed.';

  const APA = { name: 'ApaPure12 Disinfection', dim: '3" × 10"', note: 'Needs 20" on the cold water main.' };
  const APA_PLACEMENT = 'ApaPure placement varies by installation. It can be mounted above, behind or beside the tanks.';

  // Pipe size decides which filters, which ScaleSolver and how many ApaPure12 units.
  const PIPE_SIZES = [
    { id: '1', label: '1"', filters: ['1620', '2250'], scale: '5544', apa: 1 },
    { id: '1.25', label: '1¼"', filters: ['1620', '2250'], scale: '5544', apa: 1 },
    { id: '1.5', label: '1½"', filters: ['2250', '4140'], scale: '6633', apa: 2 },
    { id: '2', label: '2"', filters: ['4140'], scale: '6633', apa: 3 },
  ];

  const PACKAGES = [
    { id: 'ultimate', name: 'Ultimate', full: 'Ultimate Protection Package', scale: true, apa: true, badge: 'Best' },
    { id: 'power', name: 'Power Package', full: 'Power Package', scale: true, apa: false },
    { id: 'essential', name: 'Essential Package', full: 'Essential Package', scale: false, apa: true },
    { id: 'filter', name: 'Filter Only', full: 'Filter Only', scale: false, apa: false },
  ];

  // What physically goes in the room for a pipe size + filter + package.
  function specFor(pipe, filterId, pkg) {
    return { filter: filterId, scale: pkg.scale ? pipe.scale : null, apa: pkg.apa ? pipe.apa : 0 };
  }
  // Model file name, e.g. "2250-6633-a2" (filter, ScaleSolver, number of ApaPure12 units).
  function modelKey(spec) {
    return [spec.filter, spec.scale, spec.apa ? 'a' + spec.apa : null].filter(Boolean).join('-');
  }

  window.CATALOG = { FILTERS, FILTER_NOTE, SCALES, SCALE_NOTE, APA, APA_PLACEMENT, PIPE_SIZES, PACKAGES, specFor, modelKey };
})();
