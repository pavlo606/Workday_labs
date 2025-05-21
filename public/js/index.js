const form = document.getElementById("myForm");
const reportDataContainer = document.getElementById("reportDataContainer");
const creteButton = document.getElementById("createButton");
const editButton = document.getElementById("editButton");
const calcelEditButton = document.getElementById("calcelEditButton");
const reportFormTitle = document.getElementById("reportFormTitle");

let editMode = false;
let editReportId = null;

const onEdit = (reportId) => {
    startEditMode(reportId);
};

const onDelete = async (reportId) => {
    if (window.confirm(`Do you want to delete report ${reportId}`)) {
        const response = await fetch(`/api/report/${reportId}`, {method: "DELETE"})
        location.reload();
    }
};

const onDetails = (reportId) => {
    window.location.href = `/api/view/reportdetails/${reportId}`;
};

const startEditMode = (reportId) => {
    if (!editMode) {
        editMode = true;
        editReportId = reportId;
        creteButton.classList.add("d-none");
        editButton.classList.remove("d-none");
        calcelEditButton.classList.remove("d-none");
        reportFormTitle.innerHTML = `Edit report ${reportId}`;
    }
};

const endEditMode = () => {
    if (editMode) {
        editMode = false;
        editReportId = null;
        editButton.classList.add("d-none");
        calcelEditButton.classList.add("d-none");
        creteButton.classList.remove("d-none");
        reportFormTitle.innerHTML = `Create report`;
    }
};

const logoutUser = async () => {
    const response = await fetch("/api/user/logout", { method: "POST" });
    console.log(response);
    window.location.href = "/api/view/login";
};

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const obj = Object.fromEntries(formData.entries());
    if (obj.title !== "") {
        if (editMode && editReportId) {
            const response = await fetch(`/api/report/${editReportId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            // if (response.ok) {
            //     alert("Report edited successful");
            // } else {
            //     aler("Error");
            // }
        } else {
            const response = await fetch("/api/report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            // if (response.ok) {
            //     alert("Report created successful");
            // } else {
            //     aler("Error");
            // }
        }
    }
    location.reload();
});

// reportDataContainer.insertAdjacentHTML("afterbegin", getReportsForUser());
// renderReports();
