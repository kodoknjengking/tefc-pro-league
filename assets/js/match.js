const matchURL =
  "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?gid=1&single=true&output=csv";

fetch(matchURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1);
    const tbody = document.querySelector("#matches tbody");

    rows.forEach(r => {
      const [id, date, home, away, hs, as] = r.split(",");
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${id}</td>
        <td>${home}</td>
        <td><b>${hs} - ${as}</b></td>
        <td>${away}</td>
      `;

      tbody.appendChild(tr);
    });
  });
