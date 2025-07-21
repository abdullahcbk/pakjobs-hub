// Example job data (you can add more jobs or fetch from a backend/API)
const jobs = [
  {
    title: "Government School Teacher",
    department: "Punjab Education Department",
    province: "punjab",
    district: "lahore",
    requirements: "Master's Degree in relevant subject, B.Ed, Age: 22-35 years",
    deadline: "2025-08-10",
    link: "https://schools.punjab.gov.pk/jobs"
  },
  {
    title: "Police Constable",
    department: "Sindh Police",
    province: "sindh",
    district: "karachi",
    requirements: "Intermediate, Age: 18-25 years, Height: 5'7\"",
    deadline: "2025-08-12",
    link: "https://sindhpolice.gov.pk/careers"
  },
  {
    title: "Software Engineer (Private)",
    department: "Tech Solutions Pvt Ltd",
    province: "punjab",
    district: "rawalpindi",
    requirements: "BS Computer Science, 2+ years experience",
    deadline: "2025-08-15",
    link: "https://techsolutions.com.pk/jobs"
  },
  {
    title: "Medical Officer",
    department: "KPK Health Department",
    province: "kpk",
    district: "peshawar",
    requirements: "MBBS, Registered with PMC",
    deadline: "2025-08-20",
    link: "https://healthkp.gov.pk/jobs"
  }
  // Add more jobs here
];

// Province to districts mapping (add more districts as needed)
const provinces = {
  punjab: ["Lahore", "Rawalpindi", "Multan", "Faisalabad", "Gujranwala"],
  sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
  kpk: ["Peshawar", "Abbottabad", "Mardan"],
  balochistan: ["Quetta", "Gwadar", "Turbat"],
  ajk: ["Muzaffarabad", "Mirpur"],
  gb: ["Gilgit", "Skardu"]
};

document.getElementById('province-select').addEventListener('change', function() {
  const province = this.value;
  const districtSelect = document.getElementById('district-select');
  districtSelect.innerHTML = '<option value="">All Districts</option>';
  if (province && provinces[province]) {
    provinces[province].forEach(d => {
      districtSelect.innerHTML += `<option value="${d.toLowerCase()}">${d}</option>`;
    });
  }
  showJobs();
});

document.getElementById('district-select').addEventListener('change', showJobs);

function showJobs() {
  const province = document.getElementById('province-select').value;
  const district = document.getElementById('district-select').value;
  let filteredJobs = jobs;
  if (province) filteredJobs = filteredJobs.filter(j => j.province === province);
  if (district) filteredJobs = filteredJobs.filter(j => j.district === district);
  const listings = filteredJobs.map(j => `
    <div class="job">
      <h2>${j.title}</h2>
      <div class="meta"><strong>Department:</strong> ${j.department}</div>
      <div class="meta"><strong>Location:</strong> ${capitalize(j.district)}, ${capitalize(j.province)}</div>
      <div class="requirements"><strong>Requirements:</strong> ${j.requirements}</div>
      <div class="meta"><strong>Deadline:</strong> ${j.deadline}</div>
      <a href="${j.link}" target="_blank" class="apply-btn">Apply Now</a>
    </div>
  `).join('');
  document.getElementById('job-listings').innerHTML = listings || '<p>No jobs found.</p>';
}

// Helper to capitalize first letter
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial display
showJobs();
