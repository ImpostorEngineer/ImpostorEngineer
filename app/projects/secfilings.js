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
    for (let i = 0; i < filingSize; i++) {
      const folderName = finalData[i].accessionNumber.replaceAll('-', '');
      let financialData = '';
      if ((finalData[i].form == '10-K') | (finalData[i].form == '10-Q')) {
        financialData = `&nbsp;|&nbsp;<a href='https://www.sec.gov/Archives/edgar/data/${cik}/${folderName}/Financial_Report.xlsx'>XLS</a>`;
      }
      document.querySelector('#data').innerHTML += `<div class=${secStyles.row}>
    <div>${finalData[i].tic}</div>
       <div>${finalData[i].reportYear}</div>
    <div>${finalData[i].filingDate}</div>
     <div>${finalData[i].reportDate}</div>
     <div>${finalData[i].form}</div>
     <div>${finalData[i].primaryDocDescription}</div>
     <div><a href='https://www.sec.gov/Archives/edgar/data/${cik}/${folderName}/${finalData[i].primaryDocument}' target='_blank'>Doc</a>${financialData}
    </div>
     </div>
     `;
    }
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
    <div className={secStyles.container}>
      <div className={secStyles.compInfo}>
        <form className={secStyles.form} onSubmit={formSubmitted}>
          <input
            type='text'
            name='cik'
            id='cikinput'
            className={secStyles.cikinput}
            placeholder='Enter company CIKs, coma separated'
          />
          <select name='formName' title='formName' id='formlist' className={secStyles.formlist}>
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
            className={secStyles.yearinput}
            placeholder='Beginning year'
          />
          <button type='submit' className={secStyles.searchButton}>
            Search
          </button>
        </form>
      </div>
      <div className={secStyles.data}>
        <div className={`${secStyles.row} ${secStyles.headers}`}>
          <div>TIC</div>
          <div>Year</div>
          <div>Filing Date</div>
          <div>Report Date</div>
          <div>Form</div>
          <div>Description</div>
          <div>Doc</div>
        </div>
      </div>
      <div className={secStyles.dataRows} id='data'></div>
    </div>
  );
}
