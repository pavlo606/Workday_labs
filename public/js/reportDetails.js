const DetailForm = document.getElementById("DetailForm");
const reportDetailsDataContainer = document.getElementById("reportDetailsDataContainer");
const createDetailButton = document.getElementById("createDetailButton");
const editDetailButton = document.getElementById("editDetailButton");
const calcelEditDetailButton = document.getElementById("calcelEditDetailButton");
const reportDetailFormTitle = document.getElementById("reportDetailFormTitle");

let editDetailMode = false;
let editReportDetailId = null;

const onEditDetail = (reportDetailId) => {
    startEditDetailMode(reportDetailId);
};

const onDeleteDetail = async (reportDetailId) => {
    if (window.confirm(`Do you want to delete report ${reportDetailId}`)) {
        const response = await fetch(`/api/reportdetails/${reportDetailId}`, {method: "DELETE"})
        location.reload();
    }
};

const startEditDetailMode = (reportDetailId) => {
    if (!editDetailMode) {
        editDetailMode = true;
        editReportDetailId = reportDetailId;
        createDetailButton.classList.add("d-none");
        editDetailButton.classList.remove("d-none");
        calcelEditDetailButton.classList.remove("d-none");
        reportDetailFormTitle.innerHTML = `Edit report ${reportDetailId}`;
    }
};

const endEditDetailMode = () => {
    if (editDetailMode) {
        editDetailMode = false;
        editReportDetailId = null;
        editDetailButton.classList.add("d-none");
        calcelEditDetailButton.classList.add("d-none");
        createDetailButton.classList.remove("d-none");
        reportDetailFormTitle.innerHTML = `Create report detail`;
    }
};

DetailForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const obj = Object.fromEntries(formData.entries());
    if (obj.title !== "") {
        if (editDetailMode && editReportDetailId) {
            const response = await fetch(`/api/reportdetails/${editReportDetailId}`, {
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
            const response = await fetch("/api/reportdetails", {
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