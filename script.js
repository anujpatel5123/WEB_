 /* Name - Anuj Patel
Student ID - 165811217
Student Mail - apatel521@myseneca.ca  */


const hourlyRateFormGroup = document.querySelector(".hourlyRate");
const form = document.querySelector("#form");
const eduImage = document.querySelector(".edu-image");
const eduTitle = document.querySelector(".edu-title");
const eduName = document.querySelector(".edu-name");
const eduDesc = document.querySelector(".edu-desc");
const years = document.querySelectorAll(".circle-div");



const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {};
    for (let i = 0; i < form?.elements.length - 1; i++) {
      if(form.elements[i].name.includes("person")) {
        reqData[form.elements[i].name] = form.elements[i].value;
      }
    }
    reqData["personInquiryType"] = document.querySelector('input[name="inquiryType"]:checked').value;
    if(reqData.personInquiryType === "Hiring") {
        reqData["personHourlyRate"] = document.querySelector('input[name="hourlyRate"]').value;
    }

    const url = 'https://httpbin.org/post';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)  
    }).then(res => {
        if(res.status === 200) {
            swal("Success!", "Your message has been sent", "success");
        }else {
            swal("Error!", "Something went wrong, please try again", "error");
        }
    });
};


const handleInquiryTypeChange = (inquiryType) => {
    if(inquiryType === "Hiring") {
        hourlyRateFormGroup.style.display = "block";
    } else {
        hourlyRateFormGroup.style.display = "none";
    }
}
  

const downloadCV = () => {
    let link = document.createElement("a");
    link.download = "ANUJ-Resume.pdf";
    link.href = window.location.origin + "/assets/documents/Resume.pdf";
    link.click();
}

const handleEducationChange = (event) => {
    const year = event.target.innerText;

    for(const element of years) {
        element.classList.remove("selected");
        if(element.innerText === year) {
            element.classList.add("selected");
        }
    }
    if(year === "2019") {
        eduTitle.innerText = "10th Grade";
        eduName.innerText = "C. I. PATEL HIGHER SECONDARY SCHOOL, KALOL";
        eduDesc.innerText = "I passed my secondary education in 2019 with 3.9 GPA.";
    
    }else if(year === "2023") {
        eduTitle.innerText = "Computer Programming";
        eduName.innerText = "Seneca college, Newnham campus";
        eduDesc.innerText = "I am currently persuing computer programming in Seneca College and will graduate in 2023.";
    }else {
        eduTitle.innerText = "12th Grade";
        eduName.innerText = "C. I. PATEL HIGHER SECONDARY SCHOOL, KALOL";
        eduDesc.innerText = "I passed my higher secondary education in 2021 with 3.7 GPA.";
    }
}