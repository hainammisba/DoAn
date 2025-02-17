document.addEventListener("DOMContentLoaded", function () {
    const historyList = document.getElementById("history-list");
    const meetingList = document.getElementById("meeting-list");
    const searchInput = document.getElementById("search");
    const createMeetingBtn = document.getElementById("create-meeting-btn");

    // Lấy danh sách cuộc họp từ localStorage (nếu có)
    let meetings = JSON.parse(localStorage.getItem("meetings")) || [];

    function renderMeetings(filter = "") {
        meetingList.innerHTML = "";
        historyList.innerHTML = "";

        let filteredMeetings = meetings.filter(meeting => 
            meeting.date.includes(filter) || meeting.content.toLowerCase().includes(filter.toLowerCase())
        );

        filteredMeetings.forEach(meeting => {
            // Thêm vào danh sách hiển thị
            let meetingItem = document.createElement("div");
            meetingItem.classList.add("card", "mb-3");
            meetingItem.innerHTML = `
                <div class="card-header"><strong>${meeting.date}</strong></div>
                <div class="card-body">${meeting.content}</div>
            `;
            meetingList.appendChild(meetingItem);

            // Thêm vào sidebar
            let historyItem = document.createElement("li");
            historyItem.classList.add("list-group-item", "list-group-item-action");
            historyItem.innerText = meeting.date;
            historyItem.onclick = () => searchInput.value = meeting.date;
            historyList.appendChild(historyItem);
        });
    }

    // Xử lý tìm kiếm
    searchInput.addEventListener("input", function () {
        renderMeetings(searchInput.value);
    });

    // Xử lý tạo cuộc họp mới
    createMeetingBtn.addEventListener("click", function () {
        let date = prompt("Nhập ngày (DD-MM-YYYY):");
        if (date) {
            let content = prompt("Nhập nội dung cuộc họp:");
            if (content) {
                meetings.push({ date, content });
                localStorage.setItem("meetings", JSON.stringify(meetings));
                renderMeetings();
            }
        }
    });

    // Hiển thị danh sách cuộc họp ban đầu
    renderMeetings();
});
document.addEventListener("DOMContentLoaded", function () {
    const meetingList = document.getElementById("meeting-list");
    const searchInput = document.getElementById("search");
    const createMeetingBtn = document.getElementById("create-meeting-btn");
    
    const filterBtn = document.getElementById("filter-btn");
    const filterModal = new bootstrap.Modal(document.getElementById("filter-modal"));
    const applyFilterBtn = document.getElementById("apply-filter");

    const filterDate = document.getElementById("filter-date");
    const filterMonth = document.getElementById("filter-month");
    const filterYear = document.getElementById("filter-year");

    // Lấy danh sách cuộc họp từ localStorage (nếu có)
    let meetings = JSON.parse(localStorage.getItem("meetings")) || [];

    function renderMeetings(filter = "") {
        meetingList.innerHTML = "";

        let filteredMeetings = meetings.filter(meeting => {
            let matchSearch = meeting.date.includes(filter) || meeting.content.toLowerCase().includes(filter.toLowerCase());
            let matchDate = filterDate.value ? meeting.date === filterDate.value : true;
            let matchMonth = filterMonth.value ? meeting.date.split("-")[1] === filterMonth.value : true;
            let matchYear = filterYear.value ? meeting.date.split("-")[0] === filterYear.value : true;

            return matchSearch && matchDate && matchMonth && matchYear;
        });

        if (filteredMeetings.length === 0) {
            meetingList.innerHTML = "<p class='text-muted'>Không tìm thấy cuộc họp nào.</p>";
        } else {
            filteredMeetings.forEach(meeting => {
                let meetingItem = document.createElement("div");
                meetingItem.classList.add("card", "mb-3");
                meetingItem.innerHTML = `
                    <div class="card-header"><strong>${meeting.date}</strong></div>
                    <div class="card-body">${meeting.content}</div>
                `;
                meetingList.appendChild(meetingItem);
            });
        }
    }

    // Xử lý mở modal khi bấm vào nút "Lọc"
    filterBtn.addEventListener("click", function () {
        filterModal.show();
    });

    // Xử lý khi áp dụng bộ lọc
    applyFilterBtn.addEventListener("click", function () {
        renderMeetings();
        filterModal.hide();
    });

    // Xử lý tìm kiếm
    searchInput.addEventListener("input", function () {
        renderMeetings(searchInput.value);
    });

    // Xử lý tạo cuộc họp mới
    createMeetingBtn.addEventListener("click", function () {
        let date = prompt("Nhập ngày (YYYY-MM-DD):");
        if (date) {
            let content = prompt("Nhập nội dung cuộc họp:");
            if (content) {
                meetings.push({ date, content });
                localStorage.setItem("meetings", JSON.stringify(meetings));
                renderMeetings();
            }
        }
    });

    // Hiển thị danh sách cuộc họp ban đầu
    renderMeetings();
});
document.addEventListener('DOMContentLoaded', function () {
    // Xử lý sự kiện nút Xóa
    document.querySelectorAll('.delete-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const meetingItem = this.closest('.meeting-item');
            const meetingId = meetingItem.getAttribute('data-id');
            // Xóa phần tử khỏi DOM
            meetingItem.remove();
            // TODO: Xóa cuộc họp khỏi dữ liệu (localStorage hoặc server)
            console.log(`Đã xóa cuộc họp ID: ${meetingId}`);
        });
    });

    // Xử lý sự kiện nút Ghim
    document.querySelectorAll('.pin-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const meetingItem = this.closest('.meeting-item');
            const currentPin = meetingItem.getAttribute('data-pin');
            let newPin = prompt('Nhập màu ghim (red, green, yellow):', currentPin || '');
            if (newPin) {
                newPin = newPin.toLowerCase();
                if (['red', 'green', 'yellow'].includes(newPin)) {
                    // Xóa các lớp ghim cũ
                    meetingItem.classList.remove('pinned-red', 'pinned-green', 'pinned-yellow');
                    // Thêm lớp ghim mới
                    meetingItem.classList.add(`pinned-${newPin}`);
                    // Cập nhật thuộc tính data-pin
                    meetingItem.setAttribute('data-pin', newPin);
                    // TODO: Lưu trạng thái ghim vào dữ liệu (localStorage hoặc server)
                    console.log(`Đã ghim cuộc họp ID: ${meetingItem.getAttribute('data-id')} với màu: ${newPin}`);
                } else {
                    alert('Màu không hợp lệ! Vui lòng nhập red, green hoặc yellow.');
                }
            }
        });
    });
});
// Lưu danh sách cuộc họp vào localStorage
function saveMeetings() {
    const meetings = [];
    document.querySelectorAll('.meeting-item').forEach(function (item) {
        meetings.push({
            id: item.getAttribute('data-id'),
            pin: item.getAttribute('data-pin') || ''
        });
    });
    localStorage.setItem('meetings', JSON.stringify(meetings));
}

// Tải danh sách cuộc họp từ localStorage
function loadMeetings() {
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
    meetings.forEach(function (meeting) {
        const meetingItem = document.querySelector(`.meeting-item[data-id="${meeting.id}"]`);
        if (meetingItem) {
            if (meeting.pin) {
                meetingItem.classList.add(`pinned-${meeting.pin}`);
                meetingItem.setAttribute('data-pin', meeting.pin);
            }
        }
    });
}

// Gọi hàm loadMeetings khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    loadMeetings();

    // Sau khi xử lý xóa hoặc ghim, lưu lại trạng thái
    document.querySelectorAll('.delete-btn, .pin-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            saveMeetings();
        });
    });
});

