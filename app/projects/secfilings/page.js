'use client';

export default function SECFilings() {
  async function getFileLists(cik, formType, year) {
    const url = `https://data.sec.gov/submissions/CIK${cik}.json`;
    const data = await fetch(url).then((response) => response.json());
    let fileData = [];
    for (let i = 0; i < data.filings.recent.accessionNumber.length; i++) {
      let tic = '-';
      if (data.tickers[0]) {
        tic = data.tickers[0];
      }
      fileData.push({
        tic: tic,
        filingYear: data.filings.recent.filingDate[i].split('-')[0],
        reportYear: data.filings.recent.reportDate[i].split('-')[0],
        accessionNumber: data.filings.recent.accessionNumber[i],
        filingDate: data.filings.recent.filingDate[i],
        reportDate: data.filings.recent.reportDate[i],
        form: data.filings.recent.form[i],
        primaryDocDescription: data.filings.recent.primaryDocDescription[i],
        primaryDocument: data.filings.recent.primaryDocument[i],
      });
    }
    let finalData = fileData;
    if (formType) {
      finalData = fileData.filter((f) => f.form == formType);
    }
    if (year) {
      finalData = finalData.filter((y) => y.reportYear >= year);
    }
    renderHtml(finalData, cik);
  }
  function renderHtml(finalData, cik) {
    const filingSize = finalData.length;
    let tableRows = '';
    for (let i = 0; i < filingSize; i++) {
      const folderName = finalData[i].accessionNumber.replaceAll('-', '');
      let financialData = '';
      if ((finalData[i].form == '10-K') | (finalData[i].form == '10-Q')) {
        financialData = `&nbsp;|&nbsp;<a href='https://www.sec.gov/Archives/edgar/data/${cik}/${folderName}/Financial_Report.xlsx'>XLS</a>`;
      }
      tableRows += `<tr class='text-left border-b font-mono hover:bg-neutral-200'>
      <td class="px-2">${finalData[i].tic}</td>
      <td class="px-2">${finalData[i].reportYear}</td>
      <td class="px-2">${finalData[i].filingDate}</td>
      <td class="px-2">${finalData[i].reportDate}</td>
      <td class="px-2">${finalData[i].form}</td>
      <td class="px-2 overflow-hidden">${finalData[i].primaryDocDescription}</td>
      <td class="px-2"><a href='https://www.sec.gov/Archives/edgar/data/${cik}/${folderName}/${finalData[i].primaryDocument}' target='_blank'>Doc</a>${financialData}</tr>
     </tr>
     `;
    }
    let table = `<thead class="text-left bg-neutral-300">
    <tr class="border-b">
          <th class="p-2">TIC</th>
          <th class="p-2">Year</th>
          <th class="p-2">Filing Date</th>
          <th class="p-2">Report Date</th>
          <th class="p-2">Form</th>
          <th class="p-2">Description</th>
          <th class="p-2">Doc</th>
          </tr>
          </thead>
          <tbody>${tableRows}
          </tbody>`;
    document.querySelector('#data').innerHTML = table;
  }
  function getFilings(cikList, formType, year) {
    for (let i = 0; i < cikList.length; i++) {
      getFileLists(cikList[i], formType, year);
    }
  }
  function formSubmitted(event) {
    event.preventDefault();
    document.querySelector('#data').innerHTML = '';
    const cikList = event.target.cik.value;
    const formName = event.target.formlist.value;
    const year = event.target.yearinput.value;
    let companies = cikList.replaceAll(' ', '').split(',');
    getFilings(companies, formName, year);
  }

  return (
    <section>
      <div className='mx-auto'>
        <form className='grid gap-x-1 grid-cols-7' onSubmit={formSubmitted}>
          <input
            type='text'
            name='cik'
            id='cikinput'
            className='rounded-md p-1 col-span-4 border border-solid'
            placeholder='Enter company CIKs, coma separated'
          />
          <select name='formName' title='formName' id='formlist' className='w-30 p-1 border border-solid rounded-md'>
            <option value=''>All</option>
            <option value='10-K'>10-K</option>
            <option value='10-Q'>10-Q</option>
            <option value='DEF 14A'>DEF 14A</option>
            <option value='8-K'>8-K</option>
          </select>
          <input
            type='number'
            name='year'
            id='yearinput'
            className='rounded-md border border-solid p-1'
            placeholder='Beginning year'
          />
          <button type='submit' className='p-2 font-semibold bg-blue-500 text-white rounded-md w-20 ml-auto'>
            Search
          </button>
        </form>
      </div>
      <table className='min-w-full mt-2' id='data'></table>
    </section>
  );
}
