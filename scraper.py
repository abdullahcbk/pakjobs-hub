import requests
from bs4 import BeautifulSoup
import json

# Example: scraping jobs from a government website
URL = "https://www.jobs.gov.pk/latest-jobs"
response = requests.get(URL)
soup = BeautifulSoup(response.text, "html.parser")

jobs = []
for job_div in soup.find_all("div", class_="job-listing"):
    title = job_div.find("h2").text
    department = job_div.find("span", class_="department").text
    location = job_div.find("span", class_="location").text
    requirements = job_div.find("span", class_="requirements").text
    deadline = job_div.find("span", class_="deadline").text
    link = job_div.find("a", class_="apply")["href"]
    jobs.append({
        "title": title,
        "department": department,
        "province": location.split(",")[1].strip(),
        "district": location.split(",")[0].strip(),
        "requirements": requirements,
        "deadline": deadline,
        "link": link
    })

with open("jobs.json", "w") as file:
    json.dump(jobs, file)
