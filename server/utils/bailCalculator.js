function calculateBailEligibility(params) {
  const { arrestDate, section, isFirstOffence, isCapitalOffence } = params;

  if (isCapitalOffence) {
    return {
      eligible: false,
      reason: "Capital offence — Section 479 BNSS not applicable. Manual court review required."
    };
  }

  const offenceMap = {
    "IPC 420": 84, "BNS 318": 84,
    "IPC 379": 36, "BNS 303": 36,
    "IPC 323": 12, "BNS 115": 12,
    "IPC 406": 36, "BNS 316": 36,
    "IPC 302": Infinity, "BNS 103": Infinity,
    "IPC 376": Infinity, "BNS 64": Infinity
  };

  const maxMonths = offenceMap[section];

  if (maxMonths === undefined) {
    return {
      eligible: null,
      reason: "Section not in database. Please consult a lawyer or NALSA."
    };
  }

  if (maxMonths === Infinity) {
    return {
      eligible: false,
      reason: "Life imprisonment — Section 479 not applicable"
    };
  }

  const arrest = new Date(arrestDate);
  const today = new Date();
  let monthsServed = (today.getFullYear() - arrest.getFullYear()) * 12;
  monthsServed -= arrest.getMonth();
  monthsServed += today.getMonth();

  if (today.getDate() < arrest.getDate()) {
    monthsServed--;
  }
  monthsServed = Math.max(0, monthsServed);

  const monthsRequired = isFirstOffence ? Math.ceil(maxMonths / 3) : Math.ceil(maxMonths / 2);
  const eligible = monthsServed >= monthsRequired;
  const monthsRemaining = Math.max(0, monthsRequired - monthsServed);

  return {
    eligible,
    monthsServed,
    monthsRequired,
    monthsRemaining,
    maxSentenceYears: maxMonths / 12,
    section: "Section 479 BNSS 2023"
  };
}

module.exports = { calculateBailEligibility };
