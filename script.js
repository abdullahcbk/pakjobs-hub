// Province and district mapping
const provinces = {
  punjab: ["lahore", "rawalpindi", "multan", "faisalabad", "gujranwala"],
  sindh: ["karachi", "hyderabad", "sukkur", "larkana"],
  kpk: ["peshawar", "abbottabad", "mardan"],
  balochistan: ["quetta", "gwadar", "turbat"],
  ajk: ["muzaffarabad", "mirpur"],
  gb: ["gilgit", "skardu"]
};

let jobs = [];

// Populate province dropdown
function populateProvinces() {
  const provinceSelect = document.getElementById('province-select');
  provinceSelect.innerHTML = `<option value="">All Provinces</option>`;
  Object.keys(provinces).forEach(province => {
    provinceSelect.innerHTML += `<option value="${province}">${capitalize(province)}</option>`;
  });
}

// Populate district dropdown based on selected province
function populateDistricts() {
  const province = document.getElementById('province-select').value;
  const districtSelect = document.getElementById('district-select');
  districtSelect.innerHTML = `<option value="">All Districts</option>`;
  if (province && provinces[province]) {
    provinces[province].forEach(district => {
      districtSelect.innerHTML += `<option value="${district}">${capitalize(district)}</option>`;
    });
  }
}

// Fetch jobs from jobs.json
function loadJobs() {
  fetch('jobs.json')
    .then(response => response.json())
    .then(data => {
      jobs = data;
      showJobs();
    })
    .catch(error => {
      console.error('Error loading jobs:', error);
      document.getElementById('job-listings').innerHTML = '<p>Unable to load jobs. Please try again later.</p>';
    });
}

// Filter and display jobs
function showJobs() {
  const province = document.getElementById('province-select').value;
  const district = document.getElementById('district-select').value;
  let filteredJobs = jobs;
  if (province) filteredJobs = filteredJobs.filter(j => j.province === province);
  if (district) filteredJobs = filteredJobs.filter(j => j.district === district);
  
  const listings = filteredJobs.map(j => `
    <div class="job">
      <h2>${j.title}</h2>
      <div><strong>Department:</strong> ${j.department}</div>
      <div><strong>Location:</strong> ${capitalize(j.district)}, ${capitalize(j.province)}</div>
      <div><strong>Requirements:</strong> ${j.requirements}</div>
      <div><strong>Deadline:</strong> ${j.deadline}</div>
      <a href="${j.link}" target="_blank" class="apply-btn">Apply Now</a>
    </div>
  `).join('');
  
  document.getElementById('job-listings').innerHTML = listings || '<p>No jobs found for the selected filters.</p>';
}

// Helper function to capitalize words
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event listeners for dropdowns
document.addEventListener('DOMContentLoaded', () => {
  populateProvinces();
  populateDistricts();
  loadJobs();
  
  document.getElementById('province-select').addEventListener('change', () => {
    populateDistricts();
    showJobs();
  });
  document.getElementById('district-select').addEventListener('change', showJobs);
});
const listings = filteredJobs.map(j => `
  <div class="job">
    <h2>${j.icon || ''} ${j.title}</h2>
    <div><strong>Department:</strong> ${j.department} <span class="badge">${j.type}</span></div>
    <div><strong>Location:</strong> ${capitalize(j.district)}, ${capitalize(j.province)}</div>
    <div><strong>Requirements:</strong> ${j.requirements}</div>
    <div><strong>Deadline:</strong> ${j.deadline}</div>
    <a href="${j.link}" target="_blank" class="apply-btn">Apply Now</a>
  </div>
`).join('');
document.getElementById('search-input').addEventListener('input', showJobs);

function showJobs() {
  const province = document.getElementById('province-select').value;
  const district = document.getElementById('district-select').value;
  const search = document.getElementById('search-input').value.trim().toLowerCase();
  let filteredJobs = jobs;
  if (province) filteredJobs = filteredJobs.filter(j => j.province === province);
  if (district) filteredJobs = filteredJobs.filter(j => j.district === district);
  if (search) {
    filteredJobs = filteredJobs.filter(j =>
      j.title.toLowerCase().includes(search) ||
      j.department.toLowerCase().includes(search)
    );
  }
  // ...rest of rendering code
}
