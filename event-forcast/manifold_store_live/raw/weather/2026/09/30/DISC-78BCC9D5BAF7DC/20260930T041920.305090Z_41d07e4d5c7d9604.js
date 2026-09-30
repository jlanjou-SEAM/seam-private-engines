// status.js
//
// 2025-07 - Jake Zappin
//--------------------------------------------------------------------------------------
// This file is the Javscript associated with and responsible for displaying the human 
// readable format of the NOMADS Status Page.
//---------------------------------------------------------------------------------------

const timestamp = Date.now(); // Cache-busting timestamp

fetch(`/status/status.json?v=${timestamp}`)
  .then(res => res.json())
  .then(statusData => {
    renderStatus(statusData);
  })
  .catch(() => {
    document.getElementById('status-container').innerHTML = `
      <p style="color: red;">Failed to load status data.</p>
    `;
  });

const statusColorClass = {
  up: "status-up",
  degraded: "status-degraded",
  down: "status-down",
  maintenance: "status-maintenance",
  default: "status-generic"
};

const iconMap = {
  up: "✅",
  degraded: "⚠️",
  down: "❌",
  maintenance: "🔧",
  default: "ℹ️"
};

const testTooltips = {
  heartbeat: "This test verifies the availability of the NOMADS server by attempting to retrieve a small 'heartbeat' file every 5 minutes. A successful retrieval indicates that the server is up and responding.",
  gribfilter: "The Grib Filter is validated by testing the GFS 0.25° dataset every 5 minutes to ensure the filter remains operational and correctly processes the data.",
};

function renderStatus(data) {
  const container = document.getElementById("status-container");
  const status = (data.override?.status || data.status || '').toLowerCase();
  const colorClass = statusColorClass[status] || statusColorClass.default;
  const icon = iconMap[status] || iconMap.default;

  container.className = `status-wrapper ${colorClass}`;

  const override = data.override && Object.keys(data.override).length > 0 ? data.override : null;

  if (override) {
    container.innerHTML = `
      <div class="status-title">${icon} ${override.status}</div>
      <div class="status-subtext">Last updated: ${formatUTCDate(data.lastUpdated)}</div>
      ${status !== 'maintenance' ? `<p><strong>Data Center:</strong> ${data.dataCenter || 'N/A'}</p>` : ''}
      <h4>Manual Override Active</h4>
      <p><strong>Start:</strong> ${override.startDate} UTC</p>
      <p><strong>End:</strong> ${override.endDate} UTC</p>
      <p><strong>Notes:</strong> ${override.notes || ''}</p>
      ${['up','down','degraded'].includes(status) ? renderTestResults(data.tests) : ''}
    `;
  } else {
    container.innerHTML = `
      <div class="status-title">${icon} ${data.status}</div>
      <div class="status-subtext">Last updated: ${formatUTCDate(data.lastUpdated)}</div>
      <p><strong>Data Center:</strong> ${data.dataCenter || 'N/A'}</p>
      ${data.statusMessage ? `<p><strong>Status Message:</strong> ${data.statusMessage}</p>` : ''}
      ${['up','down','degraded'].includes(status) ? renderTestResults(data.tests) : ''}
    `;
  }
}

function renderTestResults(tests) {
  if (!tests || Object.keys(tests).length === 0) return '';
  const testRows = Object.entries(tests).map(([test, result]) => {
    const badgeClass = result === "Pass" ? "badge-pass" : "badge-fail";
    const tooltip = testTooltips[test.toLowerCase()] || '';
    return `
      <tr>
        <td>${formatTestName(test)} <span class="tooltip-icon" title="${tooltip}">?</span></td>
        <td style="text-align: center;"><span class="badge ${badgeClass}">${result}</span></td>
      </tr>`;
  }).join('');
  return `
    <h4>Test Results</h4>
    <table class="test-table">
      <thead>
        <tr>
          <th style="text-align: center;">Test</th>
          <th style="text-align: center;">Status</th>
        </tr>
      </thead>
      <tbody>${testRows}</tbody>
    </table>
  `;
}

function formatTestName(test) {
  switch (test.toLowerCase()) {
    case 'heartbeat': return 'Server Availability Heartbeat';
    case 'gribfilter': return 'Grib Filter Availability';
    default: return test.charAt(0).toUpperCase() + test.slice(1);
  }
}

function formatUTCDate(input) {
  const date = new Date(input);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} UTC`;
}
