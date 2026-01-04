const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSBwv_havgmFuNprD3yYX5hSIbBpZ8oAMMnpeBd2GirFebudep_oEYk_AeeN_waNQwE7j32IseBNqhD/pub?gid=0&single=true&output=csv";


const tbody = document.getElementById("klasemen-body");

Papa.parse(SHEET_URL, {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data.filter(r => r.Klub);

    tbody.innerHTML = "";

    data.sort((a,b)=>
      b.Poin - a.Poin ||
      b.SG - a.SG ||
      b.GM - a.GM ||
      a.Klub.localeCompare(b.Klub)
    );

    data.forEach((t,i)=>{
      const eliminated = i >= data.length - 3;
      const tr = document.createElement("tr");

      if (i < 3) tr.classList.add(`top${i+1}`);
      if (eliminated) tr.classList.add("danger");

      tr.innerHTML = `
        <td>${i+1}</td>
        <td class="team">
          ${t.Klub}
          <span class="badge ${eliminated?"eliminated":"qualified"}">
            ${eliminated?"ELIMINATED":"QUALIFIED"}
          </span>
        </td>
        <td>${t.T}</td>
        <td>${t.M}</td>
        <td>${t.S}</td>
        <td>${t.K}</td>
        <td>${t.GM}</td>
        <td>${t.GK}</td>
        <td>${t.SG}</td>
        <td>${t.Poin}</td>
        <td class="form">${renderForm(t.Form)}</td>
      `;
      tbody.appendChild(tr);
    });
  },
  error: function(err) {
    console.error(err);
    tbody.innerHTML = `
      <tr><td colspan="11">Gagal memuat data</td></tr>
    `;
  }
});

function renderForm(f){
  if(!f) return "";
  return f.split("-").slice(-5).map(r=>{
    if(r==="W") return `<span class="win">●</span>`;
    if(r==="L") return `<span class="lose">●</span>`;
    return `<span class="draw">●</span>`;
  }).join("");
}
