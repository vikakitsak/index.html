<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Графік чергування — Травень 2025</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f9f9f9;
    }
    h1 {
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: #fff;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #eee;
    }
  </style>
</head>
<body>
  <h1>Графік прибирання (травень 2025)</h1>
  <table>
    <thead>
      <tr>
        <th>Дата</th>
        <th>Черга кімнати</th>
        <th>Позначено виконаним</th>
      </tr>
    </thead>
    <tbody id="schedule-table">
    </tbody>
  </table>

  <script>
    const data = [
      ["3 травня", "2 кім."],
      ["5 травня", "1 кім."],
      ["7 травня", "2 кім."],
      ["9 травня", "1 кім."],
      ["11 травня", "2 кім."],
      ["13 травня", "1 кім."],
      ["15 травня", "2 кім."],
      ["17 травня", "1 кім."],
      ["19 травня", "2 кім."],
      ["21 травня", "1 кім."],
      ["23 травня", "2 кім."],
      ["25 травня", "1 кім."],
      ["27 травня", "2 кім."],
      ["29 травня", "1 кім."],
      ["31 травня", "2 кім."]
    ];

    const tableBody = document.getElementById("schedule-table");

    data.forEach((item, index) => {
      const [date, room] = item;
      const row = document.createElement("tr");

      const dateCell = document.createElement("td");
      dateCell.textContent = date;
      const roomCell = document.createElement("td");
      roomCell.textContent = room;
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = localStorage.getItem(`done-${index}`) === "true";

      checkbox.addEventListener("change", () => {
        localStorage.setItem(`done-${index}`, checkbox.checked);
      });

      checkboxCell.appendChild(checkbox);
      row.appendChild(dateCell);
      row.appendChild(roomCell);
      row.appendChild(checkboxCell);
      tableBody.appendChild(row);
    });
  </script>
</body>
</html>
