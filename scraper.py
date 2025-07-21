import requests
from bs4 import BeautifulSoup
import json

def get_jobs():
    url = "https://www.pakistanjobsbank.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    job_listings = []

    # Find job tables (adjust selector as needed)
    for job_row in soup.select('div.jobTableRow'):
        title = job_row.select_one('div.jobTableCellTitle a')
        if title:
            job_title = title.text.strip()
            job_link = title['href']
        else:
            continue

        department = job_row.select_one('div.jobTableCellDept')
        department = department.text.strip() if department else ""

        location = job_row.select_one('div.jobTableCellLoc')
        location = location.text.strip() if location else ""
        # Try to split into province/district if possible
        province = ""
        district = ""
        if "," in location:
            district, province = [x.strip().lower() for x in location.split(",", 1)]

        deadline = job_row.select_one('div.jobTableCellDate')
        deadline = deadline.text.strip() if deadline else ""

        job_listings.append({
            "title": job_title,
            "department": department,
            "province": province,
            "district": district,
            "requirements": "",       # Can enhance by parsing details page
            "deadline": deadline,
            "link": job_link,
            "type": "Government",     # Most jobs on this site are government
            "icon": ""                # Optional, can set custom icon
        })

    # Save jobs to jobs.json
    with open("jobs.json", "w", encoding="utf-8") as f:
        json.dump(job_listings, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    get_jobs()
